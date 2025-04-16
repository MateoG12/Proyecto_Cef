<template>
    <div class="body">
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
              <!-- <button @click="currentSection = 'pagos'">Pagos</button> -->
              <button @click="currentSection = 'inventario'">Inventario</button>
              <button @click="currentSection = 'prestamos'">Préstamos</button>
              <button @click="currentSection = 'Equipos'">Equipo</button>
              <button @click="currentSection = 'agregarInscripcion'">Agregar a equipo</button>
              <button @click="currentSection = 'encuentros'">Encuentros</button>
              <router-link class="link" to="/Tactica"><button @click="currentSection = 'Tactica'">Tactica</button></router-link>
            </nav>
            <div class="seccion-actual">
              <template v-if="currentSection === 'estadisticas'">
              <h2>Agregar Estadísticas para el Encuentro ID: {{ selectedEncuentroId }}</h2>
              <form @submit.prevent="agregarEstadistica">
                  <!-- <div>
                      <label for="asistencias">ID</label>
                      <input v-model="estadistica.id" type="number" required />
                  </div> -->
                  <div>
                      <label for="asistencias">Asistencias:</label>
                      <input v-model="estadistica.asistencias" type="number" required />
                  </div>
                  <div>
                      <label for="corners">Corners:</label>
                      <input v-model="estadistica.corners" type="number" required />
                  </div>
                  <div>
                      <label for="faltas">Faltas:</label>
                      <input v-model="estadistica.faltas" type="number" required />
                  </div>
                  <div>
                      <label for="goles">Goles:</label>
                      <input v-model="estadistica.goles" type="number" required />
                  </div>
                  <div>
                      <label for="penales">Penales:</label>
                      <input v-model="estadistica.penales" type="number" required />
                  </div>
                  <div>
                      <label for="tarjetasamarillas">Tarjetas Amarillas:</label>
                      <input v-model="estadistica.tarjetasamarillas" type="number" required />
                  </div>
                  <div>
                      <label for="tarjetasrojas">Tarjetas Rojas:</label>
                      <input v-model="estadistica.tarjetasrojas" type="number" required />
                  </div>
                  <div>
                      <label for="tirolibres">Tiros Libres:</label>
                      <input v-model="estadistica.tirolibres" type="number" required />
                  </div>
                  <button type="submit">Agregar Estadísticas</button>
                  <button type="button" @click="cancelarEdicionEstadistica">Cancelar</button>
              </form>
              <h3>Estadísticas Existentes</h3>
              <div v-if="estadisticas.length > 0">
                  <div v-for="est in estadisticas" :key="selectedEncuentroId" class="estadistica-card">
                      <p>Encuentro ID: {{ est.encuentros_encuentro_id }}</p>
                      <p>Asistencias: {{ est.asistencias }}</p>
                      <p>Corners: {{ est.corners }}</p>
                      <p>Faltas: {{ est.faltas }}</p>
                      <p>Goles: {{ est.goles }}</p>
                      <p>Penales: {{ est.penales }}</p>
                      <p>Tarjetas Amarillas: {{ est.tarjetasamarillas }}</p>
                      <p>Tarjetas Rojas: {{ est.tarjetasrojas }}</p>
                      <p>Tiros Libres: {{ est.tirolibres }}</p>
                      <button @click="editarEstadistica(est)">Editar</button>
                      <button @click="eliminarEstadistica(est.encuentros_encuentro_id)">Eliminar</button>
                  </div>
              </div>
              <div v-else>
                  <p>No hay estadísticas registradas.</p>
              </div>
          </template>
          <template v-if="currentSection === 'encuentros'">
            <h2>Encuentros</h2>
            <h3>Agregar Nuevo Encuentro</h3>
            <form @submit.prevent="isEditingEncuentro ? actualizarEncuentro() : agregarEncuentro()">
              <div>
                <label for="equipo_equipoid">Seleccionar Equipo:</label>
                <select v-model="encuentro.equipo.equipoid" required>
                  <option value="" disabled>Seleccionar un equipo</option>
                  <option v-for="equipo in equipos" :key="equipo.equipoid" :value="equipo.equipoid">
                    {{ equipo.nombre }} (ID: {{ equipo.equipoid }})
                  </option>
                </select>
              </div>
              <div>
                <label for="torneo_torneo_id">Seleccionar Torneo:</label>
                <select v-model="encuentro.torneo.torneo_id" required>
                  <option value="" disabled>Seleccionar un torneo</option>
                  <option v-for="torneo in torneos" :key="torneo.torneo_id" :value="torneo.torneo_id">
                    {{ torneo.nombre }} (ID: {{ torneo.torneo_id }})
                  </option>
                </select>
              </div>
              <div>
                <label for="fecha">Fecha:</label>
                <input v-model="encuentro.fecha" type="date" required />
              </div>
              <div>
                <label for="encuentroscol">Col:</label>
                <input v-model="encuentro.encuentroscol" type="text" required />
              </div>
              <div>
                <label for="hora">Hora:</label>
                <input v-model="encuentro.hora" type="time" required />
              </div>
              <div>
                <label for="resultado">Resultado:</label>
                <input v-model="encuentro.resultado" type="text" required />
              </div>
              <div>
                <label for="tipo">Tipo:</label>
                <input v-model="encuentro.tipo" type="text" required />
              </div>
              <div>
                <label for="ubicacion">Ubicación:</label>
                <input v-model="encuentro.ubicacion" type="text" required />
              </div>
              <button type="submit">{{ isEditingEncuentro ? 'Actualizar Encuentro' : 'Agregar Encuentro' }}</button>
              <button type="button" @click="cancelarEdicionEncuentro">Cancelar</button>
            </form>

            <h3>Encuentros Existentes</h3>
            <div v-if="encuentros.length > 0">
              <div v-for="encuentro in encuentros" :key="encuentro.encuentroId" class="encuentro-card">
                <!-- <p>ID del Encuentros: {{ encuentro.encuentroId }}</p>
                <p>ID del Equipo: {{ encuentro.equipo }}</p>
                <p>ID del Torneo: {{ encuentro.torneo }}</p> -->
                <p>Fecha: {{ encuentro.fecha }}</p>
                <p>Col: {{ encuentro.encuentroscol }}</p>
                <p>Hora: {{ encuentro.hora }}</p>
                <p>Resultado: {{ encuentro.resultado }}</p>
                <p>Tipo: {{ encuentro.tipo }}</p>
                <p>Ubicación: {{ encuentro.ubicacion }}</p>
                <button @click="editarEncuentro(encuentro)">Editar</button>
                <button @click="eliminarEncuentro(encuentro)">Eliminar</button>
                <button @click="prepararAgregarEstadisticas(encuentro.Encuentro_id)">Agregar Estadísticas</button>
              </div>
            </div>
            <div v-else>
              <p>No hay encuentros registrados .</p>
            </div>
          </template>

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
              <!-- <h3>Agregar Pago</h3> -->
              <form @submit.prevent="agregarPago">
                <!-- <div>
                  
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
                    <option v-for="(categoria, index) in categoriaadmin" :key="index" :value="categoria">{{ categoria }}</option>
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
              </div> -->
                <!-- <button type="submit">Agregar</button> -->
                <button type="submit"@click="mostrarConsultaPagos">Consultar Pagos</button>
              </form>
            </template>
            <template  v-if="currentSection === 'consultaPagos'">
                <h2>Consulta de Pagos</h2>
                <div v-if="pagos && pagos.length > 0">
                  <ul>
                    <li  class="deportista-card"  v-for="pago in pagos" :key="pago.pagos_id">
                      Documento:{{ pago.inscripcion_documento }} - Monto: {{ pago.monto }} - Fecha: {{ pago.fecha }} - Categoría: {{ pago.categoria }}
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <p>No hay pagos disponibles.</p>
                </div>
                <button @click="regresar">Volver a Agregar Pago</button>
            </template>
              <template v-if="currentSection === 'agregarInscripcion'">
              <h3>Agregar Inscripción</h3>
              <form @submit.prevent="agregarInscripcion">
                <div>
                  <label for="categoria">Seleccionar Categoría:</label>
                  <select v-model="selectedCategory" @change="filtrarDeportistasPorCategoria" required>
                    <option value="" disabled>Seleccionar una categoría</option>
                    <option v-for="categoria in categoriasPermitidas" :key="categoria" :value="categoria">{{ categoria }}</option>
                  </select>
                </div>
                <div>
                  <label for="deportista">Seleccionar Deportista:</label>
                  <select v-model="nuevaInscripcion.inscripcion.documento" required>
                    <option value="" disabled>Seleccionar un deportista</option>
                    <option v-for="deportista in filteredDeportistas" :key="deportista.documento" :value="deportista.documento">
                      {{ deportista.nombre }} (Documento: {{ deportista.documento }})
                    </option>
                  </select>
                </div>
                <div>
                  <label for="equipoid">Seleccionar Equipo:</label>
                  <select v-model="nuevaInscripcion.equipo.equipoid" required>
                    <option value="" disabled>Seleccionar un equipo</option>
                    <option v-for="equipo in equipos" :key="equipo.equipoid" :value="equipo.equipoid">
                      {{ equipo.nombre }} (ID: {{ equipo.equipoid }})
                    </option>
                  </select>
                </div>
                  <button type="submit">Inscribir</button>
              </form>
              <h3>Inscripciones Existentes</h3>
              <div v-if="inscripciones.length > 0">
                  <ul>
                      <li v-for="inscripcion in inscripciones" :key="inscripcion.documento">
                          Equipo ID: {{ inscripcion.equipoid }} - Documento: {{ inscripcion.documento }}
                          <button @click="eliminarInscripcion(inscripcion)">Eliminar</button>
                      </li>
                  </ul>
              </div>
              <div v-else>
                  <p>No hay inscripciones registradas.</p>
              </div>
            	</template>
              <template v-if="currentSection === 'inventario'">
                <h2>Inventario</h2>
                <div v-for="producto in inventario" :key="producto.id" class="inventario-card">
                  <!-- <p>Producto: {{ producto.implementos }}</p> -->
                  <p>Producto: {{ producto.nombre }}</p>
                  <p>Descripción: {{ producto.descripcion }}</p>
                  <p>Cantidad: {{ producto.cantidad }}</p>
                  <button @click="abrirFormularioPrestamo(producto)">Préstamo</button>
                </div>

                <div v-if="formPrestamoVisible">
                  <h3>Formulario de Préstamo</h3>
                  <form @submit.prevent="realizarPrestamo">
                    <label for="usuarioDocumento">Documento del Usuario:</label>
                    <input type="number" v-model="Documento" required readonly />
                    

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
                <input type="number" v-model="usuarioDocumentoConsulta" readonly />

                <label for="implementosId">ID del Implemento:</label>
                <select type="number" v-model="implementosIdConsulta" required>
                  <option value="" disabled>Seleccionar un implemento</option>
                  <option v-for="implemento in inventario" :key="implemento.implementos" :value="implemento.implementos">
                    {{ implemento.nombre }} (ID: {{ implemento.implementos }})
                  </option>
                </select>

                <button @click="consultarPrestamo">Consultar</button>

                <div v-if="prestamo">
                  <h3>Detalles del Préstamo</h3>
                  <p>Usuario Documento: {{ usuarioDocumentoConsulta }}</p>
                  <p>ID Implemento: {{ implementosIdConsulta }}</p>
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
              <template v-if="currentSection === 'Equipos'">
              <h2>Equipos</h2>
              <h3>Equipos Existentes</h3>
              <div v-if="equipos.length > 0">
                <div v-for="equipo in equipos" :key="equipo.equipoid" class="equipo-card">
                  <p><strong>{{ equipo.nombre }}</strong></p>
                  <p>Categoría: {{ equipo.categoria }}</p>
                  <p>Fecha de Creación: {{ equipo.fechacreacion }}</p>
                  <p>Usuario: {{ equipo.usuario_id }}</p>
                  <p>ID: {{ equipo.equipoid }}</p>
                </div>
              </div>
              <div v-else>
                <p>No hay equipos registrados.</p>
              </div>
             
              
            </template>
            </div>
          </div>
  <div>
  </div>
        </div>
      </main>
      <footer class="footer-card">
    <div class="footer-content">
        <div class="social-icons">
            <a href="https://facebook.com" target="_blank" class="icon">
                <img src="./icons/icons8-facebook-nuevo-40.png" alt="Facebook">
            </a>
            <a href="https://instagram.com" target="_blank" class="icon">
                <img src="./icons/icons8-instagram-48.png" alt="Instagram">
            </a>
            <a href="https://twitter.com" target="_blank" class="icon">
                <img src="./icons/icons8-twitter-48.png" alt="Twitter">
            </a>
        </div>
        <div class="contact-info">
            <a href="mailto:Clubindependietecef@Gmail.com" class="info-item">
                <i class="fas fa-envelope"></i> Clubindependietecef@Gmail.com
            </a>
            <a href="tel:3138683102" class="info-item">
                <i class="fas fa-phone"></i> 3138683102
            </a>
            <p class="info-item">
                <i class="fas fa-map-marker-alt"></i> Villa de sol , Funza Cundinamarca
            </p>
        </div>
    </div>
