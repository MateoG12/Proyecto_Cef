<template>
  <div class="body_admin">
    <main>
      <div class="contenedor-admin">
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
            <button @click="currentSection = 'inventario'">Inventario</button>
            <button @click="currentSection = 'pagos'">Pagos</button>
          </nav>
          <div class="seccion-actual">
            <template v-if="currentSection === 'deportista' && !editingDeportista">
              <h2>Generar Código</h2>
              <h3>Información del Deportista</h3>
              
              <label for="categoria">Filtrar por categoría:</label>
              <select v-model="selectedCategory" id="categoria">
                <option value="">Todas</option>
                <option v-for="categoria in categoriasPermitidas" :key="categoria" :value="categoria">{{ categoria }}</option>
              </select>

              <div v-for="deportista in filteredDeportistas" :key="deportista.documento" class="deportista-card">
                <p>Nombre: {{ deportista.nombre }}</p>
                <p>Email: {{ deportista.email }}</p>
                <p>Categoría: {{ deportista.categoria }}</p>
                <button @click="editarDeportista(deportista)">Editar</button>
                <button @click="eliminarDeportista(deportista)">Eliminar</button>
                <button @click="consultarDeportista(deportista)">Consultar</button>
              </div>
            </template>

            <template v-if="currentSection === 'deportista' && editingDeportista">
              <h2>Editar Deportista</h2>
              <form @submit.prevent="actualizarDeportista">
                <input v-model="editingDeportista.nombre" placeholder="Nombre" required />
                <input v-model="editingDeportista.apellidos" placeholder="Apellidos" required />
                <input v-model="editingDeportista.edad" type="number" placeholder="Edad" required />
                <input v-model="editingDeportista.fecha_nacimiento" type="date" placeholder="Fecha de Nacimiento" required />
                <input v-model="editingDeportista.eps" placeholder="EPS" required />
                <input v-model="editingDeportista.telefono" placeholder="Teléfono" required />
                <input v-model="editingDeportista.email" type="email" placeholder="Email" required />
                <input v-model="editingDeportista.foto" placeholder="URL de Foto" />
                <input v-model="editingDeportista.nombre_acudiente" placeholder="Nombre Acudiente" required />
                <input v-model="editingDeportista.telefono_acudiente" placeholder="Teléfono Acudiente" required />
                <input v-model="editingDeportista.email_acudiente" type="email" placeholder="Email Acudiente" required />
                <select v-model="editingDeportista.categoria" required>
                  <option v-for="categoria in categoriasPermitidas" :key="categoria" :value="categoria">{{ categoria }}</option>
                </select>
                <button type="submit">Actualizar Deportista</button>
              </form>
            </template>

            <template v-if="currentSection === 'pagos'">
              <h2>Pagos</h2>
              <div class="pago-card">
                <p>Pago: $100</p>
                <p>Fecha: 2024-08-01</p>
                <button>Editar</button>
                <button>Eliminar</button>
              </div>

              <h3>Agregar Pago</h3>
              <form @submit.prevent>
                <input placeholder="Monto" required />
                <input type="date" required />
                <button type="submit">Agregar</button>
              </form>

              <h3>Editar Pago</h3>
              <form @submit.prevent>
                <input placeholder="Monto" required />
                <input type="date" required />
                <button type="submit">Actualizar</button>
              </form>
            </template>

            <template v-if="currentSection === 'inventario'">
              <h2>Inventario</h2>
              <h3>Agregar Producto</h3>
              <form @submit.prevent="agregarProducto">
                <input v-model="nuevoProducto.implementos" placeholder="Id invetario" required />
                <input v-model="nuevoProducto.nombre" placeholder="Nombre del Producto" required />
                <input v-model="nuevoProducto.descripcion" placeholder="Descripción" required />
                <input v-model="nuevoProducto.cantidad" type="number" placeholder="Cantidad" required />
                <button type="submit">Agregar</button>
              </form>

              <div v-for="producto in inventario" :key="producto.id" class="inventario-card">
                <p>Producto: {{ producto.nombre }}</p>
                <p>Descripción: {{ producto.descripcion }}</p>
                <p>Cantidad: {{ producto.cantidad }}</p>
        
                <button @click="editarProducto(producto)">Editar</button>
                <button @click="eliminarProducto(producto)">Eliminar</button>
              </div>

              <template v-if="editingProducto">
                <h2>Editar Producto</h2>
                <form @submit.prevent="actualizarProducto">
                  <input v-model="editingProducto.nombre" placeholder="Nombre del Producto" required />
                  <input v-model="editingProducto.descripcion" placeholder="Descripción" required />
                  <input v-model="editingProducto.cantidad" type="number" placeholder="Cantidad" required />
                  <button type="submit">Actualizar Producto</button>
                </form>
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
            </template>
          </div>
        </div>

        <div>
          <div class="menu-toggle" @click="toggleMenu">
            <span class="bar" v-for="bar in 3" :key="bar"></span>
          </div>
          <nav class="internal-menu">
            <ul class="admin-menu">
              <li><router-link to="/admin/informacion">Información</router-link></li>
              <li><router-link to="/admin/perfil">Configurar Perfil</router-link></li>
              <li><router-link to="/admin/configuracion">Noticia</router-link></li>
              <li><router-link to="/admin/profesores">Agregar Profesores</router-link></li>
            </ul>
          </nav>
          <router-view></router-view>
        </div>

        <div class="actividades-seccion">
          <div class="actividades">
            <div class="imagenes-seccion">
              <h2>Imágenes (torneos)</h2>
              <div class="imagenes">Imágenes a la derecha</div>
            </div>
            <div class="imagenes-seccion">
              <h2>Imágenes (entrenamientos)</h2>
              <div class="imagenes">Imágenes a la izquierda</div>
            </div>
          </div>
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
      nombreAdmin: '',
      emailAdmin: '',
      usuario:'',
      rolusuario: '',
      telefonousuario: '',
      fotoAdmin:'',
      menuActive: false,
      currentSection: 'deportista',
      deportistas: [],
      selectedCategory: '',
      editingDeportista: null,
      categoriasPermitidas: ['Sub7', 'Sub9', 'Sub11', 'Sub13', 'Sub15', 'Sub17', 'Sub20', 'Elite'],
      inventario: [],
      nuevoProducto: { implementos: '', descripcion: '', cantidad: '', nombre: '' },
      editingProducto: null
    };
  },
  computed: {
    filteredDeportistas() {
      if (this.selectedCategory) {
        return this.deportistas.filter(deportista => deportista.categoria === this.selectedCategory);
      }
      return this.deportistas;
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
async eliminarUsuario() {
   const confirmar = confirm('¿Estás seguro de que deseas eliminar este usuario?');

   if (!confirmar) {
     return; // Si el usuario no confirma, no se elimina
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
    async agregarProducto() {
  try {
    const response = await fetch('http://127.0.0.1:8000/insertarImplemento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.nuevoProducto)
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.detail || 'Error al agregar el producto';
      Swal.fire('Error', errorMessage, 'error');
      return; 
    }
    this.nuevoProducto = { nombre: '', descripcion: '', cantidad: '', ubicacion: '', administradorid: '', entrenadorid: '' };
    await this.fetchInventario();
    Swal.fire('Éxito', 'Producto agregado correctamente', 'success');
  } catch (error) {
    console.error('Error al agregar producto:', error);
    Swal.fire('Error', 'Error en algun dato digitado, revisar y corregir', 'error');
  }
},

    editarProducto(producto) {
      this.editingProducto = { ...producto };
    },
    async actualizarProducto() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/actualizarImplemento/${this.editingProducto.implementos}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.editingProducto)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.editingProducto = null;
        await this.fetchInventario();
      } catch (error) {
        console.error('Error al actualizar producto:', error);
      }
    },
    eliminarProducto(producto) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar el producto ${producto.nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://127.0.0.1:8000/eliminarImplemento/${producto.implementos}`, {
            method: 'DELETE'
          })
          .then(response => {
            if (response.ok) {
              Swal.fire('Eliminado!', 'El producto ha sido eliminado.', 'success');
              this.fetchInventario(); // Refresca la lista de inventario
            } else {
              Swal.fire('Error', 'Error al eliminar el producto.', 'error');
            }
          })
          .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Error al eliminar el producto.', 'error');
          });
        }
      });
    },
