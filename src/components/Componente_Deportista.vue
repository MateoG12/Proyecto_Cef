<template>
    <div class="body">
    <div class="body_depor">
      <main>
        <div class="contenedor-depor">
          <div class="perfil-seccion">
            <h2>TU PERFIL</h2>
            <section class="perfil">
              <div class="info">
              <p>Nombre: {{ nombreDeportista }}</p>
              <p>Email: {{ emailDeportista }}</p>
              <p>Usuario: {{ usuarioDeportista }}</p>
              <p>telefono: {{ telefonoDeportista }}</p>
              <button @click="editarDeportista">Editar</button>
              <button @click="eliminarDeportista">Eliminar</button>
              <button @click="consultarDeportista(deportista)">Consultar</button>
              </div>
              <div class="foto-perfil">
                <img v-if="fotoDeportista" :src="fotoDeportista" alt="Foto de Perfil" />
                <div v-else>No hay foto disponible</div>
              </div>
            </section>
          </div>
          <div class="contenido-principal">
            <nav class="internal-menu">
              <button @click="currentSection = 'deportista'">Información del Deportista</button>
              <button @click="currentSection = 'pagos'">Pagos</button>
              <button @click="currentSection = 'equipo'">Mi Equipo</button>
              <!-- <button @click="currentSection = 'encuentros'">Mis Encuentros</button> -->
            </nav>
            <div class="seccion-actual">
              <template v-if="currentSection === 'equipo'">
              <h2>Mi Equipo</h2>
                <div class="equipo-info">
                  <h3>{{ miEquipo.nombre }}</h3>
                  <p><strong>Categoría:</strong> {{ miEquipo.categoria }}</p>
                  <p><strong>Documento de Entrenador:</strong> {{ miEquipo.usuario_id }}</p>
                </div>
            </template>

            <template v-if="currentSection === 'encuentros'">
              <h2>Mis Encuentros</h2>
              <div class="filtro-encuentros">
                <button @click="filtroEncuentros = 'futuros'" :class="{ active: filtroEncuentros === 'futuros' }">Próximos</button>
                <button @click="filtroEncuentros = 'pasados'" :class="{ active: filtroEncuentros === 'pasados' }">Pasados</button>
              </div>

              <div v-if="encuentrosEquipo.length > 0">
                <div v-for="encuentro in encuentrosFiltrados" :key="encuentro.encuentro_id" class="encuentro-card">
                  <h3>{{ encuentro.torneo_nombre || 'Encuentro' }}</h3>
                  <p><strong>Fecha:</strong> {{ formatearFecha(encuentro.fecha) }}</p>
                  <p><strong>Hora:</strong> {{ encuentro.hora }}</p>
                  <p><strong>Ubicación:</strong> {{ encuentro.ubicacion }}</p>
                  <p><strong>Tipo:</strong> {{ encuentro.tipo }}</p>
                  <p><strong>Resultado:</strong> {{ encuentro.resultado || 'Por disputarse' }}</p>
                  <p><strong>Estado:</strong> {{ esEncuentroFuturo(encuentro.fecha) ? 'Próximo' : 'Finalizado' }}</p>
                </div>
              </div>
              <div v-else>
                <p v-if="miEquipo">No hay encuentros {{ filtroEncuentros === 'futuros' ? 'programados' : 'pasados' }} para tu equipo.</p>
                <p v-else>No perteneces a ningún equipo actualmente.</p>
              </div>
            </template>
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
                  
                </div>
              </template>
  
              <div v-if="editingDeportista">
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
            </div>
            <template   v-if="currentSection === 'pagos'">
              <h2>Pagos</h2>
              <h3>Agregar Pago</h3>
              <form @submit.prevent="agregarPago">
                <div>
                  <!-- Campo de fecha automático -->
                  <input type="date" v-model="fecha" readonly />
                </div>
                <div>
                  <input type="number" placeholder="Inscripción Documento" v-model="inscripcion_documento" required />
                </div>
                <div>
                  <input type="number" placeholder="Monto" v-model="monto" required />
                </div>
                <div>
                  <input type="number" placeholder="ID de Pago" v-model="pagos_id" required />
                </div>
                <div>
                  <select v-model="categoria" class="styled-select" required>
                    <option value="" disabled>Seleccionar Categoría</option>
                    <option v-for="(categoria, index) in categoriasPermitidas" :key="index" :value="categoria">{{ categoria }}</option>
                  </select>
                </div>
                <div>
                  <input type="text" placeholder="Descripción" v-model="descripcion" required />
                </div>
                <div>
                  <input type="text" placeholder="Tipo" v-model="tipo" required />
                </div>
                <div>
                <select  class="styled-select" required>
                    <option value="" disabled>Seleccionar La forma de Pago</option>
                    <option v-for="(Formadepago, index) in Formadepago" >{{ Formadepago }}</option>
                </select>
              </div>
                <button type="submit">Agregar</button>
                <button type="submit"@click="mostrarConsultaPagos">Consultar Pagos</button>
              </form>
            </template>
            <template  v-if="currentSection === 'consultaPagos'">
                <h2>Consulta de Pagos</h2>
                <div v-if="pagos && pagos.length > 0">
                  <ul>
                    <li  class="deportista-card"  v-for="pago in pagos" :key="pago.pagos_id">
                      Monto: {{ pago.monto }} - Fecha: {{ pago.fecha }} - Categoría: {{ pago.categoria }}
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <p>No hay pagos disponibles.</p>
                </div>
                <button @click="regresar">Volver a Agregar Pago</button>
            </template>
        </div>      
          </div>
          <!-- <div class="actividades-seccion">
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
          </div> -->
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
            <a href="mailto:info@example.com" class="info-item"><i class="fas fa-envelope"></i> Clubindependietecef@Gmail.com</a>
            <a href="tel:+123456789" class="info-item"><i class="fas fa-phone"></i> 3138683102</a>
            <p class="info-item"><i class="fas fa-map-marker-alt"></i> Calle Ejemplo 123, Ciudad</p>
          </div>
        </div>
      </footer>
    </div>
  </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  import axios from 'axios'; 
  
  export default {
    data() {
      return {
        miEquipo: null,
        companerosEquipo: [],
        entrenadorEquipo: null,
        encuentrosEquipo: [],
        filtroEncuentros: 'futuros' ,// 'futuros' o 'pasados',
        fecha: this.obtenerFechaHoy(), 
        inscripcion_documento : '',
        monto : '',
        pagos_id : '',
        categoria : '',
        descripcion : '',
        tipo : '',
        apellidosDeportista:'',
        edadDeportista:0,
        fecha_nacimientoDeportista:'',
        epsDeportista:'',
        nombre_acudienteDeportista:'',
        telefono_acudienteDeportista:'',
        email_acudienteDeportista:'',
        categoriaDeportista:'',
        documento: 0,
        nombreDeportista: '',
        emailDeportista: '',
        usuarioDeportista: '', 
        telefonoDeportista: '', 
        fotoDeportista: '',
        isEditing: null, 
        menuActive: false,
        currentSection: 'deportista',
        deportistas: [],
        pagos: [], 
        selectedCategory: '',
        editingDeportista: null,
        Formadepago:['Nequi','Bancolombia','PSE'],
        categoriasPermitidas: ['Sub 7', 'Sub 9', 'Sub 11', 'Sub 13', 'Sub 15', 'Sub 17', 'Sub 20', 'Elite'],
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
      },
      
    },
    methods: {
      obtenerFechaHoy() {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      },
      encuentrosFiltrados() {
      const hoy = new Date().toISOString().split('T')[0];
      return this.encuentrosEquipo.filter(encuentro => {
        if (this.filtroEncuentros === 'futuros') {
          return encuentro.fecha >= hoy;
        } else {
          return encuentro.fecha < hoy;
        }
      }).sort((a, b) => {
        if (this.filtroEncuentros === 'futuros') {
          return new Date(a.fecha) - new Date(b.fecha);
        } else {
          return new Date(b.fecha) - new Date(a.fecha);
        }
      });
    },
    
      async agregarPago() {

        // Crear el objeto del pago
        const nuevoPago = {
          inscripcion_documento: Number(this.inscripcion_documento),
          monto: Number(this.monto),
          pagos_id: Number(this.pagos_id),
          fecha: this.fecha,
          categoria: this.categoria,
          descripcion: this.descripcion,
          tipo: this.tipo,
        };

        try {
          // Hacer la solicitud POST para agregar el pago
          const response = await fetch('http://127.0.0.1:8000/insertarPago', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoPago),
          });

          if (!response.ok) {
            throw new Error('Error al insertar el pago');
          }
          const result = await response.json();
          Swal.fire('Exitoso!', 'Pago registrado correctamente.', 'success');
          
          // Limpiar los campos después de agregar el pago
          this.fecha = this.obtenerFechaHoy(); // Resetear la fecha
          this.inscripcion_documento = '';
          this.monto = '';
          this.pagos_id = '';
          this.categoria = '';
          this.descripcion = '';
          this.tipo = '';

        } catch (error) {
          console.error('Error al insertar el pago:', error);
          Swal.fire('Error!', 'No se pudo insertar el pago.', 'error');
        }
      },
      mostrarConsultaPagos() {
      this.currentSection = 'consultaPagos';
      console.log('Sección actual:', this.currentSection); // Verifica que se cambie a 'consultaPagos'
      this.consultarPagos(); 
    },
      regresar() {
      this.currentSection = 'pagos';
    },
  async consultarPagos() {
  // Asegúrate de que el documento sea válido
  if (!this.documento || this.documento === 'documento no disponible') {
    console.log('Error: Documento no disponible. Valor actual:', this.documento); // Log para depuración
    Swal.fire('Error!', 'El documento de inscripción no está disponible.', 'error');
    return;
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/consultarPago/${this.documento}`);
    if (!response.ok) {
      throw new Error('Error al consultar los pagos');
    }
    const data = await response.json(); // Asignar los pagos obtenidos
    this.pagos = data; // Asignar los pagos obtenidos
  } catch (error) {
    
  }
},
      cargarDatosDeportista() {
      this.nombreDeportista = localStorage.getItem('nombreDeportista') || 'Nombre no disponible';
      this.apellidosDeportista = localStorage.getItem('apellidosDeportista') || 'Apellidos no disponible';
      this.edadDeportista = localStorage.getItem('edadDeportista') || 'Edad no disponible';
      this.fechaNacimientoDeportista = localStorage.getItem('fechaNacimientoDeportista') || 'Fecha no disponible';
      this.epsDeportista = localStorage.getItem('epsDeportista') || 'EPS no disponible';
      this.telefonoDeportista = localStorage.getItem('telefonoDeportista') || 'Teléfono no disponible';
      this.emailDeportista = localStorage.getItem('emailDeportista') || 'Email no disponible';
      this.usuarioDeportista = localStorage .getItem('usuarioDeportista') || 'Usuario no disponible';
      this.fotoDeportista = localStorage.getItem('fotoDeportista') || '';
      this.nombreAcudienteDeportista = localStorage.getItem('nombreAcudienteDeportista') || 'Nombre Acudiente no disponible';
      this.telefonoAcudienteDeportista = localStorage.getItem('telefonoAcudienteDeportista') || 'Teléfono Acudiente no disponible';
      this.emailAcudienteDeportista = localStorage.getItem('emailAcudienteDeportista') || 'Email Acudiente no disponible';
      this.categoriaDeportista = localStorage.getItem('categoriaDeportista') || 'Categoría no disponible';
    },
    editarDeportista() {
      this.editingDeportista = {
        documento: Number(this.documento),
        nombre: this.nombreDeportista,
        apellidos: this.apellidosDeportista,
        edad: Number(this.edadDeportista),
        fecha_nacimiento: this.fechaNacimientoDeportista,
        eps: this.epsDeportista,
        telefono: this.telefonoDeportista,
        email: this.emailDeportista,
        foto: this.fotoDeportista,
        nombre_acudiente: this.nombreAcudienteDeportista,
        telefono_acudiente: this.telefonoAcudienteDeportista,
        email_acudiente: this.emailAcudienteDeportista,
        categoria: this.categoriaDeportista,
      };
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
async eliminarDeportista() {

  // Verificar que el documento esté disponible
  if (!this.documento) {
    console.error('No se pudo encontrar el documento del usuario');
    return;
  }

  try {
    // Hacer la solicitud DELETE con el documento del usuario logueado
    const response = await fetch(`http://127.0.0.1:8000/EliminarJ/${this.documento}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el deportista');
    }

    const result = await response.json();
    Swal.fire('Eliminado!', result.detail, 'success');

    // Aquí puedes redirigir al usuario a otra página después de eliminarlo, por ejemplo:
    // this.$router.push('/login'); // Redirigir a la página de login si es necesario
  } catch (error) {
    console.error('Error al eliminar deportista:', error);
    Swal.fire('Error!', 'No se pudo eliminar el deportista.', 'error');
  }
},


