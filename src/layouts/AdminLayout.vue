<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { usuario, logout } = useAuth()
</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>MLBEntidades — Administração</v-app-bar-title>
      <v-spacer />
      <span v-if="usuario" class="mr-4">{{ usuario.nomeCompleto }}</span>
      <v-btn variant="text" @click="logout">Sair</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