async eliminarUsuario() {
  const confirmar = confirm('¿Estás seguro de que deseas eliminar este usuario?');

  if (!confirmar) {
    return; // Si el usuario no confirma, no se elimina
  }

  // Paso 1: Verificar si el usuario tiene implementos asociados a su documento
  try {
    // Hacer una consulta para obtener los implementos asociados al usuario
    const response = await fetch(`http://127.0.0.1:8000/consultarImplementos/${this.Documento}`);
    
    if (!response.ok) {
      throw new Error('Error al consultar los implementos');
    }

    const implementos = await response.json();

    // Si el usuario tiene implementos asociados
    if (implementos.length > 0) {
      // Paso 2: Mostrar un mensaje con la opción de editar el documento de los implementos
      const result = await Swal.fire({
        title: 'El usuario tiene implementos asociados',
        text: '¿Deseas editar el documento de los implementos antes de eliminar el usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Editar Implementos',
        cancelButtonText: 'Eliminar Usuario',
      });

      if (result.isConfirmed) {
        // Redirigir a una sección o abrir un formulario para editar los implementos
        this.editarImplementos(implementos);
        return; // No eliminamos el usuario, solo se editan los implementos
      }
    }

    // Si no hay implementos asociados o si el usuario decide eliminar el usuario sin editar los implementos
    const responseEliminar = await fetch(`http://127.0.0.1:8000/EliminarUsuario/${this.Documento}`, {
      method: 'DELETE',
    });

    if (!responseEliminar.ok) {
      throw new Error('Error al eliminar el usuario');
    }

    alert('Usuario eliminado con éxito');

    // Limpiar los datos de localStorage y redirigir al login
    localStorage.clear();
    this.$router.push('/login'); // Redirigir a la página de login

  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    alert(error.message);
  }
},

