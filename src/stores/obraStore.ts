import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as obraService from '@/services/obraService'
import type {
  EtapaObraCommand,
  EtapaObraResponse,
  MedicaoCommand,
  MedicaoResponse,
  OcorrenciaCommand,
  OcorrenciaResponse,
} from '@/types/obra'

export const useObraStore = defineStore('obra', () => {
  const etapas = ref<EtapaObraResponse[]>([])
  const medicoes = ref<MedicaoResponse[]>([])
  const ocorrencias = ref<OcorrenciaResponse[]>([])
  const carregando = ref(false)
  const erro = ref<string | null>(null)

  async function listarEtapas(): Promise<void> {
    carregando.value = true
    erro.value = null
    try {
      etapas.value = await obraService.listEtapas()
    } catch {
      erro.value = 'Não foi possível carregar as etapas da obra.'
    } finally {
      carregando.value = false
    }
  }

  async function criarEtapa(command: EtapaObraCommand): Promise<void> {
    const etapa = await obraService.createEtapa(command)
    etapas.value = [...etapas.value, etapa].sort((a, b) => a.ordem - b.ordem)
  }

  async function atualizarPercentual(id: string, percentualConclusao: number): Promise<void> {
    const atualizada = await obraService.updateEtapaPercentual(id, percentualConclusao)
    etapas.value = etapas.value.map((etapa) => (etapa.id === id ? atualizada : etapa))
  }

  async function listarMedicoes(etapaObraId?: string): Promise<void> {
    carregando.value = true
    erro.value = null
    try {
      medicoes.value = await obraService.listMedicoes(etapaObraId)
    } catch {
      erro.value = 'Não foi possível carregar as medições.'
    } finally {
      carregando.value = false
    }
  }

  async function registrarMedicao(command: MedicaoCommand): Promise<void> {
    const medicao = await obraService.createMedicao(command)
    medicoes.value = [medicao, ...medicoes.value]
  }

  async function listarOcorrencias(etapaObraId?: string): Promise<void> {
    carregando.value = true
    erro.value = null
    try {
      ocorrencias.value = await obraService.listOcorrencias(etapaObraId)
    } catch {
      erro.value = 'Não foi possível carregar as ocorrências.'
    } finally {
      carregando.value = false
    }
  }

  async function registrarOcorrencia(command: OcorrenciaCommand): Promise<void> {
    const ocorrencia = await obraService.createOcorrencia(command)
    ocorrencias.value = [ocorrencia, ...ocorrencias.value]
  }

  return {
    etapas,
    medicoes,
    ocorrencias,
    carregando,
    erro,
    listarEtapas,
    criarEtapa,
    atualizarPercentual,
    listarMedicoes,
    registrarMedicao,
    listarOcorrencias,
    registrarOcorrencia,
  }
})
