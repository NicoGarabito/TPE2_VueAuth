import type { Sesion } from '@/models/Sesion';  // Importamos el tipo 'Sesion' desde el archivo del modelo

// Definimos la interfaz 'SesionState' que describe la estructura del estado de la sesión
export interface SesionState {
  loading: boolean;  // Indica si la sesión o la información relacionada está en proceso de carga
  data: Sesion | null;  // Contiene la información de la sesión; puede ser 'null' si no hay datos cargados
}
