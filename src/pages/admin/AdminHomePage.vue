<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { usuario } = useAuth()
</script>

<template>
  <v-container>
    <h1 class="text-h5 mb-4">Bem-vindo(a){{ usuario ? `, ${usuario.nomeCompleto}` : '' }}</h1>
    <v-btn color="primary" :to="{ name: 'familias' }">Gerenciar Famílias</v-btn>
    <v-btn color="primary" class="ml-2" :to="{ name: 'obra-etapas' }">Etapas da Obra</v-btn>
    <v-btn color="primary" class="ml-2" :to="{ name: 'obra-medicoes' }">Medições</v-btn>
    <v-btn color="primary" class="ml-2" :to="{ name: 'obra-ocorrencias' }">Ocorrências</v-btn>
    <v-btn color="primary" class="ml-2" :to="{ name: 'unidades-mapa' }">Mapa de Ocupação</v-btn>
    <v-btn color="primary" class="ml-2" :to="{ name: 'unidades-nova' }">Unidades Habitacionais</v-btn>
    <v-btn color="primary" class="ml-2" :to="{ name: 'mutirao-escalas' }">Escalas de Mutirão</v-btn>
    <v-btn color="primary" class="ml-2" :to="{ name: 'mutirao-presencas' }">Presença e Pontuação</v-btn>
  </v-container>
</template>
