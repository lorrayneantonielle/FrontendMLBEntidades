<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { usuario } = useAuth()

const acessos = [
  { titulo: 'Famílias', descricao: 'Cadastro e acompanhamento', icon: 'mdi-account-group-outline', to: { name: 'familias' } },
  { titulo: 'Etapas da Obra', descricao: 'Cronograma e progresso', icon: 'mdi-format-list-checks', to: { name: 'obra-etapas' } },
  { titulo: 'Medições', descricao: 'Registro de medições', icon: 'mdi-ruler-square', to: { name: 'obra-medicoes' } },
  { titulo: 'Ocorrências', descricao: 'Registros e tratativas', icon: 'mdi-alert-circle-outline', to: { name: 'obra-ocorrencias' } },
  { titulo: 'Mapa de Ocupação', descricao: 'Unidades habitacionais', icon: 'mdi-map-marker-radius-outline', to: { name: 'unidades-mapa' } },
  { titulo: 'Escalas de Mutirão', descricao: 'Organização de turnos', icon: 'mdi-calendar-check-outline', to: { name: 'mutirao-escalas' } },
]

const indicadores = [
  { titulo: 'Famílias cadastradas', icon: 'mdi-account-group-outline' },
  { titulo: 'Unidades ocupadas', icon: 'mdi-home-city-outline' },
  { titulo: 'Progresso da obra', icon: 'mdi-crane' },
  { titulo: 'Presença em mutirões', icon: 'mdi-account-hard-hat-outline' },
]
</script>

<template>
  <div class="mlb-dashboard">
    <header class="mlb-dashboard__header">
      <h1 class="mlb-dashboard__title">
        Olá{{ usuario ? `, ${usuario.nomeCompleto.split(' ')[0]}` : '' }} 👋
      </h1>
      <p class="mlb-dashboard__subtitle">
        Aqui está um resumo do que está acontecendo no empreendimento.
      </p>
    </header>

    <section class="mlb-section">
      <h2 class="mlb-section__title">Indicadores</h2>

      <div class="mlb-indicadores">
        <v-card
          v-for="indicador in indicadores"
          :key="indicador.titulo"
          variant="outlined"
          class="mlb-indicador"
        >
          <v-icon :icon="indicador.icon" size="26" color="secondary" class="mb-2" />
          <span class="mlb-indicador__valor">Em breve</span>
          <span class="mlb-indicador__titulo">{{ indicador.titulo }}</span>
        </v-card>
      </div>
    </section>

    <section class="mlb-section">
      <h2 class="mlb-section__title">Acesso rápido</h2>

      <div class="mlb-acessos">
        <v-card
          v-for="acesso in acessos"
          :key="acesso.titulo"
          :to="acesso.to"
          class="mlb-acesso"
          elevation="0"
        >
          <v-avatar color="primary" size="44" class="mlb-acesso__icon">
            <v-icon :icon="acesso.icon" color="warning" size="22" />
          </v-avatar>
          <div class="mlb-acesso__texto">
            <span class="mlb-acesso__titulo">{{ acesso.titulo }}</span>
            <span class="mlb-acesso__descricao">{{ acesso.descricao }}</span>
          </div>
          <v-icon icon="mdi-chevron-right" color="secondary" class="mlb-acesso__seta" />
        </v-card>
      </div>
    </section>
  </div>
</template>

<style scoped>
.mlb-dashboard {
  padding: 32px clamp(16px, 4vw, 40px);
  max-width: 1200px;
  margin: 0 auto;
}

.mlb-dashboard__header {
  margin-bottom: 32px;
}

.mlb-dashboard__title {
  color: #001427;
  font-size: 1.75rem;
  font-weight: 700;
}

.mlb-dashboard__subtitle {
  margin-top: 4px;
  color: rgba(0, 20, 39, 0.6);
  font-size: 0.95rem;
}

.mlb-section {
  margin-bottom: 36px;
}

.mlb-section__title {
  margin-bottom: 14px;
  color: #001427;
  font-size: 1.05rem;
  font-weight: 700;
}

.mlb-indicadores {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.mlb-indicador {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-color: rgba(112, 141, 129, 0.35) !important;
  border-style: dashed !important;
  background: rgba(255, 255, 255, 0.6);
}

.mlb-indicador__valor {
  color: rgba(0, 20, 39, 0.45);
  font-size: 0.95rem;
  font-weight: 700;
}

.mlb-indicador__titulo {
  margin-top: 2px;
  color: rgba(0, 20, 39, 0.55);
  font-size: 0.82rem;
}

.mlb-acessos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.mlb-acesso {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 6px 20px rgba(0, 20, 39, 0.06);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.mlb-acesso:hover {
  box-shadow: 0 10px 28px rgba(0, 20, 39, 0.12);
  transform: translateY(-2px);
}

.mlb-acesso__icon {
  flex-shrink: 0;
}

.mlb-acesso__texto {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.mlb-acesso__titulo {
  color: #001427;
  font-size: 0.95rem;
  font-weight: 700;
}

.mlb-acesso__descricao {
  color: rgba(0, 20, 39, 0.55);
  font-size: 0.8rem;
}

.mlb-acesso__seta {
  margin-left: auto;
  flex-shrink: 0;
}
</style>
