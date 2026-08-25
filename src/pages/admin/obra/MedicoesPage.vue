<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useObra } from '@/composables/useObra'
import { STATUS_APROVACAO_OPCOES } from '@/types/obra'

const { etapas, medicoes, carregando, listarEtapas, listarMedicoes, registrarMedicao } = useObra()

const filtroEtapaId = ref<string | null>(null)
const novaMedicao = reactive({
  etapaObraId: '',
  data: '',
  statusAprovacao: 'Pendente' as (typeof STATUS_APROVACAO_OPCOES)[number],
  recursosLiberados: null as number | null,
  observacao: '',
})
const erro = ref('')
const salvando = ref(false)

const opcoesEtapas = computed(() => etapas.value.map((etapa) => ({ title: etapa.nome, value: etapa.id })))

async function carregarTudo() {
  await listarEtapas()
  await listarMedicoes(filtroEtapaId.value ?? undefined)
}

onMounted(carregarTudo)

async function salvarMedicao() {
  if (!novaMedicao.etapaObraId || !novaMedicao.data) return
  erro.value = ''
  salvando.value = true
  try {
    await registrarMedicao({
      etapaObraId: novaMedicao.etapaObraId,
      data: novaMedicao.data,
      statusAprovacao: novaMedicao.statusAprovacao,
      recursosLiberados: novaMedicao.recursosLiberados,
      observacao: novaMedicao.observacao || undefined,
    })
    novaMedicao.data = ''
    novaMedicao.recursosLiberados = null
    novaMedicao.observacao = ''
  } catch {
    erro.value = 'Não foi possível registrar a medição.'
  } finally {
    salvando.value = false
  }
}

const cabecalhos = [
  { title: 'Data', key: 'data' },
  { title: 'Status', key: 'statusAprovacao' },
  { title: 'Recursos Liberados', key: 'recursosLiberados' },
  { title: 'Observação', key: 'observacao' },
]
</script>

<template>
  <v-container fluid>
    <h1 class="text-h5 mb-4">Medições da Obra</h1>

    <v-alert v-if="erro" type="error" density="compact" class="mb-4">{{ erro }}</v-alert>

    <v-card class="mb-4">
      <v-card-title>Registrar Medição</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="salvarMedicao">
          <v-row dense>
            <v-col cols="12" sm="3">
              <v-select v-model="novaMedicao.etapaObraId" label="Etapa" :items="opcoesEtapas" />
            </v-col>
            <v-col cols="12" sm="2"><v-text-field v-model="novaMedicao.data" type="date" label="Data" /></v-col>
            <v-col cols="12" sm="2">
              <v-select v-model="novaMedicao.statusAprovacao" label="Status" :items="STATUS_APROVACAO_OPCOES" />
            </v-col>
            <v-col cols="12" sm="2">
              <v-text-field v-model.number="novaMedicao.recursosLiberados" type="number" label="Recursos Liberados" />
            </v-col>
            <v-col cols="12" sm="3"><v-text-field v-model="novaMedicao.observacao" label="Observação" /></v-col>
          </v-row>
          <v-btn type="submit" color="primary" class="mt-2" :loading="salvando">Registrar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-select
      v-model="filtroEtapaId"
      label="Filtrar por etapa"
      :items="opcoesEtapas"
      clearable
      class="mb-2"
      style="max-width: 320px"
      @update:model-value="carregarTudo"
    />

    <v-data-table :headers="cabecalhos" :items="medicoes" :loading="carregando" item-value="id">
      <template #item.statusAprovacao="{ item }">
        <v-chip :color="item.statusAprovacao === 'Aprovada' ? 'success' : item.statusAprovacao === 'Rejeitada' ? 'error' : 'default'" size="small">
          {{ item.statusAprovacao }}
        </v-chip>
        <v-icon v-if="item.divergente" color="warning" icon="mdi-alert" class="ml-1" title="Percentual da etapa ainda não reflete 100%" />
      </template>
      <template #item.recursosLiberados="{ item }">
        {{ item.recursosLiberados != null ? item.recursosLiberados.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-' }}
      </template>
    </v-data-table>
  </v-container>
</template>
