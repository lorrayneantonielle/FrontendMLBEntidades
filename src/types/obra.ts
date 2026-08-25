export type StatusAprovacao = 'Pendente' | 'Aprovada' | 'Rejeitada'

export const STATUS_APROVACAO_OPCOES: StatusAprovacao[] = ['Pendente', 'Aprovada', 'Rejeitada']

export interface EtapaObraCommand {
  nome: string
  ordem: number
}

export interface EtapaObraResponse extends EtapaObraCommand {
  id: string
  percentualConclusao: number
}

export interface MedicaoCommand {
  etapaObraId: string
  data: string
  statusAprovacao: StatusAprovacao
  recursosLiberados?: number | null
  observacao?: string | null
}

export interface MedicaoResponse extends MedicaoCommand {
  id: string
  divergente: boolean
}

export interface OcorrenciaCommand {
  etapaObraId: string
  descricao: string
  data: string
}

export interface OcorrenciaResponse extends OcorrenciaCommand {
  id: string
}
