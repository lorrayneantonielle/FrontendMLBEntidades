import { storeToRefs } from 'pinia'
import { useFamiliasStore } from '@/stores/familiasStore'

export function useFamilias() {
  const store = useFamiliasStore()
  const { familias, total, familiaAtual, carregando, erro } = storeToRefs(store)

  return {
    familias,
    total,
    familiaAtual,
    carregando,
    erro,
    listar: store.listar,
    carregar: store.carregar,
    criar: store.criar,
    atualizar: store.atualizar,
    atualizarStatus: store.atualizarStatus,
    adicionarMembro: store.adicionarMembro,
    atualizarMembro: store.atualizarMembro,
    removerMembro: store.removerMembro,
    enviarDocumento: store.enviarDocumento,
  }
}
