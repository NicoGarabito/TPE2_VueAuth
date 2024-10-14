import {defineStore} from 'pinia'
import { fetchWrapper } from '@/helpers/fetchwrapper'
import type {User} from '@/models/User'


const baseUrl = `${import.meta.env.VITE_API_URL}/users`

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        auth: {} as {loading: boolean, data?: User | null, refreshTokenTimeout: number | null}
    }),

    actions: {
        logout() {
            fetchWrapper.post('${baseUrl}/revoke-token', { credentials: 'include' });
        }

    }
    
})