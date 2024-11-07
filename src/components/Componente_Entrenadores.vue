<template>
    <div class="body_entre">
      <main>
        <div class="contenedor-entre">
          <div class="perfil-seccion">
          <h2>TU PERFIL</h2>
          <section class="perfil">
            <div class="info">
            <p>Nombre: {{ nombreAdmin }}</p>
            <p>Email: {{ emailAdmin }}</p>
            <p>Usuario: {{ usuario }}</p>
            <p>Rol: {{ rolusuario }}</p>
            <p>telefono: {{ telefonousuario }}</p>
            <button @click="editarUsuario">Editar</button>
            <button @click="eliminarUsuario">Eliminar</button>
            </div>
            <div class="foto-perfil">
              <img v-if="fotoAdmin" :src="fotoAdmin" alt="Foto de Perfil" />
              <div v-else>No hay foto disponible</div>
            </div>
          </section>
        </div>
  
          <div class="contenido-principal">
            <nav class="internal-menu">
              <button @click="currentSection = 'deportista'">Información del Deportista</button>
              <button @click="currentSection = 'pagos'">Pagos</button>
              <button @click="currentSection = 'inventario'">Inventario</button>
              <button @click="currentSection = 'prestamos'">Préstamos</button>
              <button @click="currentSection = 'Tactica'"><router-link class="link" to="/Tactica">Tactica</router-link></button>
            </nav>
  
            <div class="seccion-actual">
              <template v-if="currentSection === 'deportista'">
              <h3>Información del Deportista</h3>

              <!-- Filtro por categoría -->
              <label for="categoria">Filtrar por categoría:</label>
              <select v-model="selectedCategory" id="categoria">
                <option value="">Todas</option>
                <option v-for="categoria in categoriasPermitidas" :key="categoria" :value="categoria">{{ categoria }}</option>
              </select>

              <div v-for="deportista in filteredDeportistas" :key="deportista.documento" class="deportista-card">
                <p>Nombre: {{ deportista.nombre }}</p>
                <p>Email: {{ deportista.email }}</p>
                <p>Categoría: {{ deportista.categoria }}</p>
                <button @click="consultarDeportista(deportista)">Consultar</button>
              </div>
              </template>
  
              <template v-if="currentSection === 'pagos'">
                <h2>Pagos</h2>
                <div class="pago-card">
                  <p>Pago: $100</p>
                  <p>Fecha: 2024-08-01</p>
                  <button>Consultar</button>
                </div>
              </template>
  
              <template v-if="currentSection === 'inventario'">
                <h2>Inventario</h2>
                <div v-for="producto in inventario" :key="producto.id" class="inventario-card">
                  <p>Producto: {{ producto.implementos }}</p>
                  <p>Producto: {{ producto.nombre }}</p>
                  <p>Descripción: {{ producto.descripcion }}</p>
                  <p>Cantidad: {{ producto.cantidad }}</p>
                  <button @click="abrirFormularioPrestamo(producto)">Préstamo</button>
                </div>

                <div v-if="formPrestamoVisible">
                  <h3>Formulario de Préstamo</h3>
                  <form @submit.prevent="realizarPrestamo">
                    <label for="usuarioDocumento">Documento del Usuario:</label>
                    <input type="number" v-model="usuarioDocumento" required />

                    <label for="cantidad">Cantidad a prestar:</label>
                    <input type="number" v-model="cantidadPrestamo" :max="productoSeleccionado.cantidad" required />

                    <label for="estado">estado</label>
                    <input type="text" v-model="estado" required />

                    <button type="submit">Confirmar Préstamo</button>
                    <button @click="cerrarFormularioPrestamo">Cancelar</button>
                  </form>
                </div>
              </template>
              <template v-if="currentSection === 'prestamos'">
                <h2>Consultar Préstamos</h2>
                <label for="usuarioDocumento">Documento del Usuario:</label>
                <input type="number" v-model="usuarioDocumentoConsulta" required />

                <label for="implementosId">ID del Implemento:</label>
                <input type="number" v-model="implementosIdConsulta" required />

                <button @click="consultarPrestamo">Consultar</button>

                <div v-if="prestamo">
                  <h3>Detalles del Préstamo</h3>
                  <p>Usuario Documento: {{ prestamo.Usuario_Documento }}</p>
                  <p>ID Implemento: {{ prestamo.Implementos_inventario_id }}</p>
                  <p>Cantidad: {{ prestamo.cantidad }}</p>
                  <p>Fecha de Préstamo: {{ prestamo.fechadepresta }}</p>
                  <p>Estado: {{ prestamo.estado }}</p>
                  
                  <h4>Actualizar Préstamo</h4>
                  <form @submit.prevent="actualizarPrestamo">
                    <label for="nuevaCantidad">Nueva Cantidad:</label>
                    <input type="number" v-model="nuevaCantidad" required />

                    <label for="nuevoEstado">Nuevo Estado:</label>
                    <input type="text" v-model="nuevoEstado" required />

                    <button type="submit">Actualizar Préstamo</button>
                  </form>

                  <button @click="eliminarPrestamo">Eliminar Préstamo</button>
                </div>
              </template>
              <template v-if="isEditing">
                <h3>Editar Perfil</h3>
                <form @submit.prevent="actualizarUsuario">
                    <label for="nombreAdmin">Nombre:</label>
                    <input type="text" v-model="nombreAdmin" required />

                    <label for="emailAdmin">Email:</label>
                    <input type="email" v-model="emailAdmin" required />

                    <label for="usuario">Usuario:</label>
                    <input type="text" v-model="usuario" required />

                    <label for="telefono">Teléfono:</label>
                    <input type="text" v-model="telefonousuario" required />

                    <label for="foto">Foto (URL):</label>
                    <input type="text" v-model="fotoAdmin" />

                    <button type="submit">Actualizar</button>
                    <button type="button" @click="cancelarEdicion">Cancelar</button>
                </form>
            </template>
              <template v-if="currentSection === 'Tactica'">
                <h2>Tactica</h2>
                  <RouterView></RouterView>
              </template>
            </div>
          </div>
  <div>
  </div>
        </div>
      </main>
      <footer class="footer">
        <div class="footer-content">
          <div class="social-icons">
            <a href="#" class="icon"><i class="fab fa-facebook-f">#</i></a>
            <a href="#" class="icon"><i class="fab fa-twitter">#</i></a>
            <a href="#" class="icon"><i class="fab fa-instagram">#</i></a>
          </div>
          <div class="contact-info">
            <a href="mailto:info@example.com" class="info-item"><i class="fas fa-envelope"></i> info@example.com</a>
            <a href="tel:+123456789" class="info-item"><i class="fas fa-phone"></i> +123 456 789</a>
            <p class="info-item"><i class="fas fa-map-marker-alt"></i> Calle Ejemplo 123, Ciudad</p>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        nombreAdmin: '',
        emailAdmin: '',
        usuario: '',
        rolusuario: '',
        telefonousuario: '',
        fotoAdmin: '',
        isEditing: null, 
        nombreEntre: '', 
        emailEntre: '',
        menuActive: false,
        currentSection: 'deportista',
        deportistas: [],
        inventario: [],
        selectedCategory: '',
        categoriasPermitidas: ['Sub7', 'Sub9', 'Sub11', 'Sub13', 'Sub15', 'Sub17', 'Sub20', 'Elite'], // Categorías permitidas
        formPrestamoVisible: false,
        usuarioDocumento: '',
        cantidadPrestamo: 0,
        productoSeleccionado: null,
        estado:'',
        Documento:0,
        usuarioDocumentoConsulta: '',
        implementosIdConsulta: '',
        prestamo: null,
        nuevaCantidad: 0,
        nuevoEstado: ''
      };
    },
    computed: {
      filteredDeportistas() {
        if (this.selectedCategory) {
          return this.deportistas.filter(deportista => deportista.categoria === this.selectedCategory);
        }
        return this.deportistas; // Sin filtro
      }
    },
    methods: {
    editarUsuario() {
        this.isEditing = true; 
    },
    cancelarEdicion() {
        this.isEditing = false; 
    },
    async actualizarUsuario() {
  const documento = this.Documento; // Asumiendo que tienes el documento del usuario almacenado
  try {
    const response = await fetch(`http://127.0.0.1:8000/ActualizarUsuario/${documento}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: this.nombreAdmin,
        correo_electronico: this.emailAdmin,
        usuario: this.usuario,
        telefono: this.telefonousuario,
        rol: this.rolusuario, 
        foto: this.fotoAdmin,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el usuario');
    }

    const usuarioActualizado = await response.json();
    console.log("Usuario actualizado:", usuarioActualizado); // Aquí verificas qué se devuelve de la API

    if (usuarioActualizado) {
      alert('Usuario actualizado con éxito');
      this.cancelarEdicion(); // Cierra el formulario de edición

      // Actualiza los datos locales si es necesario
      this.nombreAdmin = usuarioActualizado.nombre;
      this.emailAdmin = usuarioActualizado.correo_electronico;
      this.usuario = usuarioActualizado.usuario;
      this.telefonousuario = usuarioActualizado.telefono;
      this.rolusuario = usuarioActualizado.rol;
      this.fotoAdmin = usuarioActualizado.foto;

      // ACTUALIZA localStorage con los nuevos valores
      localStorage.setItem('nombreusuario', this.nombreAdmin);
      localStorage.setItem('emailusuario', this.emailAdmin);
      localStorage.setItem('usuario', this.usuario);
      localStorage.setItem('telefonousuario', this.telefonousuario);
      localStorage.setItem('rolusuario', this.rolusuario);
      localStorage.setItem('fotoAdmin', this.fotoAdmin);
    } else {
      alert("No se pudo actualizar el usuario correctamente");
    }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    alert(error.message);
  }
},
  async eliminarPrestamo() {
  if (!confirm('¿Estás seguro de que deseas eliminar este préstamo?')) {
    return; // Cancelar si el usuario no confirma
  }

  try {
    // Obtener los detalles del préstamo a eliminar
    const prestamoAEliminarResponse = await fetch(`http://127.0.0.1:8000/consultarPrestamo/${this.usuarioDocumentoConsulta}/${this.implementosIdConsulta}`);
    const prestamoAEliminar = await prestamoAEliminarResponse.json();

    const response = await fetch(`http://127.0.0.1:8000/eliminarPrestamo/${this.usuarioDocumentoConsulta}/${this.implementosIdConsulta}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el préstamo.');
    }

    // Actualiza la cantidad en el inventario
    const implemento = this.inventario.find(item => item.id === this.implementosIdConsulta);
    
    if (implemento) {
      implemento.cantidad += prestamoAEliminar.cantidad; 
    }

    alert('Préstamo eliminado con éxito.');
    this.prestamo = null; // Limpiar los detalles del préstamo
  } catch (error) {
    console.error('Error al eliminar el préstamo:', error);
    alert(error.message);
  }
},
      async consultarPrestamo() {
    try {
      const response = await fetch(`http://127.0.0.1:8000/consultarPrestamo/${this.usuarioDocumentoConsulta}/${this.implementosIdConsulta}`);
      if (!response.ok) {
        throw new Error('No se pudo encontrar el préstamo.');
      }
      this.prestamo = await response.json();
      this.nuevaCantidad = this.prestamo.cantidad; // Cargar cantidad actual para facilitar la actualización
      this.nuevoEstado = this.prestamo.estado; // Cargar estado actual
    } catch (error) {
      console.error('Error al consultar préstamo:', error);
      alert(error.message);
    }
  },
  async actualizarPrestamo() {
  try {
    const response = await fetch(`http://127.0.0.1:8000/actualizarPrestamo/${this.usuarioDocumentoConsulta}/${this.implementosIdConsulta}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cantidad: this.nuevaCantidad,
        fechadepresta: new Date().toISOString().slice(0, 10), // Asegúrate de incluir la fecha si es requerida
        estado: this.nuevoEstado,
        Usuario_Documento: this.usuarioDocumentoConsulta, // Incluye el documento del usuario
        Implementos_inventario_id: this.implementosIdConsulta, // Incluye el ID del implemento
      }),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el préstamo.');
    }

    // Actualiza la cantidad en el inventario
    const prestamoActualizado = await response.json();
    const implemento = this.inventario.find(item => item.id === this.implementosIdConsulta);
    if (implemento) {
      implemento.cantidad += prestamoActualizado.cantidad - this.prestamo.cantidad; // Ajustar cantidad
    }
    
    alert('Préstamo actualizado con éxito.');
    this.prestamo = null; 
  } catch (error) {
    console.error('Error al actualizar el préstamo:', error);
    alert(error.message);
  }
},
async eliminarUsuario() {
   const confirmar = confirm('¿Estás seguro de que deseas eliminar este usuario (Recuerde que si tiene prestamos con implementos se eliminaran tambien )?');
   if (!confirmar) {
     return; 
   }
   try {
     const response = await fetch(`http://127.0.0.1:8000/EliminarUsuario/${this.Documento}`, {
       method: 'DELETE',
     });

     if (!response.ok) {
       throw new Error('Error al eliminar el usuario');
     }

     alert('Usuario eliminado con éxito');
     
     // Aquí puedes redirigir al usuario a otra página, o cerrar sesión, o eliminar los datos del usuario localmente
     // Ejemplo: Redirigir a la página de login después de eliminar el usuario
     localStorage.clear(); // Limpiar los datos almacenados
     this.$router.push('/login'); // Redirigir a la página de login
   } catch (error) {
     console.error('Error al eliminar el usuario:', error);
     alert(error.message);
   }
 },
      async fetchInventario() {
        try {
          const response = await fetch('http://127.0.0.1:8000/consultarImplementos');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          this.inventario = await response.json();
        } catch (error) {
          console.error('Error al consultar inventario:', error);
        }
      },
      async fetchDeportistas() {
        try {
          const response = await fetch('http://127.0.0.1:8000/ConsultarJugadores');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          this.deportistas = await response.json();
        } catch (error) {
          console.error('Error al consultar deportistas:', error);
        }
      },
      consultarDeportista(deportista) {
        const message = `
          Nombre: ${deportista.nombre}
          Email: ${deportista.email}
          Documento: ${deportista.documento}
          Telefono: ${deportista.telefono_acudiente}
          Email Acudiente: ${deportista.email_acudiente}
          EPS: ${deportista.eps}
        `;
        Swal.fire({
          title: 'Información del Deportista',
          text: message,
          icon: 'info',
          confirmButtonText: 'Cerrar'
        });
      },
      abrirFormularioPrestamo(producto) {
        this.productoSeleccionado = producto;
        this.formPrestamoVisible = true;
      },
      cerrarFormularioPrestamo() {
        this.formPrestamoVisible = false;
        this.usuarioDocumento = '';
        this.cantidadPrestamo = 0;
        this.productoSeleccionado = null;
      },


    async realizarPrestamo() {
    // Verifica que haya cantidad suficiente
    if (this.cantidadPrestamo > this.productoSeleccionado.cantidad) {
        alert('No hay suficiente cantidad disponible.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/insertarPrestamo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Usuario_Documento: this.usuarioDocumento,
                Implementos_inventario_id: this.productoSeleccionado.implementos,
                cantidad: this.cantidadPrestamo,
                fechadepresta: new Date().toISOString().slice(0, 10), // fecha actual
                estado: this.estado,
            }),
        });

        if (!response.ok) {
            throw new Error('Error al crear el préstamo');
        }

        // Cierra el formulario
        this.cerrarFormularioPrestamo();
        alert('Préstamo realizado con éxito.');
    } catch (error) {
        console.error('Error al realizar el préstamo:', error);
    }
}

    },
    mounted() {
    this.fetchDeportistas();
    this.fetchInventario();
    this.Documento = localStorage.getItem('Documento');  
    if (!this.Documento) {
      alert('Documento no disponible');
    }
    this.nombreAdmin = localStorage.getItem('nombreusuario') || 'Nombre no disponible';
    this.emailAdmin = localStorage.getItem('emailusuario') || 'Email no disponible';
    this.usuario = localStorage.getItem('usuario') || 'usuario no disponible';
    this.rolusuario = localStorage.getItem('rolusuario') || 'rol no disponible';
    this.telefonousuario = localStorage.getItem('telefonousuario') || 'telefono no disponible';
    this.fotoAdmin = localStorage.getItem('fotoAdmin') || '';
    }
  };
  </script>
  <style scoped>
  
  .body_entre {
    font-family: Arial, sans-serif;
    margin: -8px;
    padding: 0;
    box-sizing: border-box;
    background-color: #000;
    color: #fff;
  }
  
  .contenedor-entre {
    width: 80%;
    padding-top: 80px;
    margin: 0 auto;
  }
  .deportista-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
  }
  
  .body_admin {
    font-family: Arial, sans-serif;
    margin: -8px;
    padding: 0;
    box-sizing: border-box;
    background-color: #000;
    color: #fff;
  }
  
  .contenedor-admin {
    width: 80%;
    padding-top: 80px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  
  header {
    background-color: red;
    color: #fff;
    padding: 1rem 0;
    position: relative;
  }
  
  .header-izquierda,
  .header-derecha {
    display: flex;
    align-items: center;
  }
  
  .header-izquierda {
    flex: 1;
  }
  
  .header-derecha {
    flex: 2;
    justify-content: flex-end;
    position: relative;
  }
  .inventario-card{
    padding: 20px;
    border: solid 2px beige;
    border-radius: 20px;
    margin: 10px ;
  }
  .menu-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
    z-index: 2;
  }
  
  .menu-toggle .bar {
    background-color: #fff;
    height: 3px;
    width: 25px;
    margin: 3px 0;
  }
  
  nav {
    display: flex;
    align-items: center;
  }
  
  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }
  
  nav ul li {
    margin-left: 1rem;
  }
  
  nav ul li a {
    color: #fff;
    text-decoration: none;
  }
  
  .nombre-usuario {
    color: #fff;
    font-weight: bold;
  }
  
  main {
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
  }
  
  .perfil-seccion {
  margin-bottom: 1rem;
  margin-top: 2rem;
}
.info{
  width: 600px;
  height: 100px;
  margin-left: 15rem;
  color: #ffffff;
  font-size: 25px;
}
.perfil {
  margin-top: 2rem;
  display: flex;
}

