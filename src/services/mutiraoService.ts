import type {
  MutiraoEscalaCommand,
  MutiraoEscalaResponse,
  PontuacaoFamiliaResponse,
  PresencaCommand,
  PresencaResponse,
} from '@/types/mutirao'
import httpClient from './httpClient'

export async function listEscalas(): Promise<MutiraoEscalaResponse[]> {
  const response = await httpClient.get<MutiraoEscalaResponse[]>('/mutirao/escalas')
  return response.data
}

export async function createEscala(command: MutiraoEscalaCommand): Promise<MutiraoEscalaResponse> {
  const response = await httpClient.post<MutiraoEscalaResponse>('/mutirao/escalas', command)
  return response.data
}

export async function registrarPresenca(command: PresencaCommand): Promise<PresencaResponse> {
  const response = await httpClient.post<PresencaResponse>('/mutirao/presencas', command)
  return response.data
}

export async function getPontuacaoPorFamilia(params: {
  familiaId?: string
  baixaParticipacao?: boolean
} = {}): Promise<PontuacaoFamiliaResponse[]> {
  const response = await httpClient.get<PontuacaoFamiliaResponse[]>('/mutirao/pontuacao', { params })
  return response.data
}
