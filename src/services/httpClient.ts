import axios, { type InternalAxiosRequestConfig } from 'axios'
import type { TokenResponse } from '@/types/auth'
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from './tokenStorage'

const baseURL = import.meta.env.VITE_API_BASE_URL

const httpClient = axios.create({ baseURL })

// Instância isolada, sem interceptors, usada apenas para renovar o token —
// evita recursão infinita caso o próprio refresh-token responda 401.
const refreshClient = axios.create({ baseURL })

httpClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken()
  if (accessToken) {
    config.headers.set('Authorization', `Bearer ${accessToken}`)
  }
  return config
})

let refreshPromise: Promise<string> | null = null

async function refreshAccessToken(): Promise<string> {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    throw new Error('Nenhum refresh token disponível.')
  }

  const response = await refreshClient.post<TokenResponse>('/auth/refresh-token', { refreshToken })
  setTokens(response.data)
  return response.data.accessToken
}

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined

    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null
      })
      const accessToken = await refreshPromise
      originalRequest.headers.set('Authorization', `Bearer ${accessToken}`)
      return httpClient(originalRequest)
    } catch (refreshError) {
      clearTokens()
      return Promise.reject(refreshError)
    }
  },
)

export default httpClient
