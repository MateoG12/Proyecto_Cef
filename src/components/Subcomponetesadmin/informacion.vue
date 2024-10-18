<template>
  <div class="configuracion-container">
    <h1>informacion</h1>
    <p>Esta es la sección de generar registros de diferentes tipos.</p>

    <div class="input-area">
      <textarea
        v-model="informacion"
        placeholder="Escribe aquí la información..."
        rows="4"
      ></textarea>
      <button @click="guardarInformacion" class="submit-button">Guardar Información</button>
    </div>

    <div v-if="informacionGuardada" class="informacion-guardada">
      <h2>Información Guardada:</h2>
      <p>{{ informacion }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      informacion: '',
      informacionGuardada: false,
    };
  },
  methods: {
    guardarInformacion() {
      this.informacionGuardada = true;
    },
  },
};
</script>

<style scoped>
.configuracion-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ff0000;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.input-area {
  margin-top: 1.5rem;
}

textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #07000088;
  border-radius: 4px;
  font-size: 1rem;
  resize: none;
}

textarea:focus {
  border-color: #007bff;
  outline: none;
}

.submit-button {
  background-color: #ff000059;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #000000;
}

.informacion-guardada {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #007bff;
  border-radius: 4px;
  background-color: #e7f1ff;
}
</style>

  