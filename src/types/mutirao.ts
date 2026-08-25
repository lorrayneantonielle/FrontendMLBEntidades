export type Turno = 'Manha' | 'Tarde' | 'Integral'

export const TURNO_OPCOES: Turno[] = ['Manha', 'Tarde', 'Integral']

export interface MutiraoEscalaCommand {
  data: string
  turno: Turno
  vagasTotais: number
  pontuacaoPorPresenca: number
}

export interface MutiraoEscalaResponse extends MutiraoEscalaCommand {
  id: string
  vagasDisponiveis: number
}

export interface PresencaCommand {
  mutiraoEscalaId: string
  familiaId: string
}

export interface PresencaResponse extends PresencaCommand {
  id: string
  dataRegistro: string
  pontuacaoConcedida: number
}

export interface PontuacaoFamiliaResponse {
  familiaId: string
  pontuacaoAcumulada: number
  baixaParticipacao: boolean
  presencas: PresencaResponse[]
}
