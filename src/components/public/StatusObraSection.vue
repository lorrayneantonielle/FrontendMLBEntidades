<script setup lang="ts">
import type { PublicEtapaResponse } from '@/types/public'

defineProps<{ etapas: PublicEtapaResponse[] }>()
</script>

<template>
  <section>
    <h2 class="text-h5 mb-2">Status da Obra por Etapa</h2>

    <v-alert v-if="etapas.length === 0" type="info" density="compact">
      Ainda não há etapas de obra cadastradas.
    </v-alert>

    <v-card v-for="etapa in etapas" :key="etapa.ordem" class="mb-3">
      <v-card-text>
        <div class="d-flex align-center mb-2">
          <span class="text-subtitle-1 font-weight-medium">{{ etapa.ordem }}. {{ etapa.nome }}</span>
          <v-spacer />
          <span>{{ etapa.percentualConclusao }}%</span>
        </div>
        <v-progress-linear :model-value="etapa.percentualConclusao" height="10" rounded color="primary" />
      </v-card-text>
    </v-card>
  </section>
</template>
