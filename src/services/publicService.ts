import type {
  PublicEtapaResponse,
  PublicMedicaoResponse,
  PublicMutiraoResponse,
  PublicStatusResponse,
} from '@/types/public'
import httpClient from './httpClient'

export async function getStatus(): Promise<PublicStatusResponse> {
  const response = await httpClient.get<PublicStatusResponse>('/public/status')
  return response.data
}

export async function getEtapas(): Promise<PublicEtapaResponse[]> {
  const response = await httpClient.get<PublicEtapaResponse[]>('/public/etapas')
  return response.data
}

export async function getMedicoes(): Promise<PublicMedicaoResponse[]> {
  const response = await httpClient.get<PublicMedicaoResponse[]>('/public/medicoes')
  return response.data
}

export async function getMutiroes(): Promise<PublicMutiraoResponse[]> {
  const response = await httpClient.get<PublicMutiraoResponse[]>('/public/mutiroes')
  return response.data
}
