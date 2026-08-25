<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useMutirao } from '@/composables/useMutirao'
import { TURNO_OPCOES } from '@/types/mutirao'

const { escalas, carregando, listarEscalas, criarEscala } = useMutirao()

const novaEscala = reactive({ data: '', turno: 'Manha' as const, vagasTotais: 1, pontuacaoPorPresenca: 1 })
const erro = ref('')
const salvando = ref(false)

onMounted(listarEscalas)

async function salvarEscala() {
  if (!novaEscala.data) return
  erro.value = ''
  salvando.value = true
  try {
    await criarEscala({ ...novaEscala })
    novaEscala.data = ''
    novaEscala.vagasTotais = 1
    novaEscala.pontuacaoPorPresenca = 1
  } catch {
    erro.value = 'Não foi possível cadastrar a escala de mutirão.'
  } finally {
    salvando.value = false
  }
}
</script>

<template>
  <v-container fluid>
    <h1 class="text-h5 mb-4">Escalas de Mutirão</h1>

    <v-alert v-if="erro" type="error" density="compact" class="mb-4">{{ erro }}</v-alert>

    <v-card class="mb-4">
      <v-card-title>Nova Escala</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="salvarEscala">
          <v-row dense>
            <v-col cols="12" sm="3"><v-text-field v-model="novaEscala.data" type="date" label="Data" /></v-col>
            <v-col cols="12" sm="3">
              <v-select v-model="novaEscala.turno" :items="TURNO_OPCOES" label="Turno" />
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field v-model.number="novaEscala.vagasTotais" type="number" min="1" label="Vagas" />
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field v-model.number="novaEscala.pontuacaoPorPresenca" type="number" min="1" label="Pontuação" />
            </v-col>
            <v-col cols="12" sm="2" class="d-flex align-center">
              <v-btn type="submit" color="primary" :loading="salvando">Adicionar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <v-progress-circular v-if="carregando" indeterminate class="mt-4" />

    <v-table v-else>
      <thead>
        <tr>
          <th>Data</th>
          <th>Turno</th>
          <th>Vagas disponíveis</th>
          <th>Pontuação por presença</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="escala in escalas" :key="escala.id">
          <td>{{ escala.data }}</td>
          <td>{{ escala.turno }}</td>
          <td>{{ escala.vagasDisponiveis }} / {{ escala.vagasTotais }}</td>
          <td>{{ escala.pontuacaoPorPresenca }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
