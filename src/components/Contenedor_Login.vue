<template>
  <body class="body2">
    <div class="color">
      <div class="containerlogin">
        <h1>{{ formState === 'login' ? 'Login' : (formState === 'verify' ? 'Verificación' : (formState === 'register' ? 'Registro' : 'Registro Usuario')) }}</h1>
        <img class="img" src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\proyectopython\src\components\icons\WhatsApp_Image_2024-08-23_at_9.04.20_AM-removebg-preview.png                        " alt="Logo">
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
            <!-- <div class="logo-titulo">
            <h1> Registro Deportista</h1>
            <img class="img" src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\WhatsApp_Image_2024-08-23_at_9.04.20_AM-removebg-preview.png" alt="Logo">
            </div> -->
            <label class="letra">Documento</label>
            <input type="text" v-model="documento" class="input" required>
            <label class="letra">Usuario</label>
            <input type="text" v-model="usuario" class="input" required>
            <label class="letra">Contraseña</label>
            <input type="password" v-model="password" class="input" required>
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
          <form v-if="formState === 'register_usuario'" class="form_registro1" @submit.prevent="registerUsuario">
            <!-- <div class="logo-titulo">
            <h1> Registro Usuario</h1>
            <img class="img" src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\WhatsApp_Image_2024-08-23_at_9.04.20_AM-removebg-preview.png" alt="Logo">
            </div> -->
            <label class="letra">Documento</label>
            <input type="text" v-model="Documento" class="input" required>
            <label class="letra">Correo Electrónico</label>
            <input type="email" v-model="correo_electronico" class="input" required>
            <label class="letra">Nombre</label>
            <input type="text" v-model="nombre" class="input" required>
            <label class="letra">Contraseña</label>
            <input type="password" v-model="password" class="input" required>
            <label class="letra">Usuario</label>
            <input type="text" v-model="usuario" class="input" required>
            <label class="letra">Teléfono</label>
            <input type="text" v-model="telefono" class="input" required>
            <label class="letra">Rol</label>
            <input type="text" v-model="rol" class="input" required>
            <label for="file" class="letra">Foto</label>
            <input type="file" @change="onFileChangeruser" class="input" id="file" required>
            <!-- <label class="letra">Inscripción Documento</label>
            <input type="text" v-model="inscripcion_documento" class="input" id="file_inscripcion" > -->
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

