<template>
  <body class="body2">
    <div class="color">
      <div class="container">
        <h1>{{ formState === 'login' ? 'Login' : (formState === 'verify' ? 'Verificación' : (formState === 'register' ? 'Registro' : 'Registro Usuario')) }}</h1>
        <img class="img" src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\WhatsApp_Image_2024-08-23_at_9.04.20_AM-removebg-preview.png" alt="Logo">
        <h1 v-if="!showForm">Selecciona tu rol</h1>
        
        <div class="role-selection" v-if="!showForm">
          <button class="input2" @click="selectRole('deportista')">Deportista</button>
          <button class="input2" @click="selectRole('usuario')">Usuario</button>
        </div>

        <div class="form-wrapper">
          <!-- Formulario de Inicio de Sesión -->
          <form v-if="formState === 'login'" class="form" @submit.prevent="loginUsuario">
            <label class="letra">Usuario </label>
            <input type="text" v-model="usuario" class="input" required>
            <label class="letra">Contraseña </label>
            <input class="input" type="password" v-model="password" required>
            <div class="button-group">
              <button type="submit">Iniciar Sesión </button>
              <button type="button" @click="cambioForm">Regístrate </button>
            </div>
          </form>
          <form v-if="formState === 'login2'" class="form" @submit.prevent="loginUsuario">
            <label class="letra">Usuario </label>
            <input type="text" v-model="usuario" class="input" required>
            <label class="letra">Contraseña </label>
            <input class="input" type="password" v-model="password" required>
            <div class="button-group">
              <button type="submit">Iniciar Sesión </button>
              <button type="button" @click="cambioForm">Regístrate </button>
            </div>
          </form>
          

          <!-- Formulario de Verificación -->
          <form v-if="formState === 'verify'" class="form" @submit.prevent="loginUsuario">
            <label class="letra">Código </label>
            <input class="input" type="text" v-model="verificationCode" required>
            <div class="button-group">
              <button type="submit">Verificar Código</button>
              <button type="button" @click="cambioForm">Iniciar Sesión</button>
            </div>
          </form>
          <!-- Formulario de Verificación2 -->
          <form v-if="formState === 'verify2'" class="form" @submit.prevent="loginUsuario">
            <label class="letra">Código </label>
            <input class="input" type="text" v-model="verificationCode" required>
            <div class="button-group">
              <button type="submit">Verificar Código</button>
              <button type="button" @click="cambioForm">Iniciar Sesión</button>
            </div>
          </form>
          
          <!-- Formulario de Registro Deportista -->
          <form v-if="formState === 'register'" class="form_registro" @submit.prevent="loginUsuario">
            <label class="letra">Documento</label>
            <input type="text" v-model="documento" class="input" required>
            <label class="letra">Usuario</label>
            <input type="text" v-model="usuario" class="input" required>
            <label class="letra">Contraseña</label>
            <input type="password" v-model="password" required>
            <label class="letra">Nombre</label>
            <input type="text" v-model="nombre" class="input" required>
            <label class="letra">Apellidos</label>
            <input type="text" v-model="apellidos" class="input" required>
            <label class="letra">Edad</label>
            <input type="number" v-model="edad" class="input" required>
            <label class="letra">Fecha de Nacimiento</label>
            <input type="date" v-model="fecha_nacimiento" class="input" required>
            <label class="letra">EPS</label>
            <input type="text" v-model="eps" class="input" required>
            <label class="letra">Teléfono</label>
            <input type="text" v-model="telefono" class="input" required>
            <label class="letra">Email</label>
            <input type="email" v-model="email" class="input" required>
            <label for="file" class="letra">Foto</label>
            <input type="file" @change="onFileChanger" class="input" id="file" required>
            <label class="letra">Nombre del Acudiente</label>
            <input type="text" v-model="nombre_acudiente" class="input" required>
            <label class="letra">Teléfono del Acudiente</label>
            <input type="text" v-model="telefono_acudiente" class="input" required>
            <label class="letra">Email del Acudiente</label>
            <input type="email" v-model="email_acudiente" class="input" required>
            <label class="letra">Categoría</label>
            <input type="text" v-model="categoria" class="input" required>
            <div class="button-group">
              <button type="submit">Registrar</button>
              <button type="button" @click="cambioForm">Iniciar Sesión</button>
            </div>
          </form>
          <!-- Formulario de Registro Usuario -->
          <form v-if="formState === 'register_usuario'" class="form_registro" @submit.prevent="registerUsuario">
            <label class="letra">Documento</label>
            <input type="text" v-model="Documento" class="input" required>
            <label class="letra">Correo Electrónico</label>
            <input type="email" v-model="correo_electronico" class="input" required>
            <label class="letra">Nombre</label>
            <input type="text" v-model="nombre" class="input" required>
            <label class="letra">Contraseña</label>
            <input type="password" v-model="password" required>
            <label class="letra">Usuario</label>
            <input type="text" v-model="usuario" class="input" required>
            <label class="letra">Teléfono</label>
            <input type="text" v-model="telefono" class="input" required>
            <label class="letra">Rol</label>
            <input type="text" v-model="rol" class="input" required>
            <label for="file" class="letra">Foto</label>
            <input type="file" @change="onFileChangeruser" class="input" id="file" required>
            <label class="letra">Inscripción Documento</label>
            <input type="text" v-model="inscripcion_documento" class="input" id="file_inscripcion" >
            <div class="button-group">
              <button type="submit">Registrar</button>
              <button type="button" @click="cambioForm">Iniciar Sesión</button>
            </div>
          </form>
        </div>
        <nav>
          <a href="#">¿Olvidaste tu contraseña?</a>
        </nav>
      </div>
    </div>
  </body>
