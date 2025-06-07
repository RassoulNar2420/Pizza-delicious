import { defineStore } from 'pinia'
import { setSession, removeSession } from '@/plugins/http'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
  // contenido del store
  state: () => {
    return {
      token: null,
      tokenData: null
    }
  },
  getters: {
    hasSession: (state) => {
      return !!state.token
    },
    userProfile: (state) => {
      return state.tokenData?.profile
    },
    isAdmin: (state) => {
      return this.userProfile === 'admin'
    },
    sessionId: (state) => {
      return state.tokenData?.id || null
    }
  },
  actions: {
    setSession(token = null) {
      if (!token) return

      try {
        const decodedToken = token ? jwtDecode(token) : null
        this.token = token
        this.tokenData = decodedToken
        setSession(token)
      } catch (e) {
        console.warn("not valid session")
      }
    },
    resetSession() {
      if (!this.token) return
      this.token = null
      this.tokenData = null
      removeSession()
    }
  }
})
