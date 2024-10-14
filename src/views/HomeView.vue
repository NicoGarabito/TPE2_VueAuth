<template>
  <div>
    <h1>Bienvenido, {{ user.user }}</h1>
    <p>Contraseña: {{ user.password }}</p>
    <p>Recordarme: {{ user.remember ? 'Sí' : 'No' }}</p>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'

const store = useUserStore()
const user = store.user
</script>