</template>
<script setup>
import Swal from 'sweetalert2'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const categoriasPermitidas = ['Sub 7', 'Sub 9', 'Sub 11', 'Sub 13', 'Sub 15', 'Sub 17', 'Sub 20', 'Elite'];
const roles = ["Entrenador", "Administrador"];
const router = useRouter();
const formState = ref('');
const showForm = ref(false);
const usuario = ref('');
const password = ref('');
const documento = ref('');
const Documento = ref('');
const nombre = ref('');
const apellidos = ref('');
const edad = ref('');
const fecha_nacimiento = ref('');
const eps = ref('');
const telefono = ref('');
const email = ref('');
const foto = ref(null);
const rol = ref('');
const nombre_acudiente = ref('');
const telefono_acudiente = ref('');
const email_acudiente = ref('');
const categoria = ref('');
const correo_electronico = ref('');
const errorMessages = ref('');
const verificationCode = ref('');
const verificationCode2 = ref('');
const inscripcion_documento = ref('');
const file = ref([]);
const rolSeleccionado = ref('');

const onFileChanger = (Event) => {
  file.value = Event.target.files[0];
};

const selectRole = async (role) => {
  rolSeleccionado.value = role; 
  showForm.value = true;
  formState.value = 'login';
};

const cambioForm = async () => {
  switch (formState.value) {
    case 'login':
      formState.value = 'verify';
      break;
    case 'verify':
      formState.value = 'login';
      break;
    default:
      formState.value = 'login';
      break;
  }
};

const isPasswordValid = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  );
};

