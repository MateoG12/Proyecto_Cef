<template>
  <div class="profesores-container">
    <h1>Profesores</h1>
    
    <form class="profesor-form" @submit.prevent="Loginentrenador" >
      <div class="form-group">
        <label for="entrenadorid">entrenadorid:</label>
        <input type="text" id="entrenadorid" v-model="entrenadorid" placeholder="Ingrese el entrenadorid" required />
      </div>
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="nombre" placeholder="Ingrese el nombre" required />
      </div>
      <div class="form-group">
        <label for="apellido">Usuario:</label>
        <input type="text" id="usuario" v-model="usuario" placeholder="Ingrese el usuario" required />
      </div>
      <div class="form-group">
        <label for="password">password:</label>
        <input type="password" id="password" v-model="password" placeholder="Ingrese la password" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="correoelectronico" placeholder="Ingrese el email" required />
      </div>
      <div class="form-group">
        <label for="especialidad">especialidad:</label>
        <input type="text" id="especialidad" v-model="especialidad" placeholder="Ingrese la especialidad" required />
      </div>
      <div class="form-group">
        <label for="equipoid">equipoid:</label>
        <input type="text" id="equipoid" v-model="equipoid" placeholder="Ingrese la equipoid" />
      </div>
      <button type="submit" class="submit-button">Agregar Profesor</button>
    </form>
  </div>
</template>

<script setup>
// export default {
//   data() {
//     return {};
//   },
// };

import Swal from 'sweetalert2'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const entrenadorid=ref();
const nombre=ref('');
const usuario=ref('');
const password=ref('');
const correoelectronico=ref('');
const especialidad=ref('');
const equipoid=ref();

const Loginentrenador = async () => {
  try {
      await axios.post("http://127.0.0.1:8000/InsertarEntrenador", {
        entrenadorid:entrenadorid.value,
        especialidad:especialidad.value,
        equipoid:equipoid.value,
        usuario: usuario.value,
        password: password.value,
        nombre: nombre.value,
        correoelectronico: correoelectronico.value,
        equipoid:equipoid.value
      });
      
      Swal.fire({
        icon: 'success',
        title: 'Registro de Usuario',
        text: 'Registro exitoso'
      });
      
    } catch (error) {
      console.error("Error al registrar usuario", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Registro inválido'
      });
}
}
</script>

<style scoped>
.profesor-form {
  background-color: #f4f4f4;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 2rem auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.submit-button {
  background-color: #007bff;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}

h1 {
  color: #333;
  text-align: center;
}

p {
  text-align: center;
  color: #555;
}
</style>
