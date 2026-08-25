<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMutirao } from '@/composables/useMutirao'
import { useFamilias } from '@/composables/useFamilias'

const { escalas, pontuacoes, carregando, listarEscalas, registrarPresenca, listarPontuacao } = useMutirao()
const { familias, listar: listarFamilias } = useFamilias()

onMounted(() => {
  listarEscalas()
  listarFamilias()
  listarPontuacao()
})

const escalaSelecionada = ref<string | null>(null)
const familiaSelecionada = ref<string | null>(null)
const erro = ref('')
const salvando = ref(false)

async function salvarPresenca() {
  if (!escalaSelecionada.value || !familiaSelecionada.value) return
  erro.value = ''
  salvando.value = true
  try {
    await registrarPresenca({ mutiraoEscalaId: escalaSelecionada.value, familiaId: familiaSelecionada.value })
    await listarPontuacao()
    familiaSelecionada.value = null
  } catch {
    erro.value = 'Não foi possível registrar a presença (vagas esgotadas ou presença duplicada).'
  } finally {
    salvando.value = false
  }
}
</script>

<template>
  <v-container fluid>
    <h1 class="text-h5 mb-4">Presença e Pontuação</h1>

    <v-card class="mb-4">
      <v-card-title>Registrar Presença</v-card-title>
      <v-card-text>
        <v-alert v-if="erro" type="error" density="compact" class="mb-4">{{ erro }}</v-alert>
        <v-form @submit.prevent="salvarPresenca">
          <v-row dense>
            <v-col cols="12" sm="5">
              <v-select
                v-model="escalaSelecionada"
                :items="escalas.map((e) => ({ title: `${e.data} — ${e.turno} (${e.vagasDisponiveis} vagas)`, value: e.id }))"
                label="Escala de mutirão"
              />
            </v-col>
            <v-col cols="12" sm="5">
              <v-select
                v-model="familiaSelecionada"
                :items="familias.map((f) => ({ title: `${f.situacaoVulnerabilidade} (${f.status})`, value: f.id }))"
                label="Família"
              />
            </v-col>
            <v-col cols="12" sm="2" class="d-flex align-center">
              <v-btn type="submit" color="primary" :loading="salvando">Registrar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>Pontuação e Participação por Família</v-card-title>
      <v-progress-circular v-if="carregando" indeterminate class="ma-4" />
      <v-table v-else>
        <thead>
          <tr>
            <th>Família</th>
            <th>Pontuação acumulada</th>
            <th>Presenças</th>
            <th>Baixa participação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pontuacao in pontuacoes" :key="pontuacao.familiaId">
            <td>{{ pontuacao.familiaId }}</td>
            <td>{{ pontuacao.pontuacaoAcumulada }}</td>
            <td>{{ pontuacao.presencas.length }}</td>
            <td>
              <v-chip v-if="pontuacao.baixaParticipacao" color="error" size="small">Sinalizada</v-chip>
              <span v-else>—</span>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>