</footer>
    </div>
  </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        usuario: {
            documento: '', // Asegúrate de que esto esté inicializado
        },
        prestamo: {
            implemento: {
                implementos: '' 
            },
            usuario: {
                documento: '' // Asegúrate de que esto esté inicializado
            },
        },
        implementosDisponibles: {},
        estadistica: {
        encuentros_encuentro_id:0,
        id:0,
        asistencias: 0,
        corners: 0,
        faltas: 0,
        goles: 0,
        penales: 0,
        tarjetasamarillas: 0,
        tarjetasrojas: 0,
        tirolibres: 0,
      },
      estadisticas: [],
      isEditingEstadistica: false,
      estadisticaEditada: null,
      selectedEncuentroId: null,
      encuentro: {
        equipo: { equipoid: '' }, 
        fecha: '',
        torneo: { torneo_id: '' }, 
        encuentroscol: '',
        hora: '',
        resultado: '',
        tipo: '',
        ubicacion: ''
        },
    encuentros: [],
    isEditingEncuentro: false,
    encuentroEditado: null,
        selectedEquipoId: '',
        nuevaInscripcion: {
            equipoid: '',
            documento: ''
        },
        nuevaInscripcion: {
            equipo: {
                equipoid: '' // Inicializa como cadena vacía
            },
            inscripcion: {
                documento: '' // Inicializa como cadena vacía
            },
            id: ''
        },
        inscripciones: [],
        inscripcion_documento:'',
        monto : '',
        pagos_id : '',
        categoria : '',
        descripcion : '',
        tipo : '',
        equipoid:'',
        nombre: '',
        categoria: '',
        fechacreacion: '',
        usuario_id: '',
        equipos: [],
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
        pagos: [], 
        selectedCategory: '',
        categoriasPermitidas: ['Sub 7', 'Sub 9', 'Sub 11', 'Sub 13', 'Sub 15', 'Sub 17', 'Sub 20', 'Elite'], // Categorías permitidas
        formPrestamoVisible: false,
        usuarioDocumento: '',
        usuario: {
            documento: '', // Asegúrate de que esto esté inicializado
        },
        prestamo: {
            implemento: {
                implementos: '' 
            },
            usuario: {
                documento: '' // Asegúrate de que esto esté inicializado
            },
        },
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
      prepararAgregarEstadisticas(encuentroId) {
    // Verifica que el ID sea válido
    if (!encuentroId) {
        console.error('ID de encuentro no proporcionado');
        Swal.fire('Error', 'No se ha seleccionado un encuentro válido', 'error');
        return;
    }
    
    this.selectedEncuentroId = encuentroId;
    this.currentSection = 'estadisticas';
    this.limpiarFormularioEstadistica();
    this.consultarEstadisticas(encuentroId);
},
async agregarEstadistica() {
    try {
        if (!this.selectedEncuentroId) {
            throw new Error('No se ha seleccionado un encuentro');
        }

        const estadisticaData = {
            encuentros_encuentro_id: this.selectedEncuentroId,
            asistencias: this.estadistica.asistencias,
            corners: this.estadistica.corners,
            faltas: this.estadistica.faltas,
            goles: this.estadistica.goles,
            penales: this.estadistica.penales,
            tarjetasamarillas: this.estadistica.tarjetasamarillas,
            tarjetasrojas: this.estadistica.tarjetasrojas,
            tirolibres: this.estadistica.tirolibres
        };

        console.log('Enviando estadísticas:', estadisticaData);

        const response = await fetch(`https://proyecto-cef-backend-production.up.railway.app/insertarEstadisticas/${this.selectedEncuentroId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(estadisticaData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al agregar estadísticas');
        }

        const nuevaEstadistica = await response.json();
        this.estadisticas.push(nuevaEstadistica);
        
        Swal.fire('Éxito', 'Estadísticas agregadas correctamente', 'success');
        this.limpiarFormularioEstadistica();
        
    } catch (error) {
        console.error('Error al agregar estadísticas:', {
            error: error.message,
            selectedEncuentroId: this.selectedEncuentroId,
            estadisticaData: this.estadistica
        });
        Swal.fire('Error', error.message, 'error');
    }
},
    limpiarFormularioEstadistica() {
        this.estadistica = {
            id:0,
            asistencias: 0,
            corners: 0,
            faltas: 0,
            goles: 0,
            penales: 0,
            tarjetasamarillas: 0,
            tarjetasrojas: 0,
            tirolibres: 0,
        };
    },
    obtenerFechaHoy() {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
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
          const response = await fetch('https://proyecto-cef-backend-production.up.railway.app/insertarPago', {
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
  try {
    const response = await fetch('https://proyecto-cef-backend-production.up.railway.app/consultarPago');
    if (!response.ok) {
      throw new Error('Error al consultar los pagos');
    }
    const data = await response.json(); // Asignar los pagos obtenidos
    console.log('Datos recibidos:', data); // Log para depuración
    this.pagos = data; // Asignar los pagos obtenidos
  } catch (error) {
    console.error('Error al consultar pagos:', error.message);
    Swal.fire('Error!', `No se pudieron obtener los pagos: ${error.message}`, 'error');
  }
},
async consultarEstadisticas(encuentroId) {
    try {
        if (!encuentroId) {
            throw new Error('ID de encuentro no válido');
        }

        const response = await fetch(`https://proyecto-cef-backend-production.up.railway.app/consultarEstadisticas/${encuentroId}`);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'En este momento no hay estadisticas porfavor ingreselas');
        }

        this.estadisticas = await response.json();
        console.log('Estadísticas cargadas:', this.estadisticas);
    } catch (error) {
        console.error('Error al consultar estadísticas:', {
            error: error.message,
            encuentroId,
            stack: error.stack
        });
        Swal.fire('Error', `No se pudieron cargar las estadísticas: ${error.message}`, 'error');
        this.estadisticas = []; // Limpiar estadísticas en caso de error
    }
},

    async actualizarEstadistica() {
        try {
            const response = await fetch(`https://proyecto-cef-backend-production.up.railway.app/actualizarEstadisticas/${this.estadisticaEditada.encuentros_encuentro_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.estadisticaEditada),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar las estadísticas');
            }

            const estadisticaActualizada = await response.json();
            const index = this.estadisticas.findIndex(est => est.encuentros_encuentro_id === estadisticaActualizada.encuentros_encuentro_id);
            this.$set(this.estadisticas, index, estadisticaActualizada);
            Swal.fire('Éxito', 'Estadísticas actualizadas correctamente', 'success');
            this.cancelarEdicionEstadistica();

        } catch (error) {
            console.error('Error al actualizar las estadísticas:', error);
            Swal.fire('Error', error.message, 'error');
        }
    },

    async eliminarEstadistica(encuentro_id) {
        const confirmar = await Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar las estadísticas del encuentro ${encuentro_id}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (confirmar.isConfirmed) {
            try {
                const response = await fetch(`https://proyecto-cef-backend-production.up.railway.app/eliminarEstadisticas/${encuentro_id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar las estadísticas');
                }

                Swal.fire('Eliminado!', 'Las estadísticas han sido eliminadas.', 'success');
                this.estadisticas = this.estadisticas.filter(est => est.encuentros_encuentro_id !== encuentro_id); // Actualiza la lista

 } catch (error) {
                console.error('Error al eliminar estadísticas:', error);
                Swal.fire('Error', error.message, 'error');
            }
        }
    },

    limpiarFormularioEstadistica() {
        this.estadistica = {
            asistencias: 0,
            corners: 0,
            faltas: 0,
            goles: 0,
            penales: 0,
            tarjetasamarillas: 0,
            tarjetasrojas: 0,
            tirolibres: 0,
        };
    },

    cancelarEdicionEstadistica() {
        this.isEditingEstadistica = false;
        this.estadisticaEditada = null;
    },

    editarEstadistica(est) {
        this.estadisticaEditada = { ...est };
        this.isEditingEstadistica = true;
    },
    async agregarEncuentro() {
  try {
    // Transformar los datos si es necesario
    const datosBackend = {
      equipo_equipoid: this.encuentro.equipo.equipoid,
      torneo_torneo_id: this.encuentro.torneo.torneo_id,
      fecha: this.encuentro.fecha,
      encuentroscol: this.encuentro.encuentroscol,
      hora: this.encuentro.hora,
      resultado: this.encuentro.resultado,
      tipo: this.encuentro.tipo,
      ubicacion: this.encuentro.ubicacion
    };

    const response = await fetch('https://proyecto-cef-backend-production.up.railway.app/insertarEncuentro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosBackend),
    });

    console.log('Datos enviados:', datosBackend);

    if (!response.ok) {
      const errorData = await response.json(); // Capturar el mensaje de error del backend
      throw new Error(errorData.detail || 'Error al agregar el encuentro');
    }

    const nuevoEncuentro = await response.json();
    this.encuentros.push(nuevoEncuentro);
    Swal.fire({
  title: 'Éxito',
  text: 'Encuentro agregado correctamente',
  icon: 'success',
  confirmButtonText: 'OK'
}).then((result) => {
  if (result.isConfirmed) {
    window.location.reload();
  }
});
    this.limpiarFormularioEncuentro(); // Método para limpiar el formulario

  } catch (error) {
    console.error('Error al agregar el encuentro:', error);
    Swal.fire('Error', error.message, 'error');
  }
},

  async fetchEncuentros() {
    try {
      const response = await fetch('https://proyecto-cef-backend-production.up.railway.app/consultarEncuentros');
      if (!response.ok) {
        throw new Error('Error al obtener los encuentros');
      }
      this.encuentros = await response.json();
    } catch (error) {
      console.error('Error al consultar encuentros:', error);
    }
  },
