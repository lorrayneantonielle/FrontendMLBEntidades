<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useObra } from '@/composables/useObra'

const { etapas, ocorrencias, carregando, listarEtapas, listarOcorrencias, registrarOcorrencia } = useObra()

const filtroEtapaId = ref<string | null>(null)
const novaOcorrencia = reactive({ etapaObraId: '', descricao: '', data: '' })
const erro = ref('')
const salvando = ref(false)

const opcoesEtapas = computed(() => etapas.value.map((etapa) => ({ title: etapa.nome, value: etapa.id })))

async function carregarTudo() {
  await listarEtapas()
  await listarOcorrencias(filtroEtapaId.value ?? undefined)
}

onMounted(carregarTudo)

async function salvarOcorrencia() {
  if (!novaOcorrencia.etapaObraId || !novaOcorrencia.descricao || !novaOcorrencia.data) return
  erro.value = ''
  salvando.value = true
  try {
    await registrarOcorrencia({ ...novaOcorrencia })
    novaOcorrencia.descricao = ''
    novaOcorrencia.data = ''
  } catch {
    erro.value = 'Não foi possível registrar a ocorrência.'
  } finally {
    salvando.value = false
  }
}
</script>

<template>
  <v-container fluid>
    <h1 class="text-h5 mb-4">Ocorrências Técnicas</h1>

    <v-alert v-if="erro" type="error" density="compact" class="mb-4">{{ erro }}</v-alert>

    <v-card class="mb-4">
      <v-card-title>Registrar Ocorrência</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="salvarOcorrencia">
          <v-row dense>
            <v-col cols="12" sm="3">
              <v-select v-model="novaOcorrencia.etapaObraId" label="Etapa" :items="opcoesEtapas" />
            </v-col>
            <v-col cols="12" sm="6"><v-text-field v-model="novaOcorrencia.descricao" label="Descrição" /></v-col>
            <v-col cols="12" sm="3"><v-text-field v-model="novaOcorrencia.data" type="date" label="Data" /></v-col>
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

    <v-progress-circular v-if="carregando" indeterminate class="mt-4" />

    <v-list>
      <v-list-item v-for="ocorrencia in ocorrencias" :key="ocorrencia.id">
        <v-list-item-title>{{ ocorrencia.data }} — {{ ocorrencia.descricao }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-container>
</template>
