import type { LoginCommand, TokenResponse } from '@/types/auth'
import httpClient from './httpClient'

export async function login(command: LoginCommand): Promise<TokenResponse> {
  const response = await httpClient.post<TokenResponse>('/auth/login', command)
  return response.data
}

export async function logout(): Promise<void> {
  await httpClient.post('/auth/logout')
}
