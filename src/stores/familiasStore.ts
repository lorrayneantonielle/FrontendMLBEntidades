import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as familiaService from '@/services/familiaService'
import type {
  DocumentoTipo,
  FamiliaCreateCommand,
  FamiliaListParams,
  FamiliaResponse,
  FamiliaStatusUpdateCommand,
  FamiliaUpdateCommand,
  MembroCommand,
} from '@/types/familia'

export const useFamiliasStore = defineStore('familias', () => {
  const familias = ref<FamiliaResponse[]>([])
  const total = ref(0)
  const familiaAtual = ref<FamiliaResponse | null>(null)
  const carregando = ref(false)
  const erro = ref<string | null>(null)

  async function listar(params: FamiliaListParams = {}): Promise<void> {
    carregando.value = true
    erro.value = null
    try {
      const resposta = await familiaService.listFamilias(params)
      familias.value = resposta.items
      total.value = resposta.total
    } catch {
      erro.value = 'Não foi possível carregar as famílias.'
    } finally {
      carregando.value = false
    }
  }

  async function carregar(id: string): Promise<void> {
    carregando.value = true
    erro.value = null
    try {
      familiaAtual.value = await familiaService.getFamilia(id)
    } catch {
      erro.value = 'Não foi possível carregar a família.'
    } finally {
      carregando.value = false
    }
  }

  async function criar(command: FamiliaCreateCommand): Promise<FamiliaResponse> {
    const familia = await familiaService.createFamilia(command)
    familias.value = [familia, ...familias.value]
    return familia
  }

  async function atualizar(id: string, command: FamiliaUpdateCommand): Promise<void> {
    familiaAtual.value = await familiaService.updateFamilia(id, command)
  }

  async function atualizarStatus(id: string, command: FamiliaStatusUpdateCommand): Promise<void> {
    familiaAtual.value = await familiaService.updateFamiliaStatus(id, command)
  }

  async function adicionarMembro(command: MembroCommand): Promise<void> {
    await familiaService.createMembro(command)
    await carregar(command.familiaId)
  }

  async function atualizarMembro(id: string, command: MembroCommand): Promise<void> {
    await familiaService.updateMembro(id, command)
    await carregar(command.familiaId)
  }

  async function removerMembro(id: string, familiaId: string): Promise<void> {
    await familiaService.deleteMembro(id)
    await carregar(familiaId)
  }

  async function enviarDocumento(familiaId: string, tipo: DocumentoTipo, arquivo: File): Promise<void> {
    await familiaService.uploadDocumento(familiaId, tipo, arquivo)
    await carregar(familiaId)
  }

  return {
    familias,
    total,
    familiaAtual,
    carregando,
    erro,
    listar,
    carregar,
    criar,
    atualizar,
    atualizarStatus,
    adicionarMembro,
    atualizarMembro,
    removerMembro,
    enviarDocumento,
  }
})
