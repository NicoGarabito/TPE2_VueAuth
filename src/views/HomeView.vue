<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
import { useSesionStore } from '@/stores/sesionStore'
import { ref, computed} from 'vue'
import router from '@/router'

const authStore = useAuthStore()
const userStore = useUserStore()
const sesionStore = useSesionStore()

// Obtener información del usuario logueado y sesion
const users = userStore.users
const userData = authStore.auth.data
const sesionData = sesionStore.data

// Función de logout
function logout() {
  authStore.logout().then(() => router.push('/login'));
  
}

function createNewUser() {
  // falto crear el nuevo usuario
  console.log("Creando nuevo usuario...");
}

// Actualizar el estado de la sesión cuando se loguee el usuario o se refresque el token
sesionStore.update(authStore.auth.data?.jwtToken || null);

</script>

<template>
  <div class="wrapper">
    <!-- Mostrar el nombre del usuario logueado -->
    <h2>Bienvenido {{ userData?.firstName }}</h2>
      
    <!-- Línea divisoria -->
    <hr />

    <!-- Información del usuario y JWT -->
    
      <h2>Información del usuario</h2>
      <p>Nombre: {{ userData?.firstName }} {{ userData?.lastName }}</p>
      <p>Roll: {{ userData?.isAdmin ? 'Administrador' : 'Usuario' }}</p>      

    <!-- Línea divisoria -->
    <hr />

    <!-- Información de la sesión  -->

    <h2>Información de sesion</h2>
    <p>JWT payload: {{ sesionData?.payload }}</p>
    <p>JWT creado a las: {{ sesionData?.createAt }}</p>
    <p>JWT expira a las: {{ sesionData?.expiresAt }}</p>
    <p>JWT se refresca a las: {{ sesionData?.refreshAt }}</p>
      

    <!-- Línea divisoria -->
    <hr />

    <!-- Lista de usuarios -->  
    
    <div>
      <h2>Lista de usuarios</h2>
      <ul>
        <li v-for="(user, index) in users" :key="index">
          {{ user.username }} (Recordarme: {{ user.remember ? 'Sí' : 'No' }})
        </li>
      </ul>
    </div>

    <!-- Línea divisoria -->
    <hr />

    <!-- Botón de logout -->
    <button @click="logout()">Logout</button>
  </div>
</template>



<style>
/* Estilos  */
h1, h2, p {
  margin: 10px 0;
}

hr {
  margin: 20px 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  display: block; 
  margin: 20px auto; 
}

button:hover {
  background-color: #2980b9;
}
</style>