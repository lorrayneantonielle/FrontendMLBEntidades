<script setup lang="ts">
import type { PublicMutiraoResponse } from '@/types/public'

defineProps<{ mutiroes: PublicMutiraoResponse[] }>()
</script>

<template>
  <section>
    <h2 class="text-h5 mb-2">Próximos Mutirões</h2>

    <v-alert v-if="mutiroes.length === 0" type="info" density="compact">
      Não há mutirões agendados no momento.
    </v-alert>

    <v-row v-else dense>
      <v-col v-for="(mutirao, indice) in mutiroes" :key="indice" cols="12" sm="6" md="4">
        <v-card>
          <v-card-text>
            <div class="text-subtitle-1 font-weight-medium">{{ mutirao.data }}</div>
            <div>Turno: {{ mutirao.turno }}</div>
            <div>Vagas disponíveis: {{ mutirao.vagasDisponiveis }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>
