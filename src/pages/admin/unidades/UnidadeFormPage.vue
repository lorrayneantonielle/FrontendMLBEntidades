<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useUnidades } from '@/composables/useUnidades'
import { useFamilias } from '@/composables/useFamilias'
import type { UnidadeResponse } from '@/types/unidade'

const { unidades, listar, criar, atribuir } = useUnidades()
const { familias, listar: listarFamilias } = useFamilias()

onMounted(() => {
  listar()
  listarFamilias()
})

const novaUnidade = reactive({ identificador: '', metragem: 0, localizacaoTerreno: '' })
const erroCadastro = ref('')
const salvandoCadastro = ref(false)

async function salvarUnidade() {
  if (!novaUnidade.identificador || !novaUnidade.localizacaoTerreno) return
  erroCadastro.value = ''
  salvandoCadastro.value = true
  try {
    await criar({ ...novaUnidade })
    novaUnidade.identificador = ''
    novaUnidade.metragem = 0
    novaUnidade.localizacaoTerreno = ''
  } catch {
    erroCadastro.value = 'Não foi possível cadastrar a unidade (identificador pode já estar em uso).'
  } finally {
    salvandoCadastro.value = false
  }
}

const unidadesLivres = computed<UnidadeResponse[]>(() => unidades.value.filter((u) => u.status === 'Livre'))
const familiasElegiveis = computed(() =>
  familias.value.filter((f) => ['Aprovada', 'UnidadeAtribuida', 'EmConstrucao', 'Finalizada'].includes(f.status)),
)

const unidadeSelecionada = ref<string | null>(null)
const familiaSelecionada = ref<string | null>(null)
const erroAtribuicao = ref('')
const salvandoAtribuicao = ref(false)

async function salvarAtribuicao() {
  if (!unidadeSelecionada.value || !familiaSelecionada.value) return
  erroAtribuicao.value = ''
  salvandoAtribuicao.value = true
  try {
    await atribuir(unidadeSelecionada.value, familiaSelecionada.value)
    unidadeSelecionada.value = null
    familiaSelecionada.value = null
  } catch {
    erroAtribuicao.value = 'Não foi possível atribuir a unidade (verifique o status da família e da unidade).'
  } finally {
    salvandoAtribuicao.value = false
  }
}
</script>

<template>
  <v-container fluid>
    <h1 class="text-h5 mb-4">Unidades Habitacionais</h1>

    <v-card class="mb-4">
      <v-card-title>Nova Unidade</v-card-title>
      <v-card-text>
        <v-alert v-if="erroCadastro" type="error" density="compact" class="mb-4">{{ erroCadastro }}</v-alert>
        <v-form @submit.prevent="salvarUnidade">
          <v-row dense>
            <v-col cols="12" sm="3"><v-text-field v-model="novaUnidade.identificador" label="Identificador" /></v-col>
            <v-col cols="12" sm="3">
              <v-text-field v-model.number="novaUnidade.metragem" type="number" label="Metragem (m²)" />
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field v-model="novaUnidade.localizacaoTerreno" label="Localização no terreno" />
            </v-col>
            <v-col cols="12" sm="2" class="d-flex align-center">
              <v-btn type="submit" color="primary" :loading="salvandoCadastro">Adicionar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>Atribuir Unidade a Família</v-card-title>
      <v-card-text>
        <v-alert v-if="erroAtribuicao" type="error" density="compact" class="mb-4">{{ erroAtribuicao }}</v-alert>
        <v-alert v-if="unidadesLivres.length === 0" type="info" density="compact" class="mb-4">
          Não há unidades livres para atribuição.
        </v-alert>
        <v-form v-else @submit.prevent="salvarAtribuicao">
          <v-row dense>
            <v-col cols="12" sm="5">
              <v-select
                v-model="unidadeSelecionada"
                :items="unidadesLivres.map((u) => ({ title: u.identificador, value: u.id }))"
                label="Unidade livre"
              />
            </v-col>
            <v-col cols="12" sm="5">
              <v-select
                v-model="familiaSelecionada"
                :items="familiasElegiveis.map((f) => ({ title: `${f.situacaoVulnerabilidade} (${f.status})`, value: f.id }))"
                label="Família (Aprovada ou posterior)"
              />
            </v-col>
            <v-col cols="12" sm="2" class="d-flex align-center">
              <v-btn type="submit" color="primary" :loading="salvandoAtribuicao">Atribuir</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
