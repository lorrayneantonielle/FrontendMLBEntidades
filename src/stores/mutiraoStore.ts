import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as mutiraoService from '@/services/mutiraoService'
import type { MutiraoEscalaCommand, MutiraoEscalaResponse, PontuacaoFamiliaResponse, PresencaCommand } from '@/types/mutirao'

export const useMutiraoStore = defineStore('mutirao', () => {
  const escalas = ref<MutiraoEscalaResponse[]>([])
  const pontuacoes = ref<PontuacaoFamiliaResponse[]>([])
  const carregando = ref(false)
  const erro = ref<string | null>(null)

  async function listarEscalas(): Promise<void> {
    carregando.value = true
    erro.value = null
    try {
      escalas.value = await mutiraoService.listEscalas()
    } catch {
      erro.value = 'Não foi possível carregar as escalas de mutirão.'
    } finally {
      carregando.value = false
    }
  }

  async function criarEscala(command: MutiraoEscalaCommand): Promise<void> {
    const escala = await mutiraoService.createEscala(command)
    escalas.value = [...escalas.value, escala].sort((a, b) => a.data.localeCompare(b.data))
  }

  async function registrarPresenca(command: PresencaCommand): Promise<void> {
    await mutiraoService.registrarPresenca(command)
    await listarEscalas()
  }

  async function listarPontuacao(baixaParticipacao?: boolean): Promise<void> {
    carregando.value = true
    erro.value = null
    try {
      pontuacoes.value = await mutiraoService.getPontuacaoPorFamilia({ baixaParticipacao })
    } catch {
      erro.value = 'Não foi possível carregar o relatório de pontuação.'
    } finally {
      carregando.value = false
    }
  }

  return {
    escalas,
    pontuacoes,
    carregando,
    erro,
    listarEscalas,
    criarEscala,
    registrarPresenca,
    listarPontuacao,
  }
})
