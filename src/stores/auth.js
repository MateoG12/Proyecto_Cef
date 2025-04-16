// src/stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    userRole: null // 'Administrador', 'Entrenador', 'Deportista'
  }),
  actions: {
    login(role) {
      this.isLoggedIn = true;
      this.userRole = role;
    },
    logout() {
      this.isLoggedIn = false;
      this.userRole = null;
      localStorage.removeItem('auth_token');
      // Limpia otros datos específicos de rol
      localStorage.removeItem('usuario');
      localStorage.removeItem('usuarioDeportista');
    },
    checkLoginStatus() {
      const token = localStorage.getItem('auth_token');
      this.isLoggedIn = !!token;
      // Determina el rol basado en lo almacenado en localStorage
      if (localStorage.getItem('rolusuario') === 'Administrador') {
        this.userRole = 'Administrador';
      } else if (localStorage.getItem('rolusuario') === 'Entrenador') {
        this.userRole = 'Entrenador';
      } else if (localStorage.getItem('usuarioDeportista')) {
        this.userRole = 'Deportista';
      }
    }
  }
})