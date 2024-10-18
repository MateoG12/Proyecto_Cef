<template>
  <div class="body_categoria"> 
    <div class="app" id="app">
      <div 
        v-for="category in categories" :key="category.name" class="category" >
        <h2>{{ category.name }}</h2>
        <div v-for="player in category.players" :key="player" class="player">
          {{ player }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const categories = ref([]); // Inicializar categories

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/ConsultarCategorias');
        console.log("Datos de categorías:", response.data); // Verifica los datos aquí
        categories.value = response.data; 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    onMounted(fetchCategories); // Llamar a fetchCategories al montar el componente

    return {
      categories, // Retornar categories para que esté disponible en el template
    };
  },
};
</script>



<style scoped>
.app {
  margin-top: 200px;
}
.body_categoria {
  font-family: Arial, sans-serif;
  background-color: #000; /* Fondo oscuro */
  color: #fff; /* Texto claro */
  margin: -8px;
  padding: 20px;
}

h2 {
  color: red; /* Color rojo para los títulos */
}

.category {
  background-color: #222; /* Fondo más oscuro para las categorías */
  border: 1px solid #ccc; /* Borde claro */
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
  padding: 15px;
}

.player {
  margin: 5px 0;
  padding: 10px;
  background-color: #333; /* Fondo oscuro para los jugadores */
  border: 1px solid #444; /* Borde ligeramente más claro */
  border-radius: 3px;
  color: #fff; /* Texto claro para los jugadores */
}
</style>