const loginUsuario = async () => {
  try {
    // Verifica si el estado del formulario es 'login'
    if (formState.value === 'login') {
      const loginType = rolSeleccionado.value === 'deportista' ? 'loginDeportista' : 'loginUsuario';
      const response = await axios.post(`http://127.0.0.1:8000/${loginType}`, {
        Loginusuario: usuario.value,
        password: password.value
      });

      console.log('Respuesta del servidor:', response.data);

      // Verifica si el login fue exitoso
      if (response.data.mensaje === 'Login exitoso') {
        const rolUsuario = response.data.datos.rol;

        if (rolSeleccionado.value === 'deportista') {
          localStorage.setItem('nombreDeportista', response.data.datos.nombre);
          localStorage.setItem('emailDeportista', response.data.datos.email);
          Swal.fire({
            icon: 'success',
            title: 'Inicio de Sesión',
            text: 'Inicio de sesión exitoso'
          });
          router.push('/');
          return;
        }

        if (rolSeleccionado.value === 'usuario') {
          // Almacena los datos del usuario
          localStorage.setItem('Documento', response.data.datos.Documento);
          localStorage.setItem('nombreusuario', response.data.datos.nombre);
          localStorage.setItem('emailusuario', response.data.datos.email);
          localStorage.setItem('usuario', response.data.datos.usuario);
          localStorage.setItem('rolusuario', response.data.datos.rol);
          localStorage.setItem('telefonousuario', response.data.datos.telefono);
          localStorage.setItem('fotoAdmin', `http://localhost:8000${response.data.datos.foto}`);
          
          Swal.fire({
            icon: 'success',
            title: 'Inicio de Sesión',
            text: 'Inicio de sesión exitoso'
          });
          router.push(rolUsuario === 'Entrenador' ? '/Entrenador' : '/admin');
          return;
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Credenciales incorrectas'
        });
      }
    }

    // Verificación de código
    else if (formState.value === 'verify') {
      const response = await axios.post('http://127.0.0.1:8000/verify_code', {
        code: verificationCode.value
      });

      if (response.status === 200) {
        // Verifica el rol y redirige al registro correspondiente
        formState.value = rolSeleccionado.value === 'deportista' ? 'register' : 'register_usuario';
        Swal.fire({
          icon: 'success',
          title: 'Verificación',
          text: 'Código verificado correctamente'
        });
      }
    }

    // Registro nuevo usuario
    else {
      if (!isPasswordValid(password.value)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.'
        });
        return;
      }

      if (!categoriasPermitidas.includes(categoria.value)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La categoría seleccionada no es válida. Las categorías permitidas son: Sub 7, Sub 9, Sub 11, Sub 13, Sub 15, Sub 17, Sub 20, Elite'
        });
        return;
      }

      // Preparar datos para el registro
      const formData = new FormData();
      formData.append("documento", parseInt(documento.value));
      formData.append("usuario", usuario.value);
      formData.append("password", password.value);
      formData.append("nombre", nombre.value);
      formData.append("apellidos", apellidos.value);
      formData.append("edad", parseInt(edad.value));
      formData.append("fecha_nacimiento", fecha_nacimiento.value);
      formData.append("eps", eps.value);
      formData.append("telefono", telefono.value);
      formData.append("email", email.value);
      formData.append('foto', file.value);
      formData.append("nombre_acudiente", nombre_acudiente.value);
      formData.append("telefono_acudiente", telefono_acudiente.value);
      formData.append("email_acudiente", email_acudiente.value);
      formData.append("categoria", categoria.value);

      const response = await axios.post("http://localhost:8000/InsertarJ", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      Swal.fire({
        icon: 'success',
        title: 'Registro de Usuario',
        text: 'Registro exitoso'
      });

      // Reiniciar valores
      usuario.value = '';
      password.value = '';
      router.push('/login'); // Redirige a la página de inicio de sesión
    }
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.detail || 'Ha ocurrido un error inesperado'
    });
  }
};

// Manejo de cambios en el archivo
const onFileChangeruser = (event) => {
  file.value = event.target.files[0]; // Guardar el primer archivo seleccionado
};

// Registro de usuario
const registerUsuario = async () => {
  const formData = new FormData();

  // Validación de contraseña
  if (!isPasswordValid(password.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.'
    });
    return; // Salir si la validación falla
  }

  // Validación de rol
  if (!roles.includes(rol.value)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El rol es incorrecto.'
    });
    return; // Salir si la validación falla
  }

  // Asegúrate de que todos los campos están bien definidos
  formData.append("Documento", parseInt(Documento.value));
  formData.append("correo_electronico", correo_electronico.value);
  formData.append("nombre", nombre.value);
  formData.append("password", password.value);
  formData.append("usuario", usuario.value);
  formData.append("telefono", telefono.value);
  formData.append("rol", rol.value);

  // Validación de archivo
  if (file.value) {
    formData.append('foto', file.value);
  } else {
    console.error("No se ha seleccionado ningún archivo.");
    return; // Salir si no hay archivo
  }

  if (inscripcion_documento.value) {
    formData.append('inscripcion_documento', inscripcion_documento.value);
  }

  // Log para depuración
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const response = await axios.post("http://localhost:8080/Usuario", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    Swal.fire({
      icon: 'success',
      title: 'Registro de Usuario',
      text: 'Registro exitoso'
    });

    // Reiniciar valores
    Documento.value = '';
    correo_electronico.value = '';
    nombre.value = '';
    password.value = '';
    telefono.value = '';
    usuario.value = '';
    file.value = null; 
    inscripcion_documento.value = '';
    router.push('/login');
  } catch (error) {
    console.error("Error:", error);
    console.error("Error response:", error.response);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.detail || 'Ha ocurrido un error inesperado'
    });
  }
};

</script>

  
<style>
.body2 {
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  background: 
    linear-gradient(rgba(0, 0, 0, 0.178), rgba(0, 0, 0, 0.281)),
    url('E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\5621625.jpg');
}