// Método corregido
editarEncuentro(encuentro) {
  const id = encuentro.encuentro_id || encuentro.id || encuentro.Encuentro_id;
    
    if (!id) {
        Swal.fire('Error', 'No se pudo identificar el ID del encuentro', 'error');
        return;
    }

    this.encuentroEditado = {
        ...encuentro,
        encuentro_id: id // Asegúrate de tener el ID correcto
    };

    this.isEditingEncuentro = true;
    
    // Asegúrate que estos campos coinciden con tu estructura de datos real
    this.encuentro = {
        equipo: { equipoid: encuentro.equipo_equipoid || encuentro.equipo?.equipoid },
        torneo: { torneo_id: encuentro.torneo_torneo_id || encuentro.torneo?.torneo_id },
        fecha: encuentro.fecha,
        encuentroscol: encuentro.encuentroscol,
        hora: encuentro.hora,
        resultado: encuentro.resultado,
        tipo: encuentro.tipo,
        ubicacion: encuentro.ubicacion
    };
},
  cancelarEdicionEncuentro() {
    this.isEditingEncuentro = false; // Cambia el estado a no edición
    this.encuentroEditado = {}; // Restablece el objeto de encuentro editado
},
async actualizarEncuentro() {
    try {
        // Verifica que tenemos un ID válido
        if (!this.encuentroEditado?.encuentro_id) {
            throw new Error('ID de encuentro no válido');
        }

        const datosActualizados = {
            equipo_equipoid: this.encuentro.equipo.equipoid,
            torneo_torneo_id: this.encuentro.torneo.torneo_id,
            fecha: this.encuentro.fecha,
            encuentroscol: this.encuentro.encuentroscol,
            hora: this.encuentro.hora,
            resultado: this.encuentro.resultado,
            tipo: this.encuentro.tipo,
            ubicacion: this.encuentro.ubicacion
        };

        console.log('Enviando datos:', datosActualizados); // Depuración

        const response = await fetch(`https://proyecto-cef-backend-production.up.railway.app/actualizarEncuentro/${this.encuentroEditado.encuentro_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosActualizados),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Detalles del error:', errorData);
            throw new Error(errorData.message || 'Error al actualizar el encuentro');
        }

        const encuentroActualizado = await response.json();
        console.log('Respuesta del servidor:', encuentroActualizado);

        // Actualiza la lista local
        const index = this.encuentros.findIndex(e => e.encuentro_id === this.encuentroEditado.encuentro_id);
        if (index !== -1) {
            this.encuentros.splice(index, 1, encuentroActualizado);
        }

        Swal.fire('Éxito', 'Encuentro actualizado correctamente', 'success');
        this.cancelarEdicionEncuentro();

    } catch (error) {
        console.error('Error completo:', error);
        Swal.fire('Error', error.message, 'error');
    }
},

  async eliminarEncuentro(encuentro) {
    const confirmar = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el encuentro del torneo ${encuentro.torneo_torneo_id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmar.isConfirmed) {
      try {
        const response = await fetch(`https://proyecto-cef-backend-production.up.railway.app/eliminarEncuentro/${encuentro.Encuentro_id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el encuentro');
        }

        Swal.fire('Eliminado!', 'El encuentro ha sido eliminado.', 'success');
        await this.fetchEncuentros(); // Refresca la lista de encuentros después de eliminar

      } catch (error) {
        console.error('Error al eliminar el encuentro:', error);
        Swal.fire('Error', error.message, 'error');
      }
    }
  },
  limpiarFormularioEncuentro() {
    this.encuentro = {
      equipo_equipoid: '',
      fecha: '',
      torneo_torneo_id: '',
      encuentroscol: '',
      hora: '',
      resultado: '',
      tipo: '',
      ubicacion: ''
    };
  },
  cancelarEdicionEncuentro() {
    this.isEditingEncuentro = false;
    this.encuentroEditado = null;
  },
    editarUsuario() {
        this.isEditing = true; 
    },
    cancelarEdicion() {
        this.isEditing = false; 
    },
    async actualizarUsuario() {
  const documento = this.Documento;
  try {
    const response = await fetch(`https://proyecto-cef-backend-production.up.railway.app/ActualizarUsuario/${documento}`, {
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
    const prestamoAEliminarResponse = await fetch(`https://proyecto-cef-backend-production.up.railway.app/consultarPrestamo/${this.usuarioDocumentoConsulta}/${this.implementosIdConsulta}`);
    const prestamoAEliminar = await prestamoAEliminarResponse.json();

    const response = await fetch(`https://proyecto-cef-backend-production.up.railway.app/eliminarPrestamo/${this.usuarioDocumentoConsulta}/${this.implementosIdConsulta}`, {
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
      const response = await fetch(`https://proyecto-cef-backend-production.up.railway.app/consultarPrestamo/${this.usuarioDocumentoConsulta}/${this.implementosIdConsulta}`);
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
    const response = await fetch(`https://proyecto-cef-backend-production.up.railway.app/actualizarPrestamo/${this.usuarioDocumentoConsulta}/${this.implementosIdConsulta}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    cantidad: this.nuevaCantidad,
    estado: this.nuevoEstado, // Solo estos dos campos
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
async agregarInscripcion() {
  try {
    // Asegúrate de que los datos tengan la estructura correcta
    const datosAEnviar = {
      equipoid: this.nuevaInscripcion.equipo.equipoid,
      documento: this.nuevaInscripcion.inscripcion.documento,
    };

    console.log('Datos a enviar:', datosAEnviar); // Depuración: Verifica los datos antes de enviar

    const response = await fetch('https://proyecto-cef-backend-production.up.railway.app/insertarEquipoInscripcion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosAEnviar), // Envía la estructura correcta
    });

    console.log('Respuesta del servidor:', response); // Depuración: Verifica la respuesta del servidor

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error del servidor:', errorData); // Depuración: Verifica el error del servidor
      throw new Error(errorData.detail || 'Error al agregar la inscripción');
    }

    const nuevaInscripcion = await response.json();
    console.log('Inscripción agregada:', nuevaInscripcion); // Depuración: Verifica la inscripción agregada

    Swal.fire({
  title: 'Éxito',
  text: 'Inscripción agregada correctamente',
  icon: 'success',
  confirmButtonText: 'OK'
}).then((result) => {
  if (result.isConfirmed) {
    window.location.reload();
  }
});

this.inscripciones.push(nuevaInscripcion); 
this.resetInscripcionForm();
  } catch (error) {
    console.error('Error al agregar inscripción:', error); // Depuración: Captura cualquier error no esperado
    Swal.fire('Error', error.message, 'error');
  }
},

resetInscripcionForm() {
    this.nuevaInscripcion = { equipoid: '', documento: '' }; 
},
async consultarInscripcionesPorEquipo() {
  try {
    const response = await fetch(`https://proyecto-cef-backend-production.up.railway.app/consultarEquipoInscripcion/${this.selectedEquipoId}`);
    if (!response.ok) throw new Error('Error al cargar inscripciones');
    
    const data = await response.json();
    this.inscripciones = Array.isArray(data) ? data : []; // ✅ Fuerza a ser array
  } catch (error) {
    console.error("Error al cargar inscripciones:", error);
    this.inscripciones = []; // ✅ Si falla, asigna array vacío
  }
},
async eliminarInscripcion(inscripcion) {
    const confirmar = await Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar la inscripción para el equipo ${inscripcion.equipoid}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });
    if (confirmar.isConfirmed) {
        try {
            const response = await fetch('https://proyecto-cef-backend-production.up.railway.app/eliminarEquipoInscripcion', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inscripcion),
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la inscripción');
            }

            Swal.fire({
  title: 'Eliminado',
  text: 'Eliminado correctamente',
  icon: 'success',
  confirmButtonText: 'OK'
}).then((result) => {
  if (result.isConfirmed) {
    window.location.reload();
  }
});
this.inscripciones = this.inscripciones.filter(i => i.documento !== inscripcion.documento); 
        } catch (error) {
            console.error('Error al eliminar inscripción:', error);
            Swal.fire('Error', error.message, 'error');
        }
    }
},
async eliminarUsuario() {
  // Confirmación inicial antes de eliminar el usuario
  const { isConfirmed } = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'Recuerda que si tiene préstamos con implementos se eliminarán también.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
  });

  if (!isConfirmed) {
    return; // Si el usuario cancela, no hacer nada
  }

  try {
    const response = await fetch(`https://proyecto-cef-backend-production.up.railway.app/EliminarUsuario/${this.Documento}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      // Verificar si el error es un 500
      if (response.status === 500) {
        const errorMessage = 'No puedes eliminar este usuario porque está asociado con un encuentro.';
        
        // Mostrar un SweetAlert con dos opciones: eliminar el encuentro o no eliminar al usuario
        const { isConfirmed: eliminarEncuentro } = await Swal.fire({
          title: 'Error al eliminar el usuario',
          text: `${errorMessage} ¿Deseas eliminar el encuentro asociado?`,
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'Eliminar Encuentro',
          cancelButtonText: 'No eliminar',
        });

        if (eliminarEncuentro) {
          // Llamada a la API para eliminar el encuentro
          const eliminarEncuentroResponse = await fetch(`https://proyecto-cef-backend-production.up.railway.app/EliminarEncuentro/${this.Documento}`, {
            method: 'DELETE',
        });

          if (eliminarEncuentroResponse.ok) {
            // Si el encuentro fue eliminado con éxito, intentar eliminar el usuario
            const eliminarUsuarioResponse = await fetch(`https://proyecto-cef-backend-production.up.railway.app/EliminarUsuario/${this.Documento}`, {
              method: 'DELETE',
            });

            if (eliminarUsuarioResponse.ok) {
              Swal.fire({
                title: 'Éxito',
                text: 'Usuario y encuentro eliminados con éxito.',
                icon: 'success',
              });
              localStorage.clear();
              this.$router.push('/login');
            } else {
              Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al eliminar el usuario.',
                icon: 'error',
              });
            }
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al eliminar el encuentro asociado.',
              icon: 'error',
            });
          }
        } else {
          Swal.fire({
            title: 'Cancelado',
            text: 'El usuario no fue eliminado.',
            icon: 'info',
          });
        }
      } else {
        // Si no hubo error 500, se elimina el usuario con éxito
        Swal.fire({
          title: 'Éxito',
          text: 'Usuario eliminado con éxito.',
          icon: 'success',
        });
        localStorage.clear();
        this.$router.push('/login');
      }
    }
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    Swal.fire({
      title: 'Error',
      text: error.message,
      icon: 'error',
    });
  }
},
 async fetchInventario() {
    try {
      const response = await fetch('https://proyecto-cef-backend-production.up.railway.app/consultarImplementos');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.inventario = await response.json();
      // Inicializar la disponibilidad de implementos
      this.inventosDisponibles = this.inventario.reduce((acc, item) => {
        acc[item.id] = item.cantidad; // Almacena la cantidad de cada implemento
        return acc;
      }, {});
    } catch (error) {
      console.error('Error al consultar inventario:', error);
    }
  },
  async realizarPrestamo() {
    // Confirmar con el usuario antes de proceder
    const confirmar = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas realizar el préstamo?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, realizar',
        cancelButtonText: 'Cancelar',
    });

    if (!confirmar.isConfirmed) {
        return; // Cancelar si el usuario no confirma
    }

    try {
        // Verificar que los datos necesarios estén presentes
        if (!this.Documento|| !this.productoSeleccionado.implementos || !this.cantidadPrestamo || !this.estado) {
            throw new Error('Faltan datos necesarios para realizar el préstamo.');
        }

        // Realizar la solicitud HTTP para crear el préstamo
        const response = await fetch('https://proyecto-cef-backend-production.up.railway.app/insertarPrestamo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usuario_documento: this.Documento,
                implementos_inventario_id: this.productoSeleccionado.implementos,
                cantidad: this.cantidadPrestamo,
                fechadepresta: new Date().toISOString().slice(0, 10),
                estado: this.estado,
            }),
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear el préstamo');
        }

        // Cerrar el formulario y notificar al usuario
        this.cerrarFormularioPrestamo();
        await Swal.fire('Éxito', 'Préstamo realizado con éxito.', 'success');
    } catch (error) {
        console.error('Error al realizar el préstamo:', error);
        await Swal.fire('Error', error.message || 'Ocurrió un error al procesar el préstamo.', 'error');
    }
},

      async fetchDeportistas() {
        try {
          const response = await fetch('https://proyecto-cef-backend-production.up.railway.app/ConsultarJugadores');
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
        this.prestamo.usuario.documento = this.Documento; 
      },
      cerrarFormularioPrestamo() {
        this.formPrestamoVisible = false;
        this.usuarioDocumento = '';
        this.cantidadPrestamo = 0;
        this.productoSeleccionado = null;
      },
  async fetchEquipos() {
  try {
    const response = await fetch('https://proyecto-cef-backend-production.up.railway.app/consultarEquipos');
    if (!response.ok) {
      throw new Error('Error al consultar equipos');
    }
    this.equipos = await response.json();
  } catch (error) {
    console.error('Error al consultar equipos:', error);
  }
},
async fetchTorneos() {
    try {
      const response = await fetch('https://proyecto-cef-backend-production.up.railway.app/consultarTorneos');
      if (!response.ok) {
        throw new Error('Error al consultar torneos');
      }
      this.torneos = await response.json();
    } catch (error) {
      console.error('Error al consultar torneos:', error);
    }
  },

    },
    mounted() {
    this.fetchTorneos()
    this.fetchEncuentros();
    this.consultarInscripcionesPorEquipo();
    this.fetchEquipos();
    this.fetchDeportistas();
    this.fetchInventario();
    this.Documento = localStorage.getItem('Documento');  
    this.usuarioDocumentoConsulta = this.Documento;
    this.nombreAdmin = localStorage.getItem('nombreusuario') || 'Nombre no disponible';
    this.emailAdmin = localStorage.getItem('emailusuario') || 'Email no disponible';
    this.usuario = localStorage.getItem('usuario') || 'usuario no disponible';
    this.rolusuario = localStorage.getItem('rolusuario') || 'rol no disponible';
    this.telefonousuario = localStorage.getItem('telefonousuario') || 'telefono no disponible';
    this.fotoAdmin = localStorage.getItem('fotoAdmin') || '';
    }
  };
  </script>
  <style scoped src="/src/assets/estilos_Entrenador.css">

  </style>