.foto-perfil img {
  width: 200px; 
  height: 200px; 
  border-radius: 50%;
}
  
  .contenido-principal {
    display: flex;
    flex-direction: column;
  }
  
  .internal-menu {
    margin-bottom: 1rem;
  }
  
  .internal-menu button {
    margin-right: 10px;
    padding: 10px;
    cursor: pointer;
  }
  
  .seccion-actual {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #222;
  }
  
  .actividades-seccion {
    margin-top: 1rem;
  }
  
  .actividades {
    padding: 2rem;
    background-color: #444;
    color: #fff;
    text-align: center;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
  .link{
    color: #000;
  }
  .imagenes-seccion {
    flex: 1;
    padding: 1rem;
    background-color: #555;
  }
  
  .imagenes {
    background-color: grey;
    padding: 2rem;
    color: #fff;
    text-align: center;
  }
  
  footer {
    background-color: rgb(255, 0, 0);
    color: #fff;
    text-align: center;
    padding: 1rem 0;
    width: 100%;
    bottom: 0;
  }
  
  @media (max-width: 768px) {
    .menu-toggle {
      display: flex;
    }
  
    nav {
      display: none;
      position: absolute;
      top: 60px;
      right: 0;
      background-color: red;
      width: 100%;
      flex-direction: column;
      align-items: center;
    }
  
    nav.active {
      display: flex;
    }
  
    nav ul {
      flex-direction: column;
    }
  
    nav ul li {
      margin: 1rem 0;
    }
  }
  </style>
  