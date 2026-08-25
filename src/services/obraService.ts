import type {
  EtapaObraCommand,
  EtapaObraResponse,
  MedicaoCommand,
  MedicaoResponse,
  OcorrenciaCommand,
  OcorrenciaResponse,
} from '@/types/obra'
import httpClient from './httpClient'

export async function listEtapas(): Promise<EtapaObraResponse[]> {
  const response = await httpClient.get<EtapaObraResponse[]>('/obra/etapas')
  return response.data
}

export async function createEtapa(command: EtapaObraCommand): Promise<EtapaObraResponse> {
  const response = await httpClient.post<EtapaObraResponse>('/obra/etapas', command)
  return response.data
}

export async function updateEtapaPercentual(id: string, percentualConclusao: number): Promise<EtapaObraResponse> {
  const response = await httpClient.patch<EtapaObraResponse>(`/obra/etapas/${id}`, { percentualConclusao })
  return response.data
}

export async function listMedicoes(etapaObraId?: string): Promise<MedicaoResponse[]> {
  const response = await httpClient.get<MedicaoResponse[]>('/obra/medicoes', { params: { etapaObraId } })
  return response.data
}

export async function createMedicao(command: MedicaoCommand): Promise<MedicaoResponse> {
  const response = await httpClient.post<MedicaoResponse>('/obra/medicoes', command)
  return response.data
}

export async function listOcorrencias(etapaObraId?: string): Promise<OcorrenciaResponse[]> {
  const response = await httpClient.get<OcorrenciaResponse[]>('/obra/ocorrencias', { params: { etapaObraId } })
  return response.data
}

export async function createOcorrencia(command: OcorrenciaCommand): Promise<OcorrenciaResponse> {
  const response = await httpClient.post<OcorrenciaResponse>('/obra/ocorrencias', command)
  return response.data
}
