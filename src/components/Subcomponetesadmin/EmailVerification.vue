<template>
  <form class="form" @submit.prevent="handleSubmit">
    <label class="letra">Correo Electrónico</label>
    <input 
      type="email" 
      v-model="email" 
      class="input" 
      required
      :disabled="isSendingCode"
    >
    
    <div class="button-group">
      <button type="submit" :disabled="isSendingCode">
        {{ isSendingCode ? 'Enviando...' : 'Enviar Código' }}
      </button>
    </div>
  </form>
</template>

<script setup>
const URL2='http://127.0.0.1:8000'
const URL='https://proyecto-cef-backend-production.up.railway.app'
import { ref } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';

const emit = defineEmits(['code-sent']);

const email = ref('');
const isSendingCode = ref(false);

const handleSubmit = async () => {
  if (!email.value) {
    Swal.fire('Error', 'Por favor ingresa un correo electrónico', 'error');
    return;
  }

  isSendingCode.value = true;
  try {
    const response = await axios.post(`${URL}/request_verification`, {
      email: email.value
    });
    
    Swal.fire('Éxito', 'Código enviado al correo electrónico', 'success');
    emit('code-sent', email.value);
  } catch (error) {
    Swal.fire('Error', error.response?.data?.detail || 'Error enviando el código', 'error');
  } finally {
    isSendingCode.value = false;
  }
};
</script>
<style>
.input{
  width: 200px;
}

</style>