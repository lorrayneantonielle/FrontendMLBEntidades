import type { Turno } from './mutirao'

export interface PublicStatusResponse {
  nomeEmpreendimento: string
  descricao: string
  percentualConclusaoGeral: number
}

export interface PublicEtapaResponse {
  nome: string
  ordem: number
  percentualConclusao: number
}

export interface PublicMedicaoResponse {
  data: string
  etapa: string
  recursosLiberados: number | null
}

export interface PublicMutiraoResponse {
  data: string
  turno: Turno
  vagasDisponiveis: number
}
