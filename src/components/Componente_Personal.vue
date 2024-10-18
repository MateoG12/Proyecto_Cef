<template>
  <div class="body_personal">
    <div class="personal-container"> 
      <div class="personal-app" id="personalApp">
        <div v-for="role in roles" :key="role.name" class="personal-category">
          <h2>{{ role.name }}</h2>
          <div v-for="person in role.persons" :key="person" class="personal-member">
            {{ person }}
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        roles: [
          {
            name: 'Entrenadores',
            persons: ['Entrenador 1', 'Entrenador 2', 'Entrenador 3'],
          },
          {
            name: 'Director deportivo',
            persons: ['Director 1', 'Director 2'],
          },
          {
            name: 'Fisioterapeuta',
            persons: ['Fisio 1', 'Fisio 2'],
          },
          {
            name: 'Secretaria',
            persons: ['Secretaria 1', 'Secretaria 2'],
          },
        ],
      };
    },
  };
  </script>
  
<style scoped>
  .body_personal {
    font-family: Arial, sans-serif;
    background-color: #000; /* Dark background */
    color: #fff; /* Light text */
    margin: -8px;
    padding: 20px;
  }
  .personal-app {
    margin-top: 200px;
  }
  .personal-container {
    font-family: Arial, sans-serif;
    background-color: #000; /* Fondo oscuro */
    color: #fff; /* Texto claro */
    margin: 0;
    padding: 20px;
  }
  
  h2 {
    color: red; /* Mantener h2 en rojo */
  }
  
  .personal-category {
    background-color: #222; /* Fondo oscuro para categorías */
    border: 1px solid #ccc; /* Borde claro */
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(255, 255, 255, 0.1);
    margin-bottom: 20px;
    padding: 15px;
  }
  
  .personal-member {
    margin: 5px 0;
    padding: 10px;
    background-color: #333; /* Fondo oscuro para miembros */
    border: 1px solid #444; /* Borde ligeramente más claro */
    border-radius: 3px;
    color: #fff; /* Texto claro para miembros */
  }
</style>
