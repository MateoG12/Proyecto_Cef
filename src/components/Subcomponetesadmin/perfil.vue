<template>
    <div>
      <h1>Perfil</h1>
      <button @click="editarDeportista(deportista)">Editar</button>
      <button @click="eliminarDeportista(deportista)">Eliminar</button>
      <button @click="consultarDeportista(deportista)">Consultar</button>
    </div>
    
  </template>
  
  <style scoped>

  h1 {
    color: #000000;
  }
  </style>
  
  