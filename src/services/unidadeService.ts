import type { UnidadeCommand, UnidadeResponse, UnidadeStatus } from '@/types/unidade'
import httpClient from './httpClient'

export async function listUnidades(status?: UnidadeStatus): Promise<UnidadeResponse[]> {
  const response = await httpClient.get<UnidadeResponse[]>('/unidades', { params: { status } })
  return response.data
}

export async function createUnidade(command: UnidadeCommand): Promise<UnidadeResponse> {
  const response = await httpClient.post<UnidadeResponse>('/unidades', command)
  return response.data
}

export async function atribuirUnidade(id: string, familiaId: string): Promise<UnidadeResponse> {
  const response = await httpClient.put<UnidadeResponse>(`/unidades/${id}/atribuicao`, { familiaId })
  return response.data
}
