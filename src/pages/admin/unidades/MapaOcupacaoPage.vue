<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useUnidades } from '@/composables/useUnidades'
import type { UnidadeStatus } from '@/types/unidade'

const { unidades, carregando, listar } = useUnidades()

onMounted(() => listar())

const CORES: Record<UnidadeStatus, string> = {
  Livre: 'success',
  Reservada: 'warning',
  Ocupada: 'error',
}

const porStatus = computed(() => ({
  Livre: unidades.value.filter((u) => u.status === 'Livre').length,
  Reservada: unidades.value.filter((u) => u.status === 'Reservada').length,
  Ocupada: unidades.value.filter((u) => u.status === 'Ocupada').length,
}))
</script>

<template>
  <v-container fluid>
    <h1 class="text-h5 mb-4">Mapa de Ocupação</h1>

    <div class="d-flex mb-4" style="gap: 8px">
      <v-chip color="success" variant="flat">Livres: {{ porStatus.Livre }}</v-chip>
      <v-chip color="warning" variant="flat">Reservadas: {{ porStatus.Reservada }}</v-chip>
      <v-chip color="error" variant="flat">Ocupadas: {{ porStatus.Ocupada }}</v-chip>
    </div>

    <v-progress-circular v-if="carregando" indeterminate class="mt-4" />

    <v-alert v-else-if="unidades.length === 0" type="info" density="compact">
      Nenhuma unidade habitacional cadastrada ainda.
    </v-alert>

    <v-row v-else dense>
      <v-col v-for="unidade in unidades" :key="unidade.id" cols="6" sm="4" md="3" lg="2">
        <v-card :color="CORES[unidade.status]" variant="tonal">
          <v-card-text>
            <div class="text-subtitle-2 font-weight-medium">{{ unidade.identificador }}</div>
            <div class="text-caption">{{ unidade.metragem }} m²</div>
            <div class="text-caption">{{ unidade.localizacaoTerreno }}</div>
            <v-chip size="small" :color="CORES[unidade.status]" class="mt-2">{{ unidade.status }}</v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
