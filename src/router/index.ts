import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/PublicLayout.vue'),
      children: [
        { path: '', name: 'public-home', component: () => import('@/pages/public/LandingPage.vue') },
        { path: 'login', name: 'login', component: () => import('@/pages/admin/LoginPage.vue') },
      ],
    },
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'admin-home', component: () => import('@/pages/admin/AdminHomePage.vue') },
        { path: 'familias', name: 'familias', component: () => import('@/pages/admin/familias/FamiliasListPage.vue') },
        { path: 'familias/nova', name: 'familia-nova', component: () => import('@/pages/admin/familias/FamiliaFormPage.vue') },
        { path: 'familias/:id', name: 'familia-editar', component: () => import('@/pages/admin/familias/FamiliaFormPage.vue') },
        { path: 'obra/etapas', name: 'obra-etapas', component: () => import('@/pages/admin/obra/EtapasPage.vue') },
        { path: 'obra/medicoes', name: 'obra-medicoes', component: () => import('@/pages/admin/obra/MedicoesPage.vue') },
        { path: 'obra/ocorrencias', name: 'obra-ocorrencias', component: () => import('@/pages/admin/obra/OcorrenciasPage.vue') },
        { path: 'unidades', name: 'unidades-mapa', component: () => import('@/pages/admin/unidades/MapaOcupacaoPage.vue') },
        { path: 'unidades/nova', name: 'unidades-nova', component: () => import('@/pages/admin/unidades/UnidadeFormPage.vue') },
        { path: 'mutirao/escalas', name: 'mutirao-escalas', component: () => import('@/pages/admin/mutirao/EscalasPage.vue') },
        {
          path: 'mutirao/presencas',
          name: 'mutirao-presencas',
          component: () => import('@/pages/admin/mutirao/PresencaPontuacaoPage.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' }
  }

  return true
})

export default router
