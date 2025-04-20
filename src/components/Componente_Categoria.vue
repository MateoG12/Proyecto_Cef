<template>
  <div class="body_categoria"> 
    <div class="app" id="app">
      <div v-if="!categories.length" class="no-data">
        No hay datos disponibles.
      </div>
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
const URL2='http://127.0.0.1:8000'
const URL='https://proyecto-cef-backend-production.up.railway.app'
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const categories = ref([]); 

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${URL}/ConsultarCategorias`);
        console.log("Datos de categorías:", response.data); // Verifica los datos aquí
        categories.value = response.data; 
        console.log( categories.length)
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

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style: none;
    font-family: Arial, sans-serif;
  }
.body_categoria {
  background: rgb(255, 255, 255);
  background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.815) 50%, rgba(0, 0, 0, 1) 100%);
  margin: -10px;
  margin-top: 150px;
}
.no-data {
  text-align: center;
  font-size: 1.5em;
  margin-top: 150px;
  color: #fff;
  background-color: #444;
  padding: 20px;
  border-radius: 10px;
}

.body_categoria {
  font-family: Arial, sans-serif;
  background: rgb(255, 255, 255);
  background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.815) 50%, rgba(0, 0, 0, 1) 100%);
  margin: -10px;
  color: #fff;
  min-height: 100vh; 
  padding: 20px;
}

h2 {
  color: red;
}

.category {
  background-color: #222;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
  padding: 15px;
  margin-top: 150px;
}

.player {
  margin: 5px 0;
  padding: 10px;
  background-color: #333;
  border: 1px solid #444;
  border-radius: 3px;
  color: #fff;
}
</style>