// Método para editar los implementos del usuario
editarImplementos(implementos) {
  // Aquí puedes abrir un formulario o hacer algo con los implementos
  // Para editar los documentos o cualquier otra acción relacionada con los implementos
  console.log('Editar implementos asociados:', implementos);
  
  // Por ejemplo, podrías navegar a una nueva ruta para editar los implementos
  // this.$router.push({ name: 'editarImplementos', params: { implementos: implementos } });

  // O abrir un formulario dentro de tu componente para editar los implementos
  this.editingImplementos = implementos;
},
    eliminarDeportista(deportista) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar a ${deportista.nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://127.0.0.1:8000/EliminarJ/${deportista.documento}`, {
            method: 'DELETE'
          })
          .then(response => {
            if (response.ok) {
              Swal.fire('Eliminado!', 'El deportista ha sido eliminado.', 'success');
              this.fetchDeportistas(); // Refresca la lista de deportistas
            } else {
              Swal.fire('Error', 'Error al eliminar el deportista.', 'error');
            }
          })
          .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Error al eliminar el deportista.', 'error');
          });
        }
      });
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
    toggleMenu() {
      this.menuActive = !this.menuActive;
    }
  },
  mounted() {
    this.fetchDeportistas();
    this.fetchInventario();
    this.nombreAdmin = localStorage.getItem('nombreusuario') || 'Nombre no disponible';
    this.emailAdmin = localStorage.getItem('emailusuario') || 'Email no disponible';
    this.usuario = localStorage.getItem('usuario') || 'usuario no disponible';
    this.rolusuario = localStorage.getItem('rolusuario') || 'rol no disponible';
    this.telefonousuario = localStorage.getItem('telefonousuario') || 'telefono no disponible';
    this.fotoAdmin = localStorage.getItem('fotoAdmin') || '';
    
    console.log('URL de la foto:', this.fotoAdmin);
  }
};
</script>



<style scoped>

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
