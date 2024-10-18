import { createRouter,createWebHistory } from "vue-router";
import configuracion from "../Subcomponetesadmin/configuracion.vue";
import informacion from "../Subcomponetesadmin/informacion.vue";
import perfil from "../Subcomponetesadmin/perfil.vue";
import profesores from "../Subcomponetesadmin/profesores.vue";

import Componente_Entrenadores from "../Componente_Entrenadores.vue";
import Componente_Usuario from "../Componente_Usuario.vue";
import Componente_Administrador from "../Componente_Administrador.vue";
import Contenedor_Login from "../Contenedor_Login.vue";
import Componente_Categoria from "../Componente_Categoria.vue";
import Componente_Personal from "../Componente_Personal.vue";
import Tactica from "../Tactica.vue";
const routes=[
    {
        path:'/',
        name:'Inicio',
        component:Componente_Usuario
    }
    ,{
        path:'/login',
        name:'login',
        component:Contenedor_Login
    },{
        path:'/Categoria',
        name:'Categoria',
        component:Componente_Categoria
    },{
        path:'/Personal',
        name:'Personal',
        component:Componente_Personal},
    {
        path:'/admin',
        component: Componente_Administrador,
        children: [
          { path: 'informacion', component: informacion },
          { path: 'perfil', component: perfil }, 
          { path: 'configuracion', component: configuracion }, 
          { path: 'profesores', component: profesores } 
        ]
      },
      { path: '/', redirect: '/admin/informacion' },
      {
        path:'/Entrenador',
        name:'Entrenador',
        component:Componente_Entrenadores},
    {
        path:'/Tactica',
        name:'Tactica',
        component:Tactica},
            
]
const router=createRouter({
    history:createWebHistory(),
    routes
})

export default router