import { defineStore } from 'pinia';  // Importamos Pinia para definir la store
import type { User } from '@/models/UserModel';  // Importamos el tipo 'User' desde el modelo de usuarios

// Definimos la store 'userStore' utilizando Pinia
export const useUserStore = defineStore('userStore', {
  // Estado inicial de la store
  state: () => ({
    user: {} as User | null,  // El objeto 'user' puede ser de tipo 'User' o 'null' si no hay usuario definido
  }),

  // Acciones que modifican el estado de la store
  actions: {
    // Acción para establecer el usuario
    setUser(user: User) {
      this.user = user;  // Asignamos el objeto 'user' al estado de la store
    },
  },
});