async actualizarDeportista() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/ActualizarJ/${this.editingDeportista.documento}`, {
          method: 'PUT',
          
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.editingDeportista),
          
        });

        if (!response.ok) {
          console.log(this.editingDeportista);
          throw new Error('Error al actualizar deportista');
          
        }
        const deportistaActualizado = await response.json();
        Swal.fire('Actualizado!', 'El deportista ha sido actualizado.', 'success');
        
        // Actualizar los datos en localStorage
        localStorage.setItem('nombreDeportista', deportistaActualizado.nombre);
        localStorage.setItem('apellidosDeportista', deportistaActualizado.apellidos);
        localStorage.setItem('edadDeportista', deportistaActualizado.edad);
        localStorage.setItem('fechaNacimientoDeportista', deportistaActualizado.fecha_nacimiento);
        localStorage.setItem('epsDeportista', deportistaActualizado.eps);
        localStorage.setItem('telefonoDeportista', deportistaActualizado.telefono);
        localStorage.setItem('emailDeportista', deportistaActualizado.email);
        localStorage.setItem('fotoDeportista', deportistaActualizado.foto);
        localStorage.setItem('nombreAcudienteDeportista', deportistaActualizado.nombre_acudiente);
        localStorage.setItem('telefonoAcudienteDeportista', deportistaActualizado.telefono_acudiente);
        localStorage.setItem('emailAcudienteDeportista', deportistaActualizado.email_acudiente);
        localStorage.setItem('categoriaDeportista', deportistaActualizado.categoria);

        // Salir del modo de edición
        this.editingDeportista = null;
        this.cargarDatosDeportista(); // Recargar los datos del deportista
      } catch (error) {
        console.error('Error al actualizar deportista:', error);
        Swal.fire('Error!', 'No se pudo actualizar el deportista.', 'error');
      }
    },
    async obtenerMiEquipo() {
  try {
    const response = await fetch(`http://127.0.0.1:8000/consultarEquipoPorDeportista/${this.documento}`);
    if (response.ok) {
      this.miEquipo = await response.json();
      if (this.miEquipo && this.miEquipo.equipoid) {
        await this.obtenerCompanerosEquipo();
        await this.obtenerEntrenadorEquipo();
        await this.obtenerEncuentrosEquipo();
      } else {
        this.miEquipo = null;
        this.encuentrosEquipo = [];
      }
    } else {
      this.miEquipo = null;
      this.encuentrosEquipo = [];
    }
  } catch (error) {
    console.error('Error al obtener equipo:', error);
    this.miEquipo = null;
    this.encuentrosEquipo = [];
  }
},

    async obtenerCompanerosEquipo() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/consultarCompanerosEquipo/${this.miEquipo.equipoid}`);
        if (response.ok) {
          this.companerosEquipo = await response.json();
          // Filtrarme a mí mismo de la lista de compañeros
          this.companerosEquipo = this.companerosEquipo.filter(c => c.documento !== this.documento);
        }
      } catch (error) {
        console.error('Error al obtener compañeros:', error);
        this.companerosEquipo = [];
      }
    },

    async obtenerEntrenadorEquipo() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/consultarEntrenadorEquipo/${this.miEquipo.equipoid}`);
        if (response.ok) {
          this.entrenadorEquipo = await response.json();
        }
      } catch (error) {
        console.error('Error al obtener entrenador:', error);
        this.entrenadorEquipo = null;
      }
    },

    async obtenerEncuentrosEquipo() {
  try {
    const response = await fetch(`http://127.0.0.1:8000/consultarEncuentrosEquipo/${this.miEquipo.equipoid}`);
    if (response.ok) {
      const data = await response.json();
      // Mapear los datos para adaptarlos a lo que espera el frontend
      this.encuentrosEquipo = data.map(encuentro => ({
        encuentro_id: encuentro.Encuentro_id,
        fecha: encuentro.fecha,
        hora: encuentro.hora,
        ubicacion: encuentro.ubicacion,
        tipo: encuentro.tipo,
        resultado: encuentro.resultado,
        torneo_nombre: encuentro.torneo?.nombre || 'Sin torneo'
      }));
    } else {
      console.error('Error al obtener encuentros:', response.status);
      this.encuentrosEquipo = [];
    }
  } catch (error) {
    console.error('Error al obtener encuentros:', error);
    this.encuentrosEquipo = [];
  }
},


    formatearFecha(fecha) {
      const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(fecha).toLocaleDateString('es-ES', opciones);
    },

    esEncuentroFuturo(fecha) {
      const hoy = new Date().toISOString().split('T')[0];
      return fecha >= hoy;
    }
  
  },
  mounted() {
    this.cargarDatosDeportista();
    this.fetchDeportistas();
    this.documento = localStorage.getItem('documento') || 'documento no disponible';
    
    // Solo cargar equipo y encuentros si el documento es válido
    if (this.documento && this.documento !== 'documento no disponible') {
      this.consultarPagos();
      this.obtenerMiEquipo();
    }
    this.cargarDatosDeportista();
    this.fetchDeportistas();
    this.documento = localStorage.getItem('documento') || 'documento no disponible';
    this.nombreDeportista = localStorage.getItem('nombreDeportista') || 'Nombre no disponible';
    this.apellidosDeportista = localStorage.getItem('apellidosDeportista') || 'Apellidos no disponible';
    this.edadDeportista = localStorage.getItem('edadDeportista') || 'Edad no disponible';
    this.fechaNacimientoDeportista = localStorage.getItem('fechaNacimientoDeportista') || 'Fecha no disponible';
    this.epsDeportista = localStorage.getItem('epsDeportista') || 'EPS no disponible';
    this.telefonoDeportista = localStorage.getItem('telefonoDeportista') || 'Teléfono no disponible';
    this.emailDeportista = localStorage.getItem('emailDeportista') || 'Email no disponible';
    this.usuarioDeportista = localStorage.getItem('usuarioDeportista') || 'Usuario no disponible';
    this.fotoDeportista = localStorage.getItem('fotoDeportista') || '';
    this.nombreAcudienteDeportista = localStorage.getItem('nombreAcudienteDeportista') || 'Nombre Acudiente no disponible';
    this.telefonoAcudienteDeportista = localStorage.getItem('telefonoAcudienteDeportista') || 'Teléfono Acudiente no disponible';
    this.emailAcudienteDeportista = localStorage.getItem('emailAcudienteDeportista') || 'Email Acudiente no disponible';
    this.categoriaDeportista = localStorage.getItem('categoriaDeportista') || 'Categoría no disponible';  // Asegúrate de tener esto
    if (this.documento && this.documento !== 'documento no disponible') {
    this.consultarPagos(); 
    }
  }
  };
  </script>
<style scoped src="/src/assets/estilos_deportistas.css">

</style>
    