<!----><script setup>
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
const calcularEdad = () => {
      if (fecha_nacimiento.value) {
        const birthDate = new Date(fecha_nacimiento.value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        edad.value = age;
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
          const datosDeportista = response.data.datos; 
          localStorage.setItem('documento', datosDeportista.documento);
          localStorage.setItem('nombreDeportista', datosDeportista.nombre);
          localStorage.setItem('apellidosDeportista', datosDeportista.apellidos); // Asegúrate de que este campo exista
          localStorage.setItem('edadDeportista', datosDeportista.edad); // Asegúrate de que este campo exista
          localStorage.setItem('fechaNacimientoDeportista', datosDeportista.fecha_nacimiento); // Asegúrate de que este campo exista
          localStorage.setItem('epsDeportista', datosDeportista.eps); // Asegúrate de que este campo exista
          localStorage.setItem('telefonoDeportista', datosDeportista.telefono);
          localStorage.setItem('emailDeportista', datosDeportista.email);
          localStorage.setItem('usuarioDeportista', datosDeportista.usuario);
          localStorage.setItem('fotoDeportista', `http://localhost:8000${datosDeportista.foto}`);
          localStorage.setItem('nombreAcudienteDeportista', datosDeportista.nombre_acudiente); // Asegúrate de que este campo exista
          localStorage.setItem('telefonoAcudienteDeportista', datosDeportista.telefono_acudiente); // Asegúrate de que este campo exista
          localStorage.setItem('emailAcudienteDeportista', datosDeportista.email_acudiente); // Asegúrate de que este campo exista
          localStorage.setItem('categoriaDeportista', datosDeportista.categoria); // Asegúrate de que este campo exista
          Swal.fire({
            icon: 'success',
            title: 'Inicio de Sesión',
            text: 'Inicio de sesión exitoso'
          });
          router.push('/Deportista');
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
  const BASE_URL = 'http://localhost:8000';
  try {
    const response = await axios.post("http://localhost:8000/InsertarUsuario", formData, {
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
    font-family: 'Arial', sans-serif;
    background: linear-gradient(to top left, #000000, #6b0101);
    margin: -10px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #f1f1f1;
    animation: fadeIn 0.5s ease-out; 
    height: 2600px;
  }
  
  .color {
    width: 100%;
    max-width: 800px; 
    background-color: #2c2c2c; 
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    text-align: center;
    transform: translateY(20px);
    opacity: 0;
    animation: slideUp 0.5s ease-out forwards; 
  }
  
  h1 {
    font-size: 30px; 
    color: #f1f1f1;
    margin-bottom: 30px;
    font-weight: bold;
    text-transform: uppercase;
    color: #e53935; 
    animation: fadeIn 0.5s ease-out 0.3s forwards;
  }
  .img {
    width: 120px;
    height: auto;
    margin-bottom: 30px;
    border-radius: 8px;
    animation: fadeIn 0.5s ease-out 0.5s forwards;
  }
  
  .role-selection button {
    background-color: #e53935; 
    color: white;
    border: none;
    padding: 15px 30px; 
    margin: 15px;
    cursor: pointer;
    border-radius: 6px;
    font-size: 18px;
    transition: background-color 0.3s ease;
    opacity: 0;
    animation: fadeIn 0.5s ease-out 0.7s forwards;
  }
  
  .role-selection button:hover {
    background-color: #c62828; 
  }
  
  .form, .form_registro {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    opacity: 0;
    animation: fadeIn 0.5s ease-out 1s forwards;
  }
  
  .form label,
  .form_registro label {
    font-size: 16px; 
    font-weight: bold;
    color: #f1f1f1;
    margin: 12px 0;
  }
  
  .input {
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    background-color: #424242; 
    color: #f1f1f1;
    transition: border 0.3s ease;
  }
  .input [type="password"] {
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    background-color: #424242; 
    color: #f1f1f1;
    transition: border 0.3s ease;
  }
  
  .input:focus {
    border-color: #e53935;
    outline: none;
  }
  
  .input[type="file"] {
    padding: 12px;
    background-color: #424242;
  }
  
  
  .button-group {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
  }
  
  .button-group button {
    background-color: #e53935; 
    color: white;
    border: none;
    padding: 15px 30px; 
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    opacity: 0;
    animation: fadeIn 0.5s ease-out 1.3s forwards;
  }
  
  .button-group button:hover {
    background-color: #c62828; 
  }
  
  .button-group button[type="button"] {
    background-color: #424242; 
  }
  
  .button-group button[type="button"]:hover {
    background-color: #333; 
  }
  
  
  nav {
    margin-top: 30px;
  }
  
  nav a {
    color: #e53935; 
    font-size: 16px;
    text-decoration: none;
    font-weight: bold;
    animation: fadeIn 0.5s ease-out 1.5s forwards;
  }
  
  nav a:hover {
    text-decoration: underline;
    color: #c62828; 
  }
  
  
  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="number"],
  input[type="date"] {
    background-color: #424242; 
  }
  
  input[type="text"]:focus,
  input[type="email"]:focus,
  input[type="password"]:focus,
  input[type="number"]:focus,
  input[type="date"]:focus {
    background-color: #333;
    box-shadow: 0 0 5px rgba(229, 57, 53, 0.7); 
    transition: all 0.3s ease;
  }
  
  
  
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media (max-width: 1100px) {
    .body2 {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(to top left, #000000, #6b0101);
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 350vh;
    color: #f1f1f1;
    animation: fadeIn 0.5s ease-out; 
  }
  
    .color {
    margin-top: -250px;
    width: 100%;
    max-width: 800px; 
    background-color: #2c2c2c; 
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    text-align: center;
    transform: translateY(20px);
    opacity: 0;
    animation: slideUp 0.5s ease-out forwards; 
  }
  
    h1 {
      font-size: 26px;
    }
  
    .button-group button {
      width: 48%;
      margin-bottom: 10px;
      font-size: 14px;
      padding: 12px 24px;
    }
  
    .button-group button[type="button"] {
      width: 48%;
    }
  
    .form label,
    .form_registro label {
      font-size: 14px;
    }
  
    .input {
      font-size: 14px;
      padding: 12px;
    }
  }
  
  @media (max-width: 768px) {
    .color {
      padding: 25px;
    }
  
    h1 {
      font-size: 26px;
    }
  
    .button-group button {
      width: 48%;
      margin-bottom: 10px;
      font-size: 14px;
      padding: 12px 24px;
    }
  
    .button-group button[type="button"] {
      width: 48%;
    }
  
    .form label,
    .form_registro label {
      font-size: 14px;
    }
  
    .input {
      font-size: 14px;
      padding: 12px;
    }
  }
  
  @media (max-width: 600px) {
    .color {
      padding: 15px;
    }
  
    h1 {
      font-size: 22px;
    }
  
    .button-group button {
      width: 100%;
      margin-bottom: 10px;
      font-size: 14px;
      padding: 12px;
    }
  
    .form label,
    .form_registro label {
      font-size: 12px;
    }
  
    .input {
      font-size: 12px;
      padding: 10px;
    }
  }
  
  @media (max-width: 400px) {
    .input {
      padding: 10px;
      font-size: 12px;
    }
  
    .button-group button {
      padding: 10px;
      font-size: 12px;
    }
  }

</style>

