<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { login } = useAuth()
const router = useRouter()

const email = ref('')
const senha = ref('')
const erro = ref('')
const carregando = ref(false)

const casas = [
  'casa--1',
  'casa--2',
  'casa--3',
  'casa--4',
  'casa--5',
  'casa--6',
  'casa--7',
  'casa--8',
  'casa--9',
] as const

async function onSubmit() {
  erro.value = ''
  carregando.value = true

  try {
    await login({
      email: email.value,
      senha: senha.value,
    })

    await router.push({ name: 'admin-home' })
  } catch {
    erro.value = 'Email ou senha inválidos.'
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <v-container fluid class="fill-height pa-0 login-page">
    <v-row no-gutters class="fill-height">
      <!-- Formulário -->
      <v-col
        cols="12"
        md="6"
        class="login-form-panel d-flex align-center justify-center pa-4 pa-sm-8"
      >
        <v-card
          class="login-card mx-auto pa-4 pa-sm-8 card-login"
          width="100%"
          max-width="440"
          elevation="0"
        >
          <v-card-title class="text-h4 font-weight-bold px-0 mb-4 titulo">
            login
          </v-card-title>

          <v-card-text class="px-0">
            <v-form @submit.prevent="onSubmit">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
                autocomplete="username"
              />

              <v-text-field
                v-model="senha"
                label="Senha"
                type="password"
                required
                autocomplete="current-password"
              />

              <v-alert
                v-if="erro"
                type="error"
                density="compact"
                class="mb-4"
              >
                {{ erro }}
              </v-alert>

              <v-btn
                type="submit"
                block
                :loading="carregando"
                class="login-button"
              >
                Entrar
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Ilustração CSS -->
      <v-col
        cols="12"
        md="6"
        class="login-art d-none d-md-flex pa-0"
      >
        <div class="cenario" aria-hidden="true">
          <div class="lua"></div>

          <div class="estrelas">
            <span class="estrela estrela--1"></span>
            <span class="estrela estrela--2"></span>
            <span class="estrela estrela--3"></span>
            <span class="estrela estrela--4"></span>
            <span class="estrela estrela--5"></span>
            <span class="estrela estrela--6"></span>
            <span class="estrela estrela--7"></span>
          </div>

          <div class="nuvem nuvem--1"></div>
          <div class="nuvem nuvem--2"></div>

          <div class="colina colina--fundo"></div>

          <div class="cidade">
            <div
              v-for="classe in casas"
              :key="classe"
              :class="['casa', classe]"
            >
              <span class="casa__chamine"></span>
              <span class="casa__janela casa__janela--esq"></span>
              <span class="casa__janela casa__janela--dir"></span>
              <span class="casa__porta"></span>
            </div>
          </div>

          <div class="colina colina--frente"></div>
          <div class="chao"></div>
        </div>

        <div class="art-copy">
          <span class="art-kicker">Movimento de Luta nos bairros, vilas e favelas</span>

          <h2>
            Enquanto morar for privilégio,
            <strong>ocupar será direito!</strong>
          </h2>

          <p>
            Minha casa, minha vida Entidades
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.login-page {
  --azul: #001427;
  --vermelho-escuro: #8d0801;
  --vermelho: #bf0603;
  --creme: #f4d58d;
  --verde: #708d81;

  min-height: 100vh;
  overflow: hidden;
  background: var(--vermelho-escuro);
}

.login-form-panel {
  min-height: 100vh;
  background: var(--vermelho-escuro);
}

.login-card {
  border-radius: 24px;
  box-shadow: 0 24px 60px rgba(0, 20, 39, 0.2);
  text-align: center;
  background-color:#f8e8c1;
}

.titulo{
  color:var(--azul)
}

.login-button {
  min-height: 48px;
  background-color: var(--vermelho) !important;
  color: var(--creme) !important;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.login-button:hover {
  background-color: var(--azul) !important;
}

/* Área da ilustração */
.login-art {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: var(--azul);
}

.cenario {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background:
    linear-gradient(
      180deg,
      var(--azul) 0%,
      var(--azul) 47%,
      rgba(112, 141, 129, 0.8) 100%
    );
}

/* Lua */
.lua {
  position: absolute;
  z-index: 1;
  top: 10%;
  right: 13%;
  width: clamp(60px, 7vw, 100px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--creme);
  box-shadow:
    0 0 0 14px rgba(244, 213, 141, 0.06),
    0 0 45px rgba(244, 213, 141, 0.25);
}

.lua::after {
  content: '';
  position: absolute;
  top: -8%;
  left: 27%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--azul);
}

/* Estrelas */
.estrelas {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.estrela {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--creme);
  opacity: 0.75;
  animation: cintilar 3.5s ease-in-out infinite;
}

.estrela--1 {
  top: 14%;
  left: 17%;
}

.estrela--2 {
  top: 26%;
  left: 42%;
  animation-delay: 0.8s;
}

.estrela--3 {
  top: 18%;
  left: 68%;
  animation-delay: 1.5s;
}

.estrela--4 {
  top: 34%;
  left: 82%;
  animation-delay: 0.4s;
}

.estrela--5 {
  top: 39%;
  left: 28%;
  animation-delay: 1.8s;
}

.estrela--6 {
  top: 10%;
  left: 52%;
  animation-delay: 2.2s;
}

.estrela--7 {
  top: 31%;
  left: 58%;
  animation-delay: 1.1s;
}

@keyframes cintilar {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.75);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Nuvens */
.nuvem {
  position: absolute;
  z-index: 1;
  width: 145px;
  height: 15px;
  border-radius: 999px;
  background: rgba(244, 213, 141, 0.16);
}

.nuvem::before,
.nuvem::after {
  content: '';
  position: absolute;
  bottom: 0;
  border-radius: 50%;
  background: inherit;
}

.nuvem::before {
  left: 25px;
  width: 42px;
  height: 42px;
}

.nuvem::after {
  right: 28px;
  width: 30px;
  height: 30px;
}

.nuvem--1 {
  top: 31%;
  left: 5%;
  transform: scale(0.85);
}

.nuvem--2 {
  top: 39%;
  right: 7%;
  transform: scale(0.55);
  opacity: 0.55;
}

/* Morros */
.colina {
  position: absolute;
  left: -5%;
  width: 110%;
  pointer-events: none;
}

.colina--fundo {
  bottom: 13%;
  z-index: 2;
  height: 42%;
  background: rgba(112, 141, 129, 0.36);
  clip-path: polygon(
    0 70%,
    13% 42%,
    27% 60%,
    43% 20%,
    58% 53%,
    73% 30%,
    87% 58%,
    100% 35%,
    100% 100%,
    0 100%
  );
}

.colina--frente {
  bottom: -5%;
  z-index: 3;
  height: 35%;
  background: var(--verde);
  clip-path: polygon(
    0 55%,
    15% 35%,
    30% 58%,
    48% 25%,
    66% 54%,
    82% 30%,
    100% 48%,
    100% 100%,
    0 100%
  );
}

/* Cidade */
.cidade {
  position: absolute;
  inset: 0;
  z-index: 4;
}

/* Estrutura base de cada casa */
.casa {
  --parede: var(--creme);
  --telhado: var(--vermelho);
  --janela: var(--creme);

  position: absolute;
  bottom: 6%;
  width: clamp(78px, 9vw, 135px);
  height: clamp(120px, 23vh, 235px);
  transform-origin: center bottom;
  isolation: isolate;
}

/* Parede */
.casa::before {
  content: '';
  position: absolute;
  z-index: 1;
  inset: 29% 4% 0;
  border: 3px solid var(--azul);
  border-bottom: 0;
  border-radius: 5px 5px 0 0;
  background: var(--parede);
  box-shadow: 8px 10px 0 rgba(0, 20, 39, 0.14);
}

/* Telhado */
.casa::after {
  content: '';
  position: absolute;
  z-index: 2;
  top: 0;
  left: -8%;
  width: 116%;
  height: 49%;
  background: var(--telhado);
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
  filter: drop-shadow(0 3px 0 rgba(0, 20, 39, 0.75));
}

/* Chaminé */
.casa__chamine {
  position: absolute;
  z-index: 0;
  top: 8%;
  right: 18%;
  width: 12%;
  height: 25%;
  border: 2px solid var(--azul);
  background: var(--telhado);
}

/* Janelas */
.casa__janela {
  position: absolute;
  z-index: 3;
  top: 49%;
  width: 21%;
  height: 16%;
  border: 2px solid var(--azul);
  background: var(--janela);
  box-shadow: inset 0 0 0 2px rgba(0, 20, 39, 0.16);
}

.casa__janela--esq {
  left: 14%;
}

.casa__janela--dir {
  right: 14%;
}

.casa__janela::before,
.casa__janela::after {
  content: '';
  position: absolute;
  background: var(--azul);
}

.casa__janela::before {
  top: 0;
  bottom: 0;
  left: calc(50% - 1px);
  width: 2px;
}

.casa__janela::after {
  top: calc(50% - 1px);
  right: 0;
  left: 0;
  height: 2px;
}

/* Porta */
.casa__porta {
  position: absolute;
  z-index: 3;
  right: 38%;
  bottom: 0;
  width: 25%;
  height: 36%;
  border: 3px solid var(--azul);
  border-bottom: 0;
  border-radius: 7px 7px 0 0;
  background: var(--azul);
}

.casa__porta::after {
  content: '';
  position: absolute;
  top: 53%;
  right: 15%;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--creme);
}

/* Posicionamento e variações das casas */
.casa--1 {
  left: -8%;
  bottom: 4%;
  z-index: 2;
  transform: scale(0.65);
  --parede: var(--verde);
  --telhado: var(--creme);
  --janela: var(--azul);
}

.casa--2 {
  left: 4%;
  bottom: 5%;
  z-index: 4;
  transform: scale(0.9);
  --parede: var(--creme);
  --telhado: var(--vermelho);
  --janela: var(--azul);
}

.casa--3 {
  left: 17%;
  bottom: 3%;
  z-index: 3;
  transform: scale(0.7);
  --parede: var(--vermelho);
  --telhado: var(--creme);
  --janela: var(--creme);
}

.casa--4 {
  left: 28%;
  bottom: 7%;
  z-index: 5;
  transform: scale(1.04);
  --parede: var(--creme);
  --telhado: var(--vermelho-escuro);
  --janela: var(--azul);
}

.casa--5 {
  left: 42%;
  bottom: 4%;
  z-index: 3;
  transform: scale(0.76);
  --parede: var(--verde);
  --telhado: var(--vermelho);
  --janela: var(--creme);
}

.casa--6 {
  left: 54%;
  bottom: 6%;
  z-index: 5;
  transform: scale(0.95);
  --parede: var(--creme);
  --telhado: var(--verde);
  --janela: var(--azul);
}

.casa--7 {
  left: 68%;
  bottom: 3%;
  z-index: 3;
  transform: scale(0.68);
  --parede: var(--vermelho);
  --telhado: var(--creme);
  --janela: var(--creme);
}

.casa--8 {
  left: 78%;
  bottom: 6%;
  z-index: 5;
  transform: scale(0.9);
  --parede: var(--creme);
  --telhado: var(--vermelho);
  --janela: var(--azul);
}

.casa--9 {
  left: 91%;
  bottom: 3%;
  z-index: 2;
  transform: scale(0.65);
  --parede: var(--verde);
  --telhado: var(--creme);
  --janela: var(--azul);
}

/* Faixa de chão */
.chao {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 6;
  height: 7%;
  background: var(--azul);
  clip-path: polygon(
    0 35%,
    12% 50%,
    25% 32%,
    40% 55%,
    56% 38%,
    72% 53%,
    86% 35%,
    100% 48%,
    100% 100%,
    0 100%
  );
}

/* Texto opcional sobre a ilustração */
.art-copy {
  position: absolute;
  z-index: 10;
  top: 8%;
  left: 9%;
  max-width: 390px;
  color: var(--creme);
  pointer-events: none;
}

.art-kicker {
  display: inline-block;
  padding-left: 12px;
  border-left: 4px solid var(--vermelho);
  color: var(--creme);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.art-copy h2 {
  margin: 18px 0 12px;
  font-size: clamp(2rem, 3.8vw, 3.5rem);
  font-weight: 300;
  line-height: 1.05;
}

.art-copy h2 strong {
  color: var(--creme);
  font-weight: 800;
}

.art-copy p {
  max-width: 320px;
  color: rgba(244, 213, 141, 0.78);
  font-size: 1rem;
  line-height: 1.5;
}

@media (prefers-reduced-motion: reduce) {
  .estrela {
    animation: none;
  }
}
</style>