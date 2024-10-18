<template>
  <header class="header">
    <div class="contenedor">
      <div class="menu">
        <details>
          <summary class="boton1">
            <img class="boton-menu" src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\menu.png" alt="">
          </summary>
          <div class="acordion1">
            <p class="p">Categoría</p>
            <p class="p">Convocatoria</p>
            <p class="p">Eventos</p>
            <p class="p">Personal</p>
          </div>
        </details>
      </div>
      <p><router-link class="p3" to="/">Inicio</router-link></p>
      <p>Noticia</p>
      <div class="logo">
        <img class="img" src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\WhatsApp_Image_2024-08-23_at_9.04.20_AM-removebg-preview.png" alt="Logo">
      </div>
      <p class="p2">Nosotros</p>
      <div class="login">
        <button class="boton-inicio"><router-link to="/login">Iniciar Sesión | Inscríbete</router-link></button>
      </div> 
    </div>
  </header>

  <body class="body2">
    <div class="color">
      <div class="container">
        <h1>{{ formState === 'login' ? 'Login' : (formState === 'verify' ? 'Verificación' : 'Registro') }}</h1>
        <img class="img" src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\WhatsApp_Image_2024-08-23_at_9.04.20_AM-removebg-preview.png" alt="Logo">
            <h1 v-if="!showForm">Selecciona tu rol</h1>
            <!-- botenes selecionar rol -->
            <div class="role-selection" v-if="!showForm">
              <button class="input2" @click="selectRole('deportista')">Deportista</button>
              <button class="input2" @click="selectRole('administrador')">Administrador</button>
              <button class="input2" @click="selectRole('entrenador')">Entrenador</button>
            </div>
            <!-- Formulario de Inicio de Sesión Administrador -->
          <div class="form-wrapper" >
            <form class="form"  v-if="formState === 'loginAdministrador'" @submit.prevent="loginUsuario">
              <label  class="letra"for="usuario">Usuario</label>
              <input class="input" type="text" v-model="usuario" required>
              
              <label  class="letra" for="password">Contraseña</label>
              <input class="input" type="password" v-model="password" required>
              
              <button type="submit">Iniciar Sesión</button>
              <button type="button" @click="cambioForm"> Regístrate</button>
            </form>
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

            <!-- Formulario de Inicio de Sesión  entrenador-->
          <form v-if="formState === 'loginEntrenador'" class="form" @submit.prevent="loginUsuario">
            <label class="letra">Usuario </label>
            <input  type="text" v-model="usuario" class="input" required>
            <label class="letra">Contraseña </label>
            <input class="input" type="password" v-model="password" required>
            <div class="button-group">
              <button type="submit">Iniciar Sesión </button>
            </div>
          </form>

          <!-- Formulario de Verificación -->
          <form v-if="formState === 'verify'" class="form" @submit.prevent="loginUsuario">
            <label class="letra">Código </label>
            <input  class="input" type="text" v-model="verificationCode" required>
            <div class="button-group">
              <button type="submit">Verificar Código</button>
              <button type="button" @click="cambioForm">Iniciar Sesión</button>
            </div>
          </form>
          <!-- Formulario de Verificación2 -->
          <form v-if="formState === 'verify2'" class="form" @submit.prevent="loginUsuario">
            <label class="letra">Código </label>
            <input class="input" type="text" v-model="verificationCode2" required>
            <div class="button-group">
              <button type="submit">Verificar Código</button>
              <button type="button" @click="cambioForm">Iniciar Sesión</button>
            </div>
          </form>
          <!-- Formulario de Administrador -->
          <form  class="form_registro" v-if="formState === 'registeradmin'" @submit.prevent="loginUsuario">

            <label class="letra" for="administradorid">administradorid</label>
            <input type="text" v-model="administradorid" >

            <label class="letra" for="nombre">Nombre</label>
            <input class="input" type="text" v-model="nombre" required>
            
            <label class="letra" for="usuario">Usuario</label>
            <input class="input" type="text" v-model="usuario" required>
            
            <label class="letra">Contraseña</label>
            <input type="password" v-model="password" required>

            <label class="letra" for="correoelectronico">Correo Electrónico</label>
            <input  class="input"type="email" v-model="correoelectronico" required>
            
            <label  class="letra" for="fechacontratacion">Fecha de Contratación</label>
            <input  class="input"type="date" v-model="fechacontratacion" required>
            
            <button type="submit">Registrar</button>
            <button type="button" @click="cambioForm"> Inicia Sesión</button>
          </form>
          <!-- Formulario de Registro -->
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
          
          <label class="letra">Foto</label>
          <input type="text"v-model="foto" class="input">
          
          <label class="letra">Nombre del Acudiente</label>
          <input type="text" v-model="nombre_acudiente" class="input" required>
          
          <label class="letra">Teléfono del Acudiente</label>
          <input type="text" v-model="telefono_acudiente" class="input" required>
          
          <label class="letra">Email del Acudiente</label>
          <input type="email" v-model="email_acudiente" class="input" required>
          
          <label class="letra">Categoría</label>
          <input type="text" v-model="categoria" class="input" required>
            <!-- Agrega los demás campos aquí -->
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
const categoriasPermitidas = ['Sub 7', 'Sub 9', 'Sub 11', 'Sub 13', 'Sub 15', 'Sub 17', 'Sub 20', 'Elite', 'Admin'];
const router = useRouter()
const formState = ref(''); // 'login', 'verify', o 'register'
const showForm = ref(false);
const usuario = ref('');
const password = ref('');
const documento = ref('')
const nombre = ref('')
const apellidos = ref('')
const edad = ref('')
const fecha_nacimiento = ref('')
const eps = ref('')
const telefono = ref('')
const email = ref('')
const foto = ref(null)
const nombre_acudiente = ref('')
const telefono_acudiente = ref('')
const email_acudiente = ref('')
const categoria = ref('')
const correoelectronico = ref('');
const fechacontratacion = ref('');
const errorMessages = ref('')
const verificationCode = ref('');
const verificationCode2 = ref('');
const administradorid = ref('');

 // Método para seleccionar el rol
 const selectRole = async (role) => {
      if (role === 'deportista') {
        showForm.value = true; // Oculta los botones de rol
        formState.value = 'login'; // Cambia a login para deportista
      } else if (role === 'entrenador' ) {
        showForm.value = true; // Oculta los botones de rol
        formState.value = 'loginEntrenador';
        // Aquí puedes agregar más lógica según el rol seleccionado si es necesario
      }else if (role === 'administrador' ) {
        showForm.value = true; // Oculta los botones de rol
        formState.value = 'loginAdministrador';
        // Aquí puedes agregar más lógica según el rol seleccionado si es necesario
      }
    };

    const cambioForm = async () => {
  switch (formState.value) {
    case 'login':
      formState.value = 'verify';
      break;
    case 'verify':
      formState.value = 'login';
      break;
    case 'loginEntrenador':
      formState.value = 'loginEntrenador'; 
      break;
    case 'loginAdministrador':
      formState.value = 'verify2'; 
      break;
    case 'verify2':
      formState.value = 'loginAdministrador'; 
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
}

const loginUsuario = async () => {
  try {
    if (formState.value === 'login') {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        Loginusuario: usuario.value,
        password: password.value
      });

      if (response.data.mensaje === 'Login exitoso') {
        localStorage.setItem('nombreAdmin', response.data.datos.nombre);
        localStorage.setItem('emailAdmin', response.data.datos.email);
        router.push('/admin');
        Swal.fire({
          icon: 'success',
          title: 'Inicio de Sesión',
          text: 'Inicio de sesión exitoso'
        });
      }
    } else if (formState.value === 'loginEntrenador') {
      const response = await axios.post("http://127.0.0.1:8000/loginEntrenadores", {
        Loginusuario: usuario.value,
        password: password.value
      });

      if (response.data.mensaje === 'Login exitoso') {
        localStorage.setItem('nombreEntre', response.data.datos.nombre);
        localStorage.setItem('emailEntre', response.data.datos.correoelectronico);
        router.push('/Entrenador');
        Swal.fire({
          icon: 'success',
          title: 'Inicio de Sesión',
          text: 'Inicio de sesión exitoso'
        });
      }
    } else if (formState.value === 'loginAdministrador') {
      const response = await axios.post("http://127.0.0.1:8000/loginAdministrador", {
        usuario: usuario.value,
        password: password.value
      });
      if (response.data.mensaje === 'Login exitoso') {
        localStorage.setItem('nombreAdmin', response.data.datos.nombre);
        localStorage.setItem('emailAdmin', response.data.datos.email);
        router.push('/admin');
        Swal.fire({
          icon: 'success',
          title: 'Inicio de Sesión',
          text: 'Inicio de sesión exitoso'
        });
      }
    } else if (formState.value === 'verify2') {
      const response = await axios.post('http://127.0.0.1:8000/verify_code2', { 
        code2: verificationCode2.value 
      });

      if (response.status === 200) {
        formState.value = 'registeradmin'; 
        Swal.fire({
          icon: 'success',
          title: 'Verificación',
          text: 'Código verificado correctamente'
        });
      }
    } else if (formState.value === 'registeradmin') {
       await axios.post("http://127.0.0.1:8000/Insertaradministrador", {
        administradorid:administradorid.value,
        nombre: nombre.value,
        usuario: usuario.value,
        password: password.value,
        correoelectronico: correoelectronico.value,
        fechacontratacion: fechacontratacion.value
      });

      Swal.fire('Éxito', 'Registro exitoso', 'success');
      usuario.value = '';
      password.value = '';
      router.push('/loginAdministrador'); 

    } else if (formState.value === 'verify') {
      const response = await axios.post('http://127.0.0.1:8000/verify_code', { 
      code: verificationCode.value 
      });

      if (response.status === 200) {
        formState.value = 'register'; 
        Swal.fire({
          icon: 'success',
          title: 'Verificación',
          text: 'Código verificado correctamente'
        });
      }
      
    } else {
  // Validaciones para el registro
  if (formState.value === 'register') {
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
  }
       await axios.post("http://127.0.0.1:8000/InsertarJ", {
        documento: documento.value,
        usuario: usuario.value,
        password: password.value,
        nombre: nombre.value,
        apellidos: apellidos.value,
        edad: edad.value,
        fecha_nacimiento: fecha_nacimiento.value,
        eps: eps.value,
        telefono: telefono.value,
        email: email.value,
        foto: foto.value,
        nombre_acudiente: nombre_acudiente.value,
        telefono_acudiente: telefono_acudiente.value,
        email_acudiente: email_acudiente.value,
        categoria: categoria.value
      });

      Swal.fire({
        icon: 'success',
        title: 'Registro de Usuario',
        text: 'Registro exitoso'
      });

      usuario.value = '';
      password.value = '';
      router.push('/login'); 
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

