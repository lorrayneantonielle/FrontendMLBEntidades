<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFamilias } from '@/composables/useFamilias'
import { DOCUMENTO_TIPOS, type DocumentoTipo, type FamiliaResponse } from '@/types/familia'

const props = defineProps<{ familia: FamiliaResponse }>()

const { enviarDocumento } = useFamilias()

const enviando = ref<DocumentoTipo | null>(null)
const erro = ref('')
const fileInputs = ref<Partial<Record<DocumentoTipo, HTMLInputElement>>>({})

function setFileInputRef(tipo: DocumentoTipo, el: Element | null) {
  if (el) fileInputs.value[tipo] = el as HTMLInputElement
}

function abrirSeletor(tipo: DocumentoTipo) {
  fileInputs.value[tipo]?.click()
}

const checklist = computed(() =>
  DOCUMENTO_TIPOS.map((tipo) => ({
    tipo,
    documento: props.familia.documentos.find((d) => d.tipo === tipo) ?? null,
  })),
)

function corStatus(status: string | undefined) {
  if (status === 'Validado') return 'success'
  if (status === 'Recebido') return 'info'
  return 'grey'
}

async function onArquivoSelecionado(tipo: DocumentoTipo, event: Event) {
  const input = event.target as HTMLInputElement
  const arquivo = input.files?.[0]
  if (!arquivo) return

  erro.value = ''
  enviando.value = tipo
  try {
    await enviarDocumento(props.familia.id, tipo, arquivo)
  } catch {
    erro.value = `Não foi possível enviar o documento ${tipo}.`
  } finally {
    enviando.value = null
    input.value = ''
  }
}
</script>

<template>
  <v-card variant="outlined">
    <v-card-title>Documentação Obrigatória</v-card-title>
    <v-card-text>
      <v-alert v-if="erro" type="error" density="compact" class="mb-4">{{ erro }}</v-alert>

      <v-list>
        <v-list-item v-for="item in checklist" :key="item.tipo">
          <template #prepend>
            <v-chip size="small" :color="corStatus(item.documento?.status)">
              {{ item.documento?.status ?? 'Pendente' }}
            </v-chip>
          </template>

          <v-list-item-title class="ml-2">{{ item.tipo }}</v-list-item-title>

          <template #append>
            <v-btn
              size="small"
              variant="tonal"
              :loading="enviando === item.tipo"
              @click="abrirSeletor(item.tipo)"
            >
              Enviar
            </v-btn>
            <input
              :ref="(el) => setFileInputRef(item.tipo, el as Element | null)"
              type="file"
              accept="application/pdf,image/jpeg,image/png"
              class="d-none"
              @change="onArquivoSelecionado(item.tipo, $event)"
            />
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
