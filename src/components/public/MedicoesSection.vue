<script setup lang="ts">
import type { PublicMedicaoResponse } from '@/types/public'

defineProps<{ medicoes: PublicMedicaoResponse[] }>()
</script>

<template>
  <section>
    <h2 class="text-h5 mb-2">Histórico de Medições Aprovadas</h2>

    <v-alert v-if="medicoes.length === 0" type="info" density="compact">
      Ainda não há medições aprovadas pelo governo.
    </v-alert>

    <v-table v-else density="compact">
      <thead>
        <tr>
          <th>Data</th>
          <th>Etapa</th>
          <th>Recursos liberados</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(medicao, indice) in medicoes" :key="indice">
          <td>{{ medicao.data }}</td>
          <td>{{ medicao.etapa }}</td>
          <td>{{ medicao.recursosLiberados ?? '—' }}</td>
        </tr>
      </tbody>
    </v-table>
  </section>
</template>
