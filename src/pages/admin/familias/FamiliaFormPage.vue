<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFamilias } from '@/composables/useFamilias'
import FamiliaDocumentosChecklist from '@/components/admin/FamiliaDocumentosChecklist.vue'
import FamiliaStatusWorkflow from '@/components/admin/FamiliaStatusWorkflow.vue'
import type { MembroDados } from '@/types/familia'

const route = useRoute()
const router = useRouter()
const {
  familiaAtual,
  carregando,
  carregar,
  criar,
  atualizar,
  adicionarMembro,
  removerMembro,
} = useFamilias()

const id = computed(() => route.params.id as string | undefined)
const modoEdicao = computed(() => !!id.value)

const rendaFamiliar = ref(0)
const situacaoVulnerabilidade = ref('')
const membrosNovos = ref<MembroDados[]>([])
const novoMembro = reactive<MembroDados>({ nome: '', dataNascimento: '', vinculo: '', cpf: '' })
const erro = ref('')
const salvando = ref(false)
const salvandoMembro = ref(false)

onMounted(async () => {
  if (id.value) {
    await carregar(id.value)
    if (familiaAtual.value) {
      rendaFamiliar.value = familiaAtual.value.rendaFamiliar
      situacaoVulnerabilidade.value = familiaAtual.value.situacaoVulnerabilidade
    }
  }
})

function adicionarMembroNaLista() {
  if (!novoMembro.nome || !novoMembro.cpf) return
  membrosNovos.value.push({ ...novoMembro })
  novoMembro.nome = ''
  novoMembro.dataNascimento = ''
  novoMembro.vinculo = ''
  novoMembro.cpf = ''
}

function removerMembroDaLista(index: number) {
  membrosNovos.value.splice(index, 1)
}

async function salvar() {
  erro.value = ''
  salvando.value = true
  try {
    if (modoEdicao.value && id.value) {
      await atualizar(id.value, {
        rendaFamiliar: rendaFamiliar.value,
        situacaoVulnerabilidade: situacaoVulnerabilidade.value,
      })
    } else {
      const familia = await criar({
        rendaFamiliar: rendaFamiliar.value,
        situacaoVulnerabilidade: situacaoVulnerabilidade.value,
        membros: membrosNovos.value,
      })
      await router.push({ name: 'familia-editar', params: { id: familia.id } })
    }
  } catch {
    erro.value = 'Não foi possível salvar a família. Verifique os dados informados (CPFs podem já estar em uso).'
  } finally {
    salvando.value = false
  }
}

async function adicionarMembroExistente() {
  if (!id.value || !novoMembro.nome || !novoMembro.cpf) return
  erro.value = ''
  salvandoMembro.value = true
  try {
    await adicionarMembro({ familiaId: id.value, ...novoMembro })
    novoMembro.nome = ''
    novoMembro.dataNascimento = ''
    novoMembro.vinculo = ''
    novoMembro.cpf = ''
  } catch {
    erro.value = 'Não foi possível adicionar o membro (CPF pode já estar em uso).'
  } finally {
    salvandoMembro.value = false
  }
}

async function excluirMembro(membroId: string) {
  if (!id.value) return
  await removerMembro(membroId, id.value)
}
</script>

<template>
  <v-container>
    <h1 class="text-h5 mb-4">{{ modoEdicao ? 'Editar Família' : 'Nova Família' }}</h1>

    <v-alert v-if="erro" type="error" density="compact" class="mb-4">{{ erro }}</v-alert>

    <v-card class="mb-4">
      <v-card-text>
        <v-form @submit.prevent="salvar">
          <v-text-field
            v-model.number="rendaFamiliar"
            type="number"
            label="Renda Familiar"
            required
          />
          <v-textarea
            v-model="situacaoVulnerabilidade"
            label="Situação de Vulnerabilidade"
            required
          />

          <template v-if="!modoEdicao">
            <h2 class="text-subtitle-1 mt-4 mb-2">Membros da Família</h2>
            <v-row dense>
              <v-col cols="12" sm="3"><v-text-field v-model="novoMembro.nome" label="Nome" /></v-col>
              <v-col cols="12" sm="3"><v-text-field v-model="novoMembro.dataNascimento" type="date" label="Nascimento" /></v-col>
              <v-col cols="12" sm="3"><v-text-field v-model="novoMembro.vinculo" label="Vínculo" /></v-col>
              <v-col cols="12" sm="2"><v-text-field v-model="novoMembro.cpf" label="CPF" maxlength="11" /></v-col>
              <v-col cols="12" sm="1" class="d-flex align-center">
                <v-btn icon="mdi-plus" size="small" @click="adicionarMembroNaLista" />
              </v-col>
            </v-row>

            <v-list>
              <v-list-item v-for="(membro, index) in membrosNovos" :key="index">
                <v-list-item-title>{{ membro.nome }} — {{ membro.vinculo }} — CPF {{ membro.cpf }}</v-list-item-title>
                <template #append>
                  <v-btn icon="mdi-delete" size="small" variant="text" @click="removerMembroDaLista(index)" />
                </template>
              </v-list-item>
            </v-list>
          </template>

          <v-btn type="submit" color="primary" class="mt-4" :loading="salvando">Salvar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <template v-if="modoEdicao && familiaAtual">
      <v-card class="mb-4">
        <v-card-title>Membros</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="membro in familiaAtual.membros" :key="membro.id">
              <v-list-item-title>{{ membro.nome }} — {{ membro.vinculo }} — CPF {{ membro.cpf }}</v-list-item-title>
              <template #append>
                <v-btn icon="mdi-delete" size="small" variant="text" @click="excluirMembro(membro.id)" />
              </template>
            </v-list-item>
          </v-list>

          <v-row dense class="mt-2">
            <v-col cols="12" sm="3"><v-text-field v-model="novoMembro.nome" label="Nome" /></v-col>
            <v-col cols="12" sm="3"><v-text-field v-model="novoMembro.dataNascimento" type="date" label="Nascimento" /></v-col>
            <v-col cols="12" sm="3"><v-text-field v-model="novoMembro.vinculo" label="Vínculo" /></v-col>
            <v-col cols="12" sm="2"><v-text-field v-model="novoMembro.cpf" label="CPF" maxlength="11" /></v-col>
            <v-col cols="12" sm="1" class="d-flex align-center">
              <v-btn icon="mdi-plus" size="small" :loading="salvandoMembro" @click="adicionarMembroExistente" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <FamiliaDocumentosChecklist :familia="familiaAtual" class="mb-4" />
      <FamiliaStatusWorkflow :familia="familiaAtual" />
    </template>

    <v-progress-circular v-else-if="carregando" indeterminate class="mt-4" />
  </v-container>
</template>
