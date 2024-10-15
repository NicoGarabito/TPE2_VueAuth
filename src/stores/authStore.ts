import {defineStore} from 'pinia'
import { fetchWrapper } from '@/helpers/fetchwrapper'
import type {User} from '@/models/User'
import router from '@/router'


const baseUrl = `${import.meta.env.VITE_API_URL}/users`

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        auth: {} as {loading: boolean, data?: User | null, refreshTokenTimeout: number | null}
    }),

    actions: {
        async login(user: string, password: string) {
            this.auth.data = await fetchWrapper.post('${baseUrl}/authenticate', {user, password},{ credentials: 'include' });
            this.starRefreshTokenTimer();
        },
        logout() {
            fetchWrapper.post('${baseUrl}/revoke-token', { credentials: 'include' });
            this.stopRefreshTokenTimer();
            this.auth.data = null;
            router.push({name: '/login'});
        },

        async refreshToken() {
            this.auth.data = await fetchWrapper.post('${baseUrl}/refresh-token',{},{ credentials: 'include' });
            this.starRefreshTokenTimer();
        },
        starRefreshTokenTimer() {
            if(!this.auth.data || !this.auth.data.jwtToken) return;

            const jwtBase64 = this.auth.data.jwtToken.split('.')[1];
            const decodedJwtToken = JSON.parse(atob(jwtBase64[1]))

            const expires = new Date(decodedJwtToken.exp * 1000);
            const timeout = expires.getTime() - Date.now() - (60 * 1000);

            this.auth.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
        },

        stopRefreshTokenTimer() {
            if(this.auth.refreshTokenTimeout) {
                clearTimeout(this.auth.refreshTokenTimeout);
                this.auth.refreshTokenTimeout = null;
            }
        }
    }    
})