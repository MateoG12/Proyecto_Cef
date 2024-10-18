<template>
  <div class="body_admin">
    <main>
      <div class="contenedor-admin">
        <div class="perfil-seccion">
          <section class="perfil">
            <h2>Tu Perfil</h2>
            <div class="foto-perfil">Foto</div>
            <p>Nombre: {{ nombreAdmin }}</p>
            <p>Email: {{ emailAdmin }}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          </section>
        </div>

        <div class="contenido-principal">
          <nav class="internal-menu">
            <button @click="currentSection = 'deportista'">Información del Deportista</button>
            <button @click="currentSection = 'pagos'">Pagos</button>
            <button @click="currentSection = 'inventario'">Inventario</button>
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
                <input v-model="nuevoProducto.inventarioid" placeholder="Id invetario" required />
                <input v-model="nuevoProducto.nombre" placeholder="Nombre del Producto" required />
                <input v-model="nuevoProducto.descripcion" placeholder="Descripción" required />
                <input v-model="nuevoProducto.cantidad" type="number" placeholder="Cantidad" required />
                <input v-model="nuevoProducto.ubicacion" placeholder="Ubicación" required />
                <input v-model="nuevoProducto.administradorid" type="number" placeholder="ID Administrador" required />
                <input v-model="nuevoProducto.entrenadorid" type="number" placeholder="ID Entrenador" required />
                <button type="submit">Agregar</button>
              </form>

              <div v-for="producto in inventario" :key="producto.id" class="inventario-card">
                <p>Producto: {{ producto.nombre }}</p>
                <p>Descripción: {{ producto.descripcion }}</p>
                <p>Cantidad: {{ producto.cantidad }}</p>
                <p>Ubicación: {{ producto.ubicacion }}</p>
                <button @click="editarProducto(producto)">Editar</button>
                <button @click="eliminarProducto(producto)">Eliminar</button>
              </div>

              <template v-if="editingProducto">
                <h2>Editar Producto</h2>
                <form @submit.prevent="actualizarProducto">
                  <input v-model="editingProducto.nombre" placeholder="Nombre del Producto" required />
                  <input v-model="editingProducto.descripcion" placeholder="Descripción" required />
                  <input v-model="editingProducto.cantidad" type="number" placeholder="Cantidad" required />
                  <input v-model="editingProducto.ubicacion" placeholder="Ubicación" required />
                  <button type="submit">Actualizar Producto</button>
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
              <li><router-link to="/admin/perfil">Perfil</router-link></li>
              <li><router-link to="/admin/configuracion">Configuración</router-link></li>
              <li><router-link to="/admin/profesores">Profesores</router-link></li>
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
      menuActive: false,
      currentSection: 'deportista',
      deportistas: [],
      selectedCategory: '',
      editingDeportista: null,
      categoriasPermitidas: ['Sub7', 'Sub9', 'Sub11', 'Sub13', 'Sub15', 'Sub17', 'Sub20', 'Elite'],
      inventario: [],
      nuevoProducto: { nombre: '', descripcion: '', cantidad: '', ubicacion: '', administradorid: '', entrenadorid: '' },
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
        const response = await fetch('http://127.0.0.1:8000/ConsultarInventario');
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
    const response = await fetch('http://127.0.0.1:8000/AgregarProducto', {
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
        const response = await fetch(`http://127.0.0.1:8000/ActualizarProducto/${this.editingProducto.inventarioid}`, {
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
          fetch(`http://127.0.0.1:8000/EliminarProducto/${producto.inventarioid}`, {
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
    editarDeportista(deportista) {
      this.editingDeportista = { ...deportista };
    },
    async actualizarDeportista() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/ActualizarDeportista/${this.editingDeportista.documento}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.editingDeportista)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.editingDeportista = null;
        await this.fetchDeportistas();
      } catch (error) {
        console.error('Error al actualizar deportista:', error);
      }
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
          fetch(`http://127.0.0.1:8000/EliminarDeportista/${deportista.documento}`, {
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
    this.nombreAdmin = localStorage.getItem('nombreAdmin') || 'Nombre no disponible';
    this.emailAdmin = localStorage.getItem('emailAdmin') || 'Email no disponible';
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
}

.perfil {
  margin-bottom: 2rem;
}

.foto-perfil {
  background-color: grey;
  color: #fff;
  padding: 2rem;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
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
