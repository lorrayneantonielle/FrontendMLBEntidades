export type FamiliaStatus =
  | 'PreCadastro'
  | 'EmAnalise'
  | 'Aprovada'
  | 'UnidadeAtribuida'
  | 'EmConstrucao'
  | 'Finalizada'

export const FAMILIA_STATUS_SEQUENCIA: FamiliaStatus[] = [
  'PreCadastro',
  'EmAnalise',
  'Aprovada',
  'UnidadeAtribuida',
  'EmConstrucao',
  'Finalizada',
]

export type DocumentoTipo = 'RG' | 'CPF' | 'ComprovanteRenda' | 'Certidao'

export const DOCUMENTO_TIPOS: DocumentoTipo[] = ['RG', 'CPF', 'ComprovanteRenda', 'Certidao']

export type DocumentoStatus = 'Pendente' | 'Recebido' | 'Validado'

export interface MembroDados {
  nome: string
  dataNascimento: string
  vinculo: string
  cpf: string
}

export interface MembroCommand extends MembroDados {
  familiaId: string
}

export interface MembroResponse extends MembroCommand {
  id: string
}

export interface DocumentoResponse {
  id: string
  familiaId: string
  tipo: DocumentoTipo
  status: DocumentoStatus
  arquivoPath: string | null
}

export interface FamiliaCreateCommand {
  rendaFamiliar: number
  situacaoVulnerabilidade: string
  membros: MembroDados[]
}

export interface FamiliaUpdateCommand {
  rendaFamiliar: number
  situacaoVulnerabilidade: string
}

export interface FamiliaStatusUpdateCommand {
  novoStatus: FamiliaStatus
  motivo?: string
}

export interface FamiliaResponse {
  id: string
  rendaFamiliar: number
  situacaoVulnerabilidade: string
  status: FamiliaStatus
  pontuacaoAcumulada: number
  membros: MembroResponse[]
  documentos: DocumentoResponse[]
  unidadeHabitacionalId: string | null
}

export interface FamiliaListResponse {
  items: FamiliaResponse[]
  total: number
}

export interface FamiliaListParams {
  status?: FamiliaStatus
  nome?: string
  numeroMembros?: number
  page?: number
  pageSize?: number
}
