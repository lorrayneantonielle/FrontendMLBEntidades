import { storeToRefs } from 'pinia'
import { useMutiraoStore } from '@/stores/mutiraoStore'

export function useMutirao() {
  const store = useMutiraoStore()
  const { escalas, pontuacoes, carregando, erro } = storeToRefs(store)

  return {
    escalas,
    pontuacoes,
    carregando,
    erro,
    listarEscalas: store.listarEscalas,
    criarEscala: store.criarEscala,
    registrarPresenca: store.registrarPresenca,
    listarPontuacao: store.listarPontuacao,
  }
}
