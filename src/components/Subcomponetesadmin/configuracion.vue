<template>
  <div class="configuracion-container">
    <h1>Noticias</h1>
    <p>Aqui agrege el titulo y desripcion breve de la noticia y su respectiva noticia.</p>

    <div class="registros-container">
      <div class="registro-card" v-for="(registro, index) in registros" :key="index">
        <h2>{{ registro.titulo }}</h2>
        <p>{{ registro.descripcion }}</p>
      </div>
    </div>

    <div class="input-area">
      <input
        v-model="nuevoTitulo"
        type="text"
        placeholder="Título de la nueva noticia"
        class="registro-input"
      />
      <textarea
        v-model="nuevaDescripcion"
        placeholder="Descripción de la nueva noticia"
        rows="4"
        class="registro-textarea"
      ></textarea>
      <button @click="agregarRegistro" class="submit-button">Agregar Noticia</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      registros: [],
      nuevoTitulo: '',
      nuevaDescripcion: '',
    };
  },
  methods: {
    agregarRegistro() {
      if (this.nuevoTitulo && this.nuevaDescripcion) {
        this.registros.push({
          titulo: this.nuevoTitulo,
          descripcion: this.nuevaDescripcion,
        });
        this.nuevoTitulo = '';
        this.nuevaDescripcion = '';
      }
    },
  },
};
</script>

<style scoped>
.configuracion-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ff0000;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

.registros-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
}

.registro-card {
  background-color: #0a000023;
  border: 1px solid #007bff;
  border-radius: 8px;
  padding: 1rem;
  flex: 1 1 calc(33% - 1rem);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.registro-card h2 {
  color: #007bff;
  margin: 0 0 0.5rem;
}

.input-area {
  margin-top: 2rem;
}

.registro-input,
.registro-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #07000017;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.registro-input:focus,
.registro-textarea:focus {
  border-color: #ff3300;
  outline: none;
}

.submit-button {
  background-color: #000000;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #a70404;
}
</style>
