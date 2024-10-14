import { defineStore } from 'pinia'
import type { User } from '@/models/User.ts'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {} as User,
  }),
  actions: {
    setUser(user: User) {
      this.user = user
    }
  }
})
