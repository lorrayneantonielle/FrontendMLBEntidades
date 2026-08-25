import { storeToRefs } from 'pinia'
import { useObraStore } from '@/stores/obraStore'

export function useObra() {
  const store = useObraStore()
  const { etapas, medicoes, ocorrencias, carregando, erro } = storeToRefs(store)

  return {
    etapas,
    medicoes,
    ocorrencias,
    carregando,
    erro,
    listarEtapas: store.listarEtapas,
    criarEtapa: store.criarEtapa,
    atualizarPercentual: store.atualizarPercentual,
    listarMedicoes: store.listarMedicoes,
    registrarMedicao: store.registrarMedicao,
    listarOcorrencias: store.listarOcorrencias,
    registrarOcorrencia: store.registrarOcorrencia,
  }
}
