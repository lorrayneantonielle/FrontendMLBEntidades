import { ref } from 'vue'
import * as publicService from '@/services/publicService'
import type { PublicEtapaResponse, PublicMedicaoResponse, PublicMutiraoResponse, PublicStatusResponse } from '@/types/public'

export function usePublic() {
  const status = ref<PublicStatusResponse | null>(null)
  const etapas = ref<PublicEtapaResponse[]>([])
  const medicoes = ref<PublicMedicaoResponse[]>([])
  const mutiroes = ref<PublicMutiraoResponse[]>([])
  const carregando = ref(false)
  const erro = ref<string | null>(null)

  async function carregarTudo(): Promise<void> {
    carregando.value = true
    erro.value = null
    try {
      const [statusResp, etapasResp, medicoesResp, mutiroesResp] = await Promise.all([
        publicService.getStatus(),
        publicService.getEtapas(),
        publicService.getMedicoes(),
        publicService.getMutiroes(),
      ])
      status.value = statusResp
      etapas.value = etapasResp
      medicoes.value = medicoesResp
      mutiroes.value = mutiroesResp
    } catch {
      erro.value = 'Não foi possível carregar as informações públicas do empreendimento.'
    } finally {
      carregando.value = false
    }
  }

  return {
    status,
    etapas,
    medicoes,
    mutiroes,
    carregando,
    erro,
    carregarTudo,
  }
}
