<script setup lang="ts">
import { onMounted } from 'vue'
import { usePublic } from '@/composables/usePublic'
import StatusObraSection from '@/components/public/StatusObraSection.vue'
import MedicoesSection from '@/components/public/MedicoesSection.vue'
import MutiroesCalendarSection from '@/components/public/MutiroesCalendarSection.vue'

const { status, etapas, medicoes, mutiroes, carregando, erro, carregarTudo } = usePublic()

onMounted(carregarTudo)
</script>

<template>
  <v-container>
    <v-progress-circular v-if="carregando" indeterminate class="mt-4" />

    <v-alert v-else-if="erro" type="error" density="compact" class="mb-4">{{ erro }}</v-alert>

    <template v-else-if="status">
      <h1 class="text-h4 mb-2">{{ status.nomeEmpreendimento }}</h1>
      <p class="mb-4">{{ status.descricao }}</p>

      <v-card class="mb-6" color="primary" variant="tonal">
        <v-card-text>
          <div class="d-flex align-center mb-2">
            <span class="text-subtitle-1 font-weight-medium">Progresso geral da obra</span>
            <v-spacer />
            <span>{{ status.percentualConclusaoGeral }}%</span>
          </div>
          <v-progress-linear :model-value="status.percentualConclusaoGeral" height="12" rounded color="primary" />
        </v-card-text>
      </v-card>

      <StatusObraSection :etapas="etapas" class="mb-6" />
      <MedicoesSection :medicoes="medicoes" class="mb-6" />
      <MutiroesCalendarSection :mutiroes="mutiroes" />
    </template>
  </v-container>
</template>
