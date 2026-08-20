import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

export function useAuth() {
  const store = useAuthStore()
  const { usuario, isAuthenticated } = storeToRefs(store)

  return {
    usuario,
    isAuthenticated,
    login: store.login,
    logout: store.logout,
    hasRole: store.hasRole,
  }
}
