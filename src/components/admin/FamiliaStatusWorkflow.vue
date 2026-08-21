<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFamilias } from '@/composables/useFamilias'
import { FAMILIA_STATUS_SEQUENCIA, type FamiliaResponse, type FamiliaStatus } from '@/types/familia'

const props = defineProps<{ familia: FamiliaResponse }>()

const { atualizarStatus } = useFamilias()

const carregando = ref(false)
const erro = ref('')
const dialogReversao = ref(false)
const statusReversao = ref<FamiliaStatus | null>(null)
const motivo = ref('')

const indiceAtual = computed(() => FAMILIA_STATUS_SEQUENCIA.indexOf(props.familia.status))
const proximoStatus = computed(() => FAMILIA_STATUS_SEQUENCIA[indiceAtual.value + 1] ?? null)
const statusAnteriores = computed(() => FAMILIA_STATUS_SEQUENCIA.slice(0, indiceAtual.value))

async function avancar() {
  if (!proximoStatus.value) return
  erro.value = ''
  carregando.value = true
  try {
    await atualizarStatus(props.familia.id, { novoStatus: proximoStatus.value })
  } catch {
    erro.value = 'Não foi possível avançar o status. Verifique a documentação obrigatória.'
  } finally {
    carregando.value = false
  }
}

function abrirReversao() {
  statusReversao.value = statusAnteriores.value.at(-1) ?? null
  motivo.value = ''
  erro.value = ''
  dialogReversao.value = true
}

async function confirmarReversao() {
  if (!statusReversao.value || !motivo.value.trim()) return
  erro.value = ''
  carregando.value = true
  try {
    await atualizarStatus(props.familia.id, { novoStatus: statusReversao.value, motivo: motivo.value })
    dialogReversao.value = false
  } catch {
    erro.value = 'Não foi possível reverter o status.'
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <v-card variant="outlined">
    <v-card-title>Status da Família</v-card-title>
    <v-card-text>
      <v-chip color="primary" class="mb-4">{{ familia.status }}</v-chip>

      <v-alert v-if="erro" type="error" density="compact" class="mb-4">{{ erro }}</v-alert>

      <div class="d-flex ga-2">
        <v-btn
          v-if="proximoStatus"
          color="primary"
          :loading="carregando"
          @click="avancar"
        >
          Avançar para {{ proximoStatus }}
        </v-btn>
        <v-btn
          v-if="statusAnteriores.length > 0"
          variant="tonal"
          color="warning"
          :loading="carregando"
          @click="abrirReversao"
        >
          Reverter status
        </v-btn>
      </div>
    </v-card-text>

    <v-dialog v-model="dialogReversao" max-width="480">
      <v-card>
        <v-card-title>Reverter status</v-card-title>
        <v-card-text>
          <v-select
            v-model="statusReversao"
            label="Novo status"
            :items="statusAnteriores"
          />
          <v-textarea v-model="motivo" label="Motivo (obrigatório)" required />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="dialogReversao = false">Cancelar</v-btn>
          <v-btn
            color="warning"
            :disabled="!motivo.trim()"
            :loading="carregando"
            @click="confirmarReversao"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
