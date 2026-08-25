export type UnidadeStatus = 'Livre' | 'Reservada' | 'Ocupada'

export interface UnidadeCommand {
  identificador: string
  metragem: number
  localizacaoTerreno: string
}

export interface UnidadeResponse extends UnidadeCommand {
  id: string
  status: UnidadeStatus
  familiaId: string | null
}
