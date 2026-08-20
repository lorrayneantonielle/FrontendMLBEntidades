<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { usuario } = useAuth()
</script>

<template>
  <v-container>
    <h1 class="text-h5">Bem-vindo(a){{ usuario ? `, ${usuario.nomeCompleto}` : '' }}</h1>
  </v-container>
</template>
