import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as unidadeService from '@/services/unidadeService'
import type { UnidadeCommand, UnidadeResponse, UnidadeStatus } from '@/types/unidade'

export const useUnidadesStore = defineStore('unidades', () => {
  const unidades = ref<UnidadeResponse[]>([])
  const carregando = ref(false)
  const erro = ref<string | null>(null)

  async function listar(status?: UnidadeStatus): Promise<void> {
    carregando.value = true
    erro.value = null
    try {
      unidades.value = await unidadeService.listUnidades(status)
    } catch {
      erro.value = 'Não foi possível carregar as unidades habitacionais.'
    } finally {
      carregando.value = false
    }
  }

  async function criar(command: UnidadeCommand): Promise<void> {
    const unidade = await unidadeService.createUnidade(command)
    unidades.value = [...unidades.value, unidade]
  }

  async function atribuir(id: string, familiaId: string): Promise<void> {
    const atualizada = await unidadeService.atribuirUnidade(id, familiaId)
    unidades.value = unidades.value.map((unidade) => (unidade.id === id ? atualizada : unidade))
  }

  return {
    unidades,
    carregando,
    erro,
    listar,
    criar,
    atribuir,
  }
})