.container {
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.541);
  width: 300px;
  text-align: center;
  position: relative;
  overflow: hidden; /* Oculta cualquier desbordamiento en el contenedor principal */
}
.role-selection{
  height: auto;
  
}
.input2 {
  margin-right: -5px;
  width: 250px;
  margin-top: 10px;
}
.input {
  margin-right: -5px;
  width: 250px;
}

.letra {
  color: #fffbfb;
}

nav {
  margin: 20px 0;
}

nav a {
  color: #ffffff;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #ffffff;
}

.form-wrapper {
  position: relative;
  height: 200px; /* Ajusta la altura del contenedor del formulario según sea necesario */
}

.form {
  position: absolute;
  width: 100%;
  transition: transform 0.3s ease;
}

.form_registro {
  display: flex;
  flex-direction: column; /* Disposición en columna */
  width: 100%;
  height: 100%; /* Utiliza toda la altura del contenedor */
  overflow-y: auto; /* Permite el desplazamiento vertical si el contenido excede la altura */
  padding: 10px;
}
/* Estilo del scrollbar */
.form_registro::-webkit-scrollbar {
  width: 9px; /* Ancho del scrollbar */
}

.form_registro::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0); /* Color del track (área del scrollbar sin usar) */
}

.form_registro::-webkit-scrollbar-thumb {
  background: #ffffff; /* Color del thumb (parte que se desplaza) */
  border-radius: 10px; /* Bordes redondeados del thumb */
}

.form_registro::-webkit-scrollbar-thumb:hover {
  background: #ff0000; /* Color del thumb cuando se pasa el cursor sobre él */
}
.form_registro label {
  margin-bottom: 5px;
}

.form_registro input {
  width: calc(100% - 30px); /* Ajusta el ancho para el espaciado interno */
  padding: 10px;
  margin-bottom: 10px;
}

.form_registro .button-group {
  display: flex;
  justify-content: space-between;
}
input {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
}

button[type="submit"] {
  background-color: #ff0000;
  color: #fff;
}

button[type="button"] {
  background-color: #000000;
  color: #fff;
}

button:hover {
  opacity: 0.9;
}

.img {
  width: 120px;
  height: 120px;
  margin: 20px 0;
}

.header {
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 5px rgba(255, 6, 6, 0.5);
  position: fixed; 
  top: 0; 
  color: #ffffff;
  background-color: rgb(0, 0, 0);
  width: 100%;
  height: 120px;
  margin: -10px;   
  z-index: 1000;
}

.menu {
  position: absolute;
  top: 0;
  left: 0;
}

.boton-menu {
  width: 50px;
  height: 50px;
}

.boton1 {
  background: transparent;
  color: rgba(255, 255, 255, 0);
  font-size: 16px;
  cursor: pointer;
  padding: 30px 50px;
}

.acordion1 {
  background-color: white;
  padding: 10px 20px;
  border: 1px solid #000000;
  margin: -20px 10px 10px 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.p {
  cursor: pointer;
  color: #333;
}

.contenedor {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

.img {
  width: 100px;
  height: 100px;
}

.p2 {
  cursor: pointer;
  color: rgb(255, 255, 255);
  border: none;
}

.p2::before {
  border-bottom: #ffffff;
  border: none;
}

.p3 {
  margin-left: 60px;
  cursor: pointer;
  color: rgb(255, 255, 255);
}

.boton-inicio {
  background: #ab1a1a; 
  color: #fff; 
  border: none; 
  position: relative; 
  height: 50px;
  padding: 5px 10px; 
  cursor: pointer; 
  transition: 800ms ease all; 
  outline: none; 
  text-align: center; 
  display: inline-block;
}

.boton-inicio:hover {
  background: #000000; 
  color: #ffffff; 
}

.boton-inicio::before, .boton-inicio::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  height: 2px;
  width: 0;
  background: #ab1a1a; 
  transition: 400ms ease all;
}

.boton-inicio::after {
  right: inherit;
  top: inherit;
  left: 0;
  bottom: 0;
}

.boton-inicio:hover::before, .boton-inicio:hover::after {
  width: 100%; 
  transition: 800ms ease all; 
}

@media (max-width: 600px) {
  .container {
    width: 90%;
    padding: 10px;
  }

  .button-group {
    flex-direction: column;
  }

  .button-group button {
    margin-bottom: 10px;
  }
}
</style>

