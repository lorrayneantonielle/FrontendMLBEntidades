import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import * as authService from '@/services/authService'
import { clearTokens, getAccessToken, setTokens } from '@/services/tokenStorage'
import { decodeJwt, isExpired } from '@/services/jwt'
import type { LoginCommand } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(getAccessToken())

  const usuario = computed(() => {
    if (!accessToken.value) return null

    const payload = decodeJwt(accessToken.value)
    const roles = Array.isArray(payload.role) ? payload.role : payload.role ? [payload.role] : []

    return {
      id: payload.sub,
      email: payload.email,
      nomeCompleto: payload.nomeCompleto,
      roles,
    }
  })

  const isAuthenticated = computed(() => {
    if (!accessToken.value) return false
    return !isExpired(decodeJwt(accessToken.value))
  })

  async function login(command: LoginCommand): Promise<void> {
    const tokens = await authService.login(command)
    setTokens(tokens)
    accessToken.value = tokens.accessToken
  }

  async function logout(): Promise<void> {
    try {
      await authService.logout()
    } finally {
      clearTokens()
      accessToken.value = null
    }
  }

  function hasRole(role: string): boolean {
    return usuario.value?.roles.includes(role) ?? false
  }

  return { usuario, isAuthenticated, login, logout, hasRole }
})
