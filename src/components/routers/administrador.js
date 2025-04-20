import { createRouter, createWebHistory } from "vue-router";
import { requireAuth } from '@/middlewares/auth';

// Componentes de administrador
import configuracion from "../Subcomponetesadmin/configuracion.vue";
import informacion from "../Subcomponetesadmin/informacion.vue";
import perfil from "../Subcomponetesadmin/perfil.vue";
import EmailVerification from "../Subcomponetesadmin/EmailVerification.vue";

// Componentes principales
import Slider from "../Slider.vue";
import Componente_Entrenadores from "../Componente_Entrenadores.vue";
import Componente_Usuario from "../Componente_Usuario.vue";
import Componente_Administrador from "../Componente_Administrador.vue";
import Contenedor_Login from "../Contenedor_Login.vue";
import Componente_Categoria from "../Componente_Categoria.vue";
import Componente_Personal from "../Componente_Personal.vue";
import Tactica from "../Tactica.vue";
import Componente_Deportista from "../Componente_Deportista.vue";

const routes = [
    
    {
        path: '/',
        name: 'Inicio',
        component: Componente_Usuario
        
    },
    {
        path: '/noticias',
        name: 'noticias',
        component: Componente_Usuario
    },
    {
        path: '/nosotros',
        name: 'nosotros',
        component: Componente_Usuario
    },
    {
        path: '/login',
        name: 'login',
        component: Contenedor_Login
    },
    {
        path: '/Categoria',
        name: 'Categoria',
        component: Componente_Categoria
    },
    {
        path: '/Personal',
        name: 'Personal',
        component: Componente_Personal
    },
    {
        path: '/admin',
        component: Componente_Administrador,
        beforeEnter: requireAuth, // Protege toda la ruta /admin
        children: [
            { 
                path: 'informacion', 
                component: informacion,
                name: 'admin-informacion'
            },
            { 
                path: 'perfil', 
                component: perfil,
                name: 'admin-perfil'
            },
            { 
                path: 'configuracion', 
                component: configuracion,
                name: 'admin-configuracion'
            },
            { 
                path: 'EmailVerification', 
                component: EmailVerification,
                name: 'admin-EmailVerification'
            },
            
            
        ]
    },
    {
        path: '/Entrenador',
        name: 'Entrenador',
        component: Componente_Entrenadores,
        beforeEnter: requireAuth // Protege la ruta de entrenador
    },
    {
        path: '/Tactica',
        name: 'Tactica',
        component: Tactica,
        beforeEnter: requireAuth // Protege la ruta de táctica
    },
    {
        path: '/Slider',
        name: 'Slider',
        component: Slider
    },
    {
        path: '/Deportista',
        name: 'Deportista',
        component: Componente_Deportista,
        beforeEnter: requireAuth // Protege la ruta de deportista
    },
    // Redirección para rutas no encontradas
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    },
    {
        path: '/acceso-directo',
        name: 'acceso-directo',
        beforeEnter: (to, from, next) => {
          // 1. Primero verificar si es deportista (tiene 'usuarioDeportista' en localStorage)
          if (localStorage.getItem('usuarioDeportista')) {
            next('/Deportista');
          }
          // 2. Luego verificar el rol de usuario normal (admin o entrenador)
          else if (localStorage.getItem('auth_token')) {
            const role = localStorage.getItem('rolusuario');
            if (role === 'Administrador') {
              next('/admin');
            } else if (role === 'Entrenador') {
              next('/Entrenador');
            } else {
              next('/');
            }
          }
          // 3. Si no hay ningún usuario autenticado
          else {
            next('/');
          }
        }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;