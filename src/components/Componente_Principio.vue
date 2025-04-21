<template>
    <header class="headerheader">
      <div class="contenedorheader">
        <div class="hamburger-menu" @click="toggleMenu" :class="{ 'active': isMenuVisible }">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="menuheader" :class="{ 'menu-mobile': isMenuVisible }">
          <p><router-link class="p3" to="/" @click="closeMenu">Inicio</router-link></p>
          <p><router-link class="p2" to="/noticias" @click="closeMenu">Noticias</router-link></p>
          <p><router-link class="p2" to="/Nosotros" @click="closeMenu">Nosotros</router-link></p>
        </div>
        <div class="logo">
          <img class="img1" src=".\icons\WhatsApp_Image_2024-08-23_at_9.04.20_AM-removebg-preview.png" alt="Logo">
        </div>
        <div class="auth-buttons">
          <router-link 
            v-if="authStore.isLoggedIn" 
            to="/acceso-directo" 
            class="profile-access-button session-button"
            @click="closeMenu">
            Inicio Sesión
          </router-link>
          
          <button 
            v-if="authStore.isLoggedIn" 
            @click="logout" 
            class="logout-button session-button">
            Cerrar Sesión
          </button>
          
          <router-link 
            v-if="!authStore.isLoggedIn" 
            to="/login" 
            class="login-button">
            <img class="img_boton" src=".\icons\usuario.png" alt="Login">
          </router-link>
        </div>
      </div>
    </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const isMenuVisible = ref(false);

onMounted(() => {
    authStore.checkLoginStatus();
});

function logout() {
  authStore.logout();
  router.push('/');
  closeMenu();
}

function toggleMenu() {
  isMenuVisible.value = !isMenuVisible.value;
}

function closeMenu() {
  isMenuVisible.value = false;
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

.logo .img1 {
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

.auth-buttons {
    display: flex;
    align-items: center;
}

.img_boton {
    width: 45px;
    height: auto;
    margin-left: 20px;
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

/* Estilos del menú hamburguesa */
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
    transition: all 0.3s ease;
}

.hamburger-menu.active div:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

.hamburger-menu.active div:nth-child(2) {
    opacity: 0;
}

.hamburger-menu.active div:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}

/* Menú móvil */
.menu-mobile {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    position: absolute;
    left: 0;
    top: 86px;
    background-color: rgba(0, 0, 0, 0.9);
    padding: 20px;
    z-index: 1000;
    width: 100%;
    box-sizing: border-box;
}

/* Media Queries */
@media (max-width: 768px) {
    .headerheader {
        height: 86px;
    }

    .menuheader {
        display: none;
    }

    .menuheader.menu-mobile {
        display: flex;
    }

    .hamburger-menu {
        display: flex;
    }

    .logo {
        position: static;
        transform: none;
        margin-right: auto;
    }
    .img1{
        margin-left: 290px;
    } 
    .logo {
        margin: 0;
        width: 80px;
    }

    .contenedorheader {
        justify-content: space-between;
        padding: 0 20px;
    }

    .auth-buttons {
        position: absolute;
        right: 20px;
    }
    .session-button {
        padding: 5px 10px;
        font-size: 12px;
        margin-left: 8px;
        border-radius: 15px;
    }
    
    .img_boton {
        width: 30px;
        margin-left: 8px;
    }
}

@media (max-width: 495px) {
    
    .session-button {
        padding: 6px 12px;
        font-size: 12px;
        margin-left: 10px;
    }

    .img_boton {
        width: 35px;
        margin-left: 10px;
    }
    .img1{
        margin-left: 350px;
    } 
    .hamburger-menu {
        left: 15px;
        top: 15px;
    }

    .hamburger-menu div {
        width: 25px;
        height: 3px;
    }
}
@media (max-width: 395px) {
    .session-button {
        padding: 3px 8px;
        font-size: 10px;
        margin-left: 5px;
        border-radius: 12px;
        min-width: 70px; /* Ancho mínimo para mantener legibilidad */
    }
    
    .img_boton {
        width: 28px;
        margin-left: 6px;
    }
    
    /* Ajustes de logo */
    .logo .img {
        width: 70px;
        margin-left: 100px;
    }
    
    /* Ajustes de menú hamburguesa */
    .hamburger-menu {
        left: 12px;
        top: 12px;
    }
    
    .hamburger-menu div {
        width: 22px;
        height: 2px;
    }
    
    /* Ajustes de contenedor */
    .contenedorheader {
        padding: 0 10px;
    }
    
    /* Ajustes para cuando hay muchos botones */
    .auth-buttons {
        flex-wrap: wrap;
        max-width: 110px;
        justify-content: flex-end;
    }
    
    .session-button {
        margin-bottom: 4px;
    }
}


</style>