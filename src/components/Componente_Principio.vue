<template>
    <header class="headerheader">
      <div class="contenedorheader">
        <div class="hamburger-menu" @click="toggleMenu">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="menuheader" :class="{ 'menu-mobile': isMenuVisible }">
          <p><router-link class="p3" to="/">Inicio</router-link></p>
          <p><router-link class="p2" to="/noticias">Noticias</router-link></p>
          <p><router-link class="p2" to="/Nosotros">Nosotros</router-link></p>
        </div>
        <div class="logo">
          <img class="img" src=".\icons\WhatsApp_Image_2024-08-23_at_9.04.20_AM-removebg-preview.png" alt="Logo">
        </div>
        <div class="auth-buttons">
          <!-- Botón de Acceso Directo al Perfil (visible CON token) -->
          <router-link 
            v-if="authStore.isLoggedIn" 
            to="/acceso-directo" 
            class="profile-access-button session-button">
            Inicio Sesión
            </router-link>
          
          <!-- Botón de Cerrar Sesión (visible CON token) -->
          <button 
            v-if="authStore.isLoggedIn" 
            @click="logout" 
            class="logout-button session-button"
            >
            Cerrar Sesión
            </button>
          
          <!-- Botón normal de Login (visible SIN token) -->
          <router-link 
            v-if="!authStore.isLoggedIn" 
            to="/login" 
            class="login-button"
            >
            <img class="img_boton" src=".\icons\usuario.png" alt="Login">
            </router-link>
        </div>
      </div>
    </header>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
    authStore.checkLoginStatus();
});

function logout() {
  authStore.logout();
  router.push('/');
}
</script>

<style>
@keyframes backgroundAnimation {
    0% {
        background-color: rgba(0, 0, 0, 0); 
    }
    50% {
        background-color: #720c0c; 
    }
    100% {
        background-color: rgba(0, 0, 0, 1); 
    }
}
.session-button {
    background-color: #ee0404;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    margin-left: 15px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    text-decoration: none;
    font-family: 'Arial', sans-serif;
}

.session-button:hover {
    background-color: #b50303;
    transform: scale(1.05);
}
.headerheader {
    width: 100%;
    height: 86px;
    background-color: rgba(0, 0, 0, 0); 
    animation: backgroundAnimation 6s ease-out forwards; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.contenedorheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 15px;
    position: relative;
}

.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.logo .img {
    width: 90px;
    height: auto;
    margin-top: 12px;
    margin-right: 30px;
}

.menuheader {
    display: flex;
    gap: 35px;
    justify-content: flex-end;
    align-items: center;
}

.p3, .p2 {
    font-family: 'Arial', sans-serif;
    font-size: 15px;
    color: #fff;
    text-decoration: none;
    transition: color 0.3s;
    margin: 0 15px;
    letter-spacing: 1px;
}

.p3:hover, .p2:hover {
    color: #ee0404;
}

.login {
    display: flex;
    justify-content: center;
    position: absolute;
    right: 20px;
}

.img_boton {
    width: 45px;
    height: auto;
    margin-left: 20px;
}

.hamburger-menu {
    display: none;
    flex-direction: column;
    gap: 4px;
    cursor: pointer;
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 1001;
}

.hamburger-menu div {
    width: 30px;
    height: 4px;
    background-color: white;
    border-radius: 5px;
}

.menu-mobile {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    position: absolute;
    left: 20px;
    top: 60px;
    background-color: rgba(0, 0, 0, 0.9);
    padding: 15px;
    z-index: 1000;
    width: 250px;
}

.hamburger-menu.active + .menu-mobile {
    display: flex;
}

.menu-mobile .p3, .menu-mobile .p2 {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s;
    font-size: 18px;
    letter-spacing: 1px;
}

.menu-mobile .p3:hover, .menu-mobile .p2:hover {
    color: #ee0404;
}

@media (max-width: 768px) {
    .headerheader {
        height: 90px;
        padding: 12px 0;
    }

    .contenedorheader {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .logo .img {
        width: 120px;
        margin-bottom: 15px;
    }

    .menuheader {
        display: none;
    }

    .hamburger-menu {
        display: flex;
    }

    .p2, .p3 {
        font-size: 20px;
        margin: 0 15px;
    }

    .img_boton {
        width: 50px;
    }

    .login {
        margin-top: 15px;
    }
}

@media (max-width: 760px) {
    .headerheader {
        height: 100px;
        padding: 15px 0;
    }

    .logo .img {
        width: 130px;
        margin-bottom: 20px;
    }

    .menuheader {
        gap: 60px;
    }

    .p2, .p3 {
        font-size: 22px;
        margin: 0 20px;
    }

    .img_boton {
        width: 60px;
    }

    .login {
        margin-top: 20px;
    }

    .menu-mobile {
        display: flex;
    }

    .contenedorheader {
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .logo {
        margin-right: 30px;
    }

    .login {
        margin-left: 30px;
    }
}
</style>