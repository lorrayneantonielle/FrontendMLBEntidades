import { storeToRefs } from 'pinia'
import { useUnidadesStore } from '@/stores/unidadesStore'

export function useUnidades() {
  const store = useUnidadesStore()
  const { unidades, carregando, erro } = storeToRefs(store)

  return {
    unidades,
    carregando,
    erro,
    listar: store.listar,
    criar: store.criar,
    atribuir: store.atribuir,
  }
}
