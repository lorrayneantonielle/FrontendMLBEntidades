<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useObra } from '@/composables/useObra'
import type { EtapaObraResponse } from '@/types/obra'

const { etapas, carregando, listarEtapas, criarEtapa, atualizarPercentual } = useObra()

const novaEtapa = reactive({ nome: '', ordem: 1 })
const erro = ref('')
const salvando = ref(false)
const salvandoPercentualId = ref<string | null>(null)

onMounted(listarEtapas)

async function salvarEtapa() {
  if (!novaEtapa.nome) return
  erro.value = ''
  salvando.value = true
  try {
    await criarEtapa({ nome: novaEtapa.nome, ordem: novaEtapa.ordem })
    novaEtapa.nome = ''
    novaEtapa.ordem += 1
  } catch {
    erro.value = 'Não foi possível cadastrar a etapa (ordem pode já estar em uso).'
  } finally {
    salvando.value = false
  }
}

async function salvarPercentual(etapa: EtapaObraResponse, percentual: number) {
  erro.value = ''
  salvandoPercentualId.value = etapa.id
  try {
    await atualizarPercentual(etapa.id, percentual)
  } catch {
    erro.value = 'Não foi possível atualizar o percentual de conclusão.'
  } finally {
    salvandoPercentualId.value = null
  }
}
</script>

<template>
  <v-container fluid>
    <h1 class="text-h5 mb-4">Etapas da Obra</h1>

    <v-alert v-if="erro" type="error" density="compact" class="mb-4">{{ erro }}</v-alert>

    <v-card class="mb-4">
      <v-card-title>Nova Etapa</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="salvarEtapa">
          <v-row dense>
            <v-col cols="12" sm="6"><v-text-field v-model="novaEtapa.nome" label="Nome (ex.: fundação, estrutura)" /></v-col>
            <v-col cols="12" sm="4"><v-text-field v-model.number="novaEtapa.ordem" type="number" label="Ordem" /></v-col>
            <v-col cols="12" sm="2" class="d-flex align-center">
              <v-btn type="submit" color="primary" :loading="salvando">Adicionar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <v-progress-circular v-if="carregando" indeterminate class="mt-4" />

    <v-card v-for="etapa in etapas" :key="etapa.id" class="mb-3">
      <v-card-text>
        <div class="d-flex align-center mb-2">
          <span class="text-subtitle-1 font-weight-medium">{{ etapa.ordem }}. {{ etapa.nome }}</span>
          <v-spacer />
          <span>{{ etapa.percentualConclusao }}%</span>
        </div>
        <v-slider
          :model-value="etapa.percentualConclusao"
          min="0"
          max="100"
          step="1"
          :disabled="salvandoPercentualId === etapa.id"
          @end="(valor: number) => salvarPercentual(etapa, valor)"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>
