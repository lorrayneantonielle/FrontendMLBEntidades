<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFamilias } from '@/composables/useFamilias'
import { FAMILIA_STATUS_SEQUENCIA, type FamiliaStatus } from '@/types/familia'

const { familias, total, carregando, listar } = useFamilias()
const router = useRouter()

const status = ref<FamiliaStatus | null>(null)
const nome = ref('')
const numeroMembros = ref<number | null>(null)

async function aplicarFiltros() {
  await listar({
    status: status.value ?? undefined,
    nome: nome.value || undefined,
    numeroMembros: numeroMembros.value ?? undefined,
  })
}

onMounted(aplicarFiltros)

const cabecalhos = [
  { title: 'Situação de Vulnerabilidade', key: 'situacaoVulnerabilidade' },
  { title: 'Renda Familiar', key: 'rendaFamiliar' },
  { title: 'Membros', key: 'membros' },
  { title: 'Status', key: 'status' },
]
</script>

<template>
  <v-container fluid>
    <div class="d-flex align-center mb-4">
      <h1 class="text-h5">Famílias</h1>
      <v-spacer />
      <v-btn color="primary" @click="router.push({ name: 'familia-nova' })">Nova família</v-btn>
    </div>

    <v-row class="mb-2">
      <v-col cols="12" sm="4">
        <v-select
          v-model="status"
          label="Status"
          :items="FAMILIA_STATUS_SEQUENCIA"
          clearable
          @update:model-value="aplicarFiltros"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field v-model="nome" label="Nome do membro" clearable @keyup.enter="aplicarFiltros" @click:clear="aplicarFiltros" />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          v-model.number="numeroMembros"
          type="number"
          label="Número de membros"
          clearable
          @keyup.enter="aplicarFiltros"
          @click:clear="aplicarFiltros"
        />
      </v-col>
    </v-row>

    <v-data-table
      :headers="cabecalhos"
      :items="familias"
      :loading="carregando"
      :items-length="total"
      item-value="id"
      @click:row="(_e: unknown, row: { item: { id: string } }) => router.push({ name: 'familia-editar', params: { id: row.item.id } })"
    >
      <template #item.membros="{ item }">{{ item.membros.length }}</template>
      <template #item.rendaFamiliar="{ item }">{{ item.rendaFamiliar.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</template>
    </v-data-table>
  </v-container>
</template>
