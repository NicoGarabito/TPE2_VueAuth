import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';  // Importamos la función para decodificar el token JWT
import type { Sesion } from '@/models/Sesion';  // Importamos el tipo Sesion para tipar la estructura de datos de la sesión

// Definimos la store de sesión usando Pinia
export const useSesionStore = defineStore('sesionStore', {
  
  // Estado inicial de la store
  state: (): { loading: boolean; data: Sesion } => ({
    loading: false,  // Indica si la sesión está en proceso de carga
    data: {
      payload: '',  // Aquí almacenamos el token JWT completo
      createdAt: null,  // La fecha y hora en que se creó el token
      refreshAt: null,  // La fecha y hora en que el token puede ser refrescado
      expiresAt: null,  // La fecha y hora en que el token expira
    },
  }),

  // Acciones (métodos) de la store
  actions: {
    // Actualiza la información de la sesión decodificando un token JWT
    update(token: string | null) {
      if (!token || typeof token !== 'string') {
        console.error('Error al decodificar el token JWT: El token no es válido o es nulo');
        return;
      }

      try {
        // Decodifica el token JWT para extraer la información de la sesión
        const decodedToken: any = jwtDecode(token);

        // Guarda el token completo como payload
        this.data.payload = token;

        // Si el token contiene un 'iat' (issued at), lo convertimos en una fecha
        this.data.createdAt = decodedToken.iat ? new Date(decodedToken.iat * 1000) : null;

        // Si el token contiene un 'exp' (expiration), lo convertimos en una fecha
        this.data.expiresAt = decodedToken.exp ? new Date(decodedToken.exp * 1000) : null;

        // Si el token contiene un 'nbf' (not before), lo convertimos en una fecha
        this.data.refreshAt = decodedToken.nbf ? new Date(decodedToken.nbf * 1000) : null;
      } catch (error) {
        // Manejamos cualquier error que ocurra durante la decodificación del token
        console.error('Error al decodificar el token JWT', error);
      }
    }
  }
});
