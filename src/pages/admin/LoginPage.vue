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

async function onSubmit() {
  erro.value = ''
  carregando.value = true
  try {
    await login({ email: email.value, senha: senha.value })
    await router.push({ name: 'admin-home' })
  } catch {
    erro.value = 'Email ou senha inválidos.'
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <v-container class="fill-height" max-width="480">
    <v-card class="mx-auto" width="100%">
      <v-card-title>Entrar</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="onSubmit">
          <v-text-field v-model="email" label="Email" type="email" required autocomplete="username" />
          <v-text-field
            v-model="senha"
            label="Senha"
            type="password"
            required
            autocomplete="current-password"
          />
          <v-alert v-if="erro" type="error" density="compact" class="mb-4">{{ erro }}</v-alert>
          <v-btn type="submit" color="primary" block :loading="carregando">Entrar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
