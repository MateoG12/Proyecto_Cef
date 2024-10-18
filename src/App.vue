<template>
<Componente_Principio></Componente_Principio>
<router-view></router-view>
</template>
<script setup>
import Componente_Usuario from './components/Componente_Usuario.vue';
import Componente_Administrador from './components/Componente_Administrador.vue';
import Componente_Principio from './components/Componente_Principio.vue';
import Contenedor_Login from './components/Contenedor_Login.vue';
import Tactica from './components/Tactica.vue';
import Componente_Entrenadores from './components/Componente_Entrenadores.vue';
</script>
