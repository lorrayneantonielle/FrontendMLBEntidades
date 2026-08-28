<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useAuth } from '@/composables/useAuth'

const { usuario, logout } = useAuth()
const route = useRoute()
const { mobile } = useDisplay()

const rail = ref(false)
const drawerOpen = ref(!mobile.value)

function toggleDrawer() {
  if (mobile.value) {
    drawerOpen.value = !drawerOpen.value
  } else {
    rail.value = !rail.value
  }
}

const iniciais = computed(() => {
  const nome = usuario.value?.nomeCompleto ?? ''
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0]?.toUpperCase())
    .join('') || '?'
})

interface NavItem {
  title: string
  icon: string
  to: { name: string }
}

interface NavGroup {
  title: string
  icon: string
  items: NavItem[]
}

const navItems: NavItem[] = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard-outline', to: { name: 'admin-home' } },
  { title: 'Famílias', icon: 'mdi-account-group-outline', to: { name: 'familias' } },
]

const navGroups: NavGroup[] = [
  {
    title: 'Obra',
    icon: 'mdi-crane',
    items: [
      { title: 'Etapas', icon: 'mdi-format-list-checks', to: { name: 'obra-etapas' } },
      { title: 'Medições', icon: 'mdi-ruler-square', to: { name: 'obra-medicoes' } },
      { title: 'Ocorrências', icon: 'mdi-alert-circle-outline', to: { name: 'obra-ocorrencias' } },
    ],
  },
  {
    title: 'Unidades',
    icon: 'mdi-home-city-outline',
    items: [
      { title: 'Mapa de Ocupação', icon: 'mdi-map-marker-radius-outline', to: { name: 'unidades-mapa' } },
      { title: 'Nova Unidade', icon: 'mdi-home-plus-outline', to: { name: 'unidades-nova' } },
    ],
  },
  {
    title: 'Mutirão',
    icon: 'mdi-account-hard-hat-outline',
    items: [
      { title: 'Escalas', icon: 'mdi-calendar-check-outline', to: { name: 'mutirao-escalas' } },
      { title: 'Presença e Pontuação', icon: 'mdi-clipboard-check-outline', to: { name: 'mutirao-presencas' } },
    ],
  },
]

function grupoAtivo(grupo: NavGroup): boolean {
  return grupo.items.some((item) => item.to.name === route.name)
}
</script>

<template>
  <v-app class="mlb-admin">
    <v-navigation-drawer
      v-model="drawerOpen"
      :rail="rail && !mobile"
      :permanent="!mobile"
      :temporary="mobile"
      expand-on-hover
      class="mlb-drawer"
      color="info"
    >
      <div class="mlb-brand" :class="{ 'mlb-brand--rail': rail }">
        <v-avatar color="accent" size="36" class="mlb-brand__mark">
          <span class="text-body-1 font-weight-bold">ML</span>
        </v-avatar>
        <div class="mlb-brand__text">
          <span class="mlb-brand__title">MLBEntidades</span>
          <span class="mlb-brand__subtitle">Administração</span>
        </div>
      </div>

      <v-divider class="mlb-divider" />

      <v-list nav class="mlb-nav" density="comfortable">
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          :to="item.to"
          exact
          :prepend-icon="item.icon"
          :title="item.title"
          rounded="lg"
          class="mlb-nav__item"
        />

        <v-list-group
          v-for="grupo in navGroups"
          :key="grupo.title"
          :value="grupo.title"
        >
          <template #activator="{ props: activatorProps }">
            <v-list-item
              v-bind="activatorProps"
              :prepend-icon="grupo.icon"
              :title="grupo.title"
              rounded="lg"
              class="mlb-nav__item"
              :class="{ 'mlb-nav__item--group-active': grupoAtivo(grupo) }"
            />
          </template>

          <v-list-item
            v-for="item in grupo.items"
            :key="item.title"
            :to="item.to"
            :prepend-icon="item.icon"
            :title="item.title"
            rounded="lg"
            class="mlb-nav__item mlb-nav__item--child"
          />
        </v-list-group>
      </v-list>

      <template #append>
        <v-divider class="mlb-divider" />
        <div class="mlb-user" :class="{ 'mlb-user--rail': rail }">
          <v-avatar color="accent" size="34">
            <span class="text-body-2 font-weight-bold">{{ iniciais }}</span>
          </v-avatar>
          <div class="mlb-user__info">
            <span class="mlb-user__name">{{ usuario?.nomeCompleto ?? 'Usuário' }}</span>
            <span class="mlb-user__role">{{ usuario?.roles?.[0] ?? '' }}</span>
          </div>
          <v-btn
            icon="mdi-logout-variant"
            variant="text"
            size="small"
            color="warning"
            class="mlb-user__logout"
            @click="logout"
          />
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar flat color="background" class="mlb-topbar">
      <v-btn
        icon="mdi-menu"
        variant="text"
        @click="toggleDrawer"
      />
      <v-app-bar-title class="mlb-topbar__title">
        {{ (route.meta.titulo as string) ?? 'Painel administrativo' }}
      </v-app-bar-title>
      <v-spacer />
      <v-btn icon="mdi-bell-outline" variant="text" color="info" />
    </v-app-bar>

    <v-main class="mlb-main">
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
.mlb-admin :deep(.v-navigation-drawer) {
  border-right: none !important;
}

.mlb-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 16px 16px;
}

.mlb-brand__mark {
  flex-shrink: 0;
}

.mlb-brand__text {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
}

.mlb-brand__title {
  color: #f4d58d;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.2;
}

.mlb-brand__subtitle {
  color: rgba(244, 213, 141, 0.65);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.mlb-divider {
  border-color: rgba(244, 213, 141, 0.14) !important;
}

.mlb-nav {
  padding: 8px 10px;
}

.mlb-nav :deep(.v-list-item-title) {
  color: rgba(244, 213, 141, 0.82);
  font-size: 0.88rem;
  font-weight: 500;
}

.mlb-nav :deep(.v-icon) {
  color: rgba(244, 213, 141, 0.6);
}

.mlb-nav__item {
  margin-bottom: 2px;
}

.mlb-nav :deep(.v-list-item--active) {
  background: #bf0603;
}

.mlb-nav :deep(.v-list-item--active .v-list-item-title),
.mlb-nav :deep(.v-list-item--active .v-icon) {
  color: #f4d58d !important;
  opacity: 1;
}

.mlb-nav__item--group-active :deep(.v-list-item-title),
.mlb-nav__item--group-active .v-icon {
  color: #f4d58d;
}

.mlb-nav__item--child {
  margin-left: 8px;
}

.mlb-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px 18px;
}

.mlb-user__info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  min-width: 0;
}

.mlb-user__name {
  color: #f4d58d;
  font-size: 0.82rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mlb-user__role {
  color: rgba(244, 213, 141, 0.6);
  font-size: 0.7rem;
  text-transform: capitalize;
}

.mlb-user__logout {
  margin-left: auto;
  flex-shrink: 0;
}

.mlb-topbar {
  border-bottom: 1px solid rgba(0, 20, 39, 0.08);
}

.mlb-topbar__title {
  color: #001427;
  font-weight: 700;
}

.mlb-main {
  background: #f7f1e3;
}
</style>
