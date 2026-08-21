import type {
  DocumentoResponse,
  DocumentoTipo,
  FamiliaCreateCommand,
  FamiliaListParams,
  FamiliaListResponse,
  FamiliaResponse,
  FamiliaStatusUpdateCommand,
  FamiliaUpdateCommand,
  MembroCommand,
  MembroResponse,
} from '@/types/familia'
import httpClient from './httpClient'

export async function listFamilias(params: FamiliaListParams = {}): Promise<FamiliaListResponse> {
  const response = await httpClient.get<FamiliaListResponse>('/familias', { params })
  return response.data
}

export async function getFamilia(id: string): Promise<FamiliaResponse> {
  const response = await httpClient.get<FamiliaResponse>(`/familias/${id}`)
  return response.data
}

export async function createFamilia(command: FamiliaCreateCommand): Promise<FamiliaResponse> {
  const response = await httpClient.post<FamiliaResponse>('/familias', command)
  return response.data
}

export async function updateFamilia(id: string, command: FamiliaUpdateCommand): Promise<FamiliaResponse> {
  const response = await httpClient.put<FamiliaResponse>(`/familias/${id}`, command)
  return response.data
}

export async function updateFamiliaStatus(
  id: string,
  command: FamiliaStatusUpdateCommand,
): Promise<FamiliaResponse> {
  const response = await httpClient.patch<FamiliaResponse>(`/familias/${id}/status`, command)
  return response.data
}

export async function listMembrosPorFamilia(familiaId: string): Promise<MembroResponse[]> {
  const response = await httpClient.get<MembroResponse[]>('/membros', { params: { familiaId } })
  return response.data
}

export async function createMembro(command: MembroCommand): Promise<MembroResponse> {
  const response = await httpClient.post<MembroResponse>('/membros', command)
  return response.data
}

export async function updateMembro(id: string, command: MembroCommand): Promise<MembroResponse> {
  const response = await httpClient.put<MembroResponse>(`/membros/${id}`, command)
  return response.data
}

export async function deleteMembro(id: string): Promise<void> {
  await httpClient.delete(`/membros/${id}`)
}

export async function listDocumentosPorFamilia(familiaId: string): Promise<DocumentoResponse[]> {
  const response = await httpClient.get<DocumentoResponse[]>('/documentos', { params: { familiaId } })
  return response.data
}

export async function uploadDocumento(
  familiaId: string,
  tipo: DocumentoTipo,
  arquivo: File,
): Promise<DocumentoResponse> {
  const formData = new FormData()
  formData.append('familiaId', familiaId)
  formData.append('tipo', tipo)
  formData.append('arquivo', arquivo)

  const response = await httpClient.post<DocumentoResponse>('/documentos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}
