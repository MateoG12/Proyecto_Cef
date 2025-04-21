<template>
  <div class="body">
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
            <button @click="currentSection = 'Equipos'">Equipos</button>
            <button @click="currentSection = 'agregarInscripcion'">Agregar a equipo</button>
            <button @click="currentSection = 'Torneo'">Torneo</button>
            <!-- <button @click="currentSection = 'encuentros'">Encuentros</button> -->
            
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
            <template v-if="currentSection === 'estadisticas'">
              <h2>Agregar Estadísticas para el Encuentro ID: {{ selectedEncuentroId }}</h2>
              <form @submit.prevent="agregarEstadistica">
                  <div>
                      <label for="asistencias">ID</label>
                      <input v-model="estadistica.id" type="number" required />
                  </div>
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
              
            <template v-if="currentSection === 'Torneo'">
              <h2>Torneos</h2>

              <h3>Agregar Nuevo Torneo</h3>
              <form @submit.prevent="agregarTorneo">
                <div>
                  <!-- <label for="torneo_id">ID del torneo:</label>
                  <input v-model="torneo.torneo_id" type="text" placeholder="ID del torneo" required /> -->
                </div>
                <div>
                  <label for="nombreTorneo">Nombre del Torneo:</label>
                  <input v-model="torneo.nombre" type="text" placeholder="Nombre del torneo" required />
                </div>
                <div>
                  <label for="tipoTorneo">Tipo:</label>
                  <input v-model="torneo.tipo" type="text" placeholder="Tipo del torneo" required />
                </div>
                <div>
                  <label for="ubicacionTorneo">Ubicación:</label>
                  <input v-model="torneo.ubicacion" type="text" placeholder="Ubicación del torneo" required />
                </div>
                <button type="submit">Agregar Torneo</button>
              </form>
              <h3>Torneos Existentes</h3>
              <div v-if="torneos.length > 0">
                <div v-for="torneo in torneos" :key="torneo.torneo_id" class="torneo-card">
                  <p><strong>{{ torneo.nombre }}</strong></p>
                  <p>Tipo: {{ torneo.tipo }}</p>
                  <p>Ubicación: {{ torneo.ubicacion }}</p>
                  <p>ID: {{ torneo.torneo_id }}</p>
                  <button @click="editarTorneo(torneo)">Editar</button>
                  <button @click="eliminarTorneo(torneo)">Eliminar</button>
                </div>
              </div>
              <div v-else>
                <p>No hay torneos registrados.</p>
              </div>
              <!-- Formulario para editar torneo -->
              <template v-if="isEditingTorneo">
                <h3>Editar Torneo</h3>
                <form @submit.prevent="actualizarTorneo">
                  <div>
                    <label for="nombreTorneo">Nombre del Torneo:</label>
                    <input v-model="torneoEditado.nombre" type="text" required />
                  </div>
                  <div>
                    <label for="tipoTorneo">Tipo:</label>
                    <input v-model="torneoEditado.tipo" type="text" required />
                  </div>
                  <div>
                    <label for="ubicacionTorneo">Ubicación:</label>
                    <input v-model="torneoEditado.ubicacion" type="text" required />
                  </div>
                  <button type="submit">Actualizar Torneo</button>
                  <button type="button" @click="cancelarEdicionTorneo">Cancelar</button>
                </form>
              </template>
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
      <li v-for="inscripcion in inscripciones" :key="inscripcion.id">
        Equipo ID: {{ inscripcion.equipoid }} - Documento: {{ inscripcion.documento }}
        <button @click="eliminarInscripcion(inscripcion)">Eliminar</button>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>No hay inscripciones registradas.</p>
  </div>
</template>
            
            <template v-if="currentSection === 'Equipos'">
              <h2>Equipos</h2>

              <h3>Agregar Nuevo Equipo</h3>
              <form @submit.prevent="agregarEquipo">
                
                <div>
                  <label for="nombre">Nombre del Equipo:</label>
                  <input v-model="nombre" type="text" placeholder="Nombre del equipo" required />
                </div>
                <div>
                  <label for="categoria">Categoría:</label>
                  <input v-model="categoria" type="text" placeholder="Categoría del equipo" required />
                </div>
                <div>
                  <label for="fechaCreacion">Fecha de Creación:</label>
                  <input type="date" v-model="fecha" readonly />
                </div>
                <div>
                  <label for="usuarioDocumento">ID Usuario:</label>
                  <select v-model="entrenador.Documento" required>
                  <option value="" disabled>Seleccionar un Entrenador</option>
                  <option v-for="entrenador in entrenadores" :key="entrenador.Documento" :value="entrenador.Documento">
                    {{ entrenador.nombre }} (Documento: {{ entrenador.Documento }})
                  </option>
                </select>
                </div>
                <button type="submit">Agregar Equipo</button>
              </form>

              <h3>Equipos Existentes</h3>
              <div v-if="equipos.length > 0">
                <div v-for="equipo in equipos" :key="equipo.equipoid" class="equipo-card">
                  <p><strong>{{ equipo.nombre }}</strong></p>
                  <p>Categoría: {{ equipo.categoria }}</p>
                  <p>Fecha de Creación: {{ equipo.fechacreacion }}</p>
                  <!-- <p>Usuario: {{ equipo.usuario.documento }}</p> -->
                  <p>ID: {{ equipo.equipoid }}</p>
                  
                  <button @click="editarEquipo(equipo)">Editar</button>
                  <button @click="eliminarEquipo(equipo)">Eliminar</button>
                </div>
              </div>
              <div v-else>
                <p>No hay equipos registrados.</p>
              </div>
              <!-- Formulario para editar equipo -->
              <template v-if="isEditingEquipo">
                <h3>Editar Equipo</h3>
                <form @submit.prevent="actualizarEquipo">
                  <div>
                    <label for="nombre">Nombre del Equipo:</label>
                    <input v-model="equipoEditado.nombre" type="text" required />
                  </div>
                  <div>
                    <label for="categoria">Categoría:</label>
                    <input v-model="equipoEditado.categoria" type="text" required />
                  </div>
                  <div>
                    <label for="fechaCreacion">Fecha de Creación:</label>
                    <input v-model="equipoEditado.fechacreacion" type="date" required />
                  </div>
                  <div>
                    <label for="usuarioDocumento">ID Usuario:</label>
                    <input v-model="equipoEditado.usuario_id" type="number" required />
                  </div>
                  <button type="submit">Actualizar Equipo</button>
                  <button type="button" @click="cancelarEdicionEquipo">Cancelar</button>
                </form>
              </template>
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
            <template v-if="currentSection === 'encuentros'">
            <h2>Encuentros</h2>
            <h3>Agregar Nuevo Encuentro</h3>
            <form @submit.prevent="isEditingEncuentro ? actualizarEncuentro() : agregarEncuentro()">
              <div>
                <label for="equipo_equipoid">ID del Equipo:</label>
                <input v-model="encuentro.equipo_equipoid" type="text" required />
              </div>
              <div>
                <label for="fecha">Fecha:</label>
                <input v-model="encuentro.fecha" type="date" required />
              </div>
              <div>
                <label for="torneo_torneo_id">ID del Torneo:</label>
                <input v-model="encuentro.torneo_torneo_id" type="text" required />
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
              <div v-for="encuentro in encuentros" :key="encuentro.Encuentro_id" class="encuentro-card">
                <p>ID del Equipo: {{ encuentro.Encuentro_id}}</p>
                <p>ID del Equipo: {{ encuentro.equipo_equipoid }}</p>
                <p>Fecha: {{ encuentro.fecha }}</p>
                <p>ID del Torneo: {{ encuentro.torneo_torneo_id }}</p>
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
              <p>No hay encuentros registrados.</p>
            </div>
            </template>
            <template v-if="currentSection === 'pagos'">
              <h2>Pagos</h2>
              <h3>Agregar Pago</h3>
              <form @submit.prevent="agregarPago">
                <div>
                  <!-- Campo de fecha automático -->
                  <input type="date" v-model="fecha" readonly />
                </div>
                <!-- <div>
                  <input type="number" placeholder="Inscripción Documento" v-model="inscripcion_documento" required />
                </div> -->
                <div>
                  <input type="number" placeholder="Monto" v-model="monto" required />
                </div>
                <!-- <div>
                  <input type="number" placeholder="ID de Pago" v-model="pagos_id" required />
                </div> -->
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
                      Documento:{{ pago.inscripcion_documento }} - Monto: {{ pago.monto }} - Fecha: {{ pago.fecha }} - Categoría: {{ pago.categoria }}
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <p>No hay pagos disponibles.</p>
                </div>
                <button @click="regresar">Volver a Agregar Pago</button>
            </template>
            <template v-if="currentSection === 'inventario'">
              <h2>Inventario</h2>
              <h3>Agregar Producto</h3>
              <form @submit.prevent="agregarProducto">
                <button @click="descargarInventario(producto)">Descargar</button>
                <!-- <input v-model="nuevoProducto.implementos" placeholder="Id invetario" required /> -->
                <input v-model="nuevoProducto.nombre" placeholder="Nombre del Producto" required />
                <input v-model="nuevoProducto.descripcion" placeholder="Descripción" required />
                <input v-model="nuevoProducto.cantidad" type="number" placeholder="Cantidad" required />
                <button type="submit">Agregar</button>
              </form>

              <div v-for="producto in inventario" :key="producto.id" class="inventario-card">
                <p>ID: {{ producto.implementos }}</p>
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
          </div>
        </div>

        <div>
          <div class="menu-toggle" @click="toggleMenu">
            <span class="bar" v-for="bar in 3" :key="bar"></span>
          </div>
          <nav class="internal-menu">
            <ul class="admin-menu">
              <li><router-link to="/admin/EmailVerification">Agregar verificacion</router-link></li>
            </ul>
          </nav>
          <router-view></router-view>
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
const URL2='http://127.0.0.1:8000'
const URL='https://proyecto-cef-backend-production.up.railway.app'
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
export default {
  data() {
    return {
    entrenadores: [],
    entrenador: {
      Documento: '' 
    },
    id:'',
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
      Encuentro_id:'',
      equipo_equipoid: '',
      fecha: '',
      torneo_torneo_id: '',
      encuentroscol: '',
      hora: '',
      resultado: '',
      tipo: '',
      ubicacion: ''
    },
    encuentros: [],
    isEditingEncuentro: false,
    encuentroEditado: null,
      torneo: {
        // torneo_id: '',
        nombre: '',
        tipo: '',
        ubicacion: ''
      },
      torneos: [],
      torneoEditado: null, 
      isEditingTorneo: false, 
      selectedEquipoId: '',
      nuevaInscripcion: {
        equipoid: null, 
        documento: null, 
      },
      inscripcion: {
                equipo: {
                    equipoid: null // Inicializa como cadena vacía
                },
                inscripcion: {
                    documento: null // Inicializa como cadena vacía
                },
                id:''
            },
      nuevaInscripcion: {
                equipo: {
                    equipoid: null // Inicializa como cadena vacía
                },
                inscripcion: {
                    documento: null // Inicializa como cadena vacía
                },
                id:''
            },
      inscripciones: [],
      nombre: '',
      categoria: '',
      fechaCreacion: '',
      usuario: 0,
      equipoEditado: null,
      isEditingEquipo: false,
      equipos: [],
      fecha: this.obtenerFechaHoy(), 
      inscripcion_documento : '',
      pago: {
      inscripcion: {
        documento: ''  // Inicializa el campo inscripcion.documento
      }
    },
      monto : '',
      //pagos_id : '',
      categoria : '',
      descripcion : '',
      tipo : '',
      Documento: 0,
      nombreAdmin: '',
      emailAdmin: '',
      usuario: 0,
      rolusuario: '',
      telefonousuario: '',
      fotoAdmin: '',
      isEditing: null, 
      nombreAdmin: '',
      emailAdmin: '',
      usuario:0,
      rolusuario: '',
      telefonousuario: '',
      fotoAdmin:'',
      menuActive: false,
      currentSection: 'deportista',
      deportistas: [],
      pagos: [], 
      Formadepago:['Nequi','Bancolombia','PSE'],
      selectedCategory: '',
      editingDeportista: null,
      categoriasPermitidas: ['Sub7', 'Sub9', 'Sub 11', 'Sub13', 'Sub15', 'Sub17', 'Sub20', 'Elite'],
      categoriaadmin:['Administrador'],
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
    async fetchEntrenadores() {
  try {
    const response = await fetch(`${URL}/usuario/porRol?rol=Entrenador`); 
    if (!response.ok) {
      throw new Error('Error al obtener los entrenadores');
    }
    this.entrenadores = await response.json(); // Almacena la lista de entrenadores
  } catch (error) {
    console.error('Error al obtener entrenadores:', error);
  }
},
    prepararAgregarEstadisticas(encuentro_id) {
        this.selectedEncuentroId = encuentro_id; // Guardar el ID del encuentro
        this.currentSection = 'estadisticas'; // Cambiar la sección a estadísticas
        this.limpiarFormularioEstadistica(); // Limpiar el formulario
        this.consultarEstadisticas(encuentro_id);
    },
    async agregarEstadistica() {
    const estadisticaData = {
        encuentros_encuentro_id:this.selectedEncuentroId,
        id:this.estadistica.id,
        asistencias: this.estadistica.asistencias,
        corners: this.estadistica.corners,
        faltas: this.estadistica.faltas,
        goles: this.estadistica.goles,
        penales: this.estadistica.penales,
        tarjetasamarillas: this.estadistica.tarjetasamarillas,
        tarjetasrojas: this.estadistica.tarjetasrojas,
        tirolibres: this.estadistica.tirolibres,
    };

  
    try {
        // Cambia la URL aquí
        const response = await fetch(`${URL}/insertarEstadisticas/${this.selectedEncuentroId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(estadisticaData),
        });

        if (!response.ok) {
            throw new Error('Error al agregar estadísticas');
        }

        const nuevaEstadistica = await response.json(); // Puedes manejar la estadística agregada si es necesario
        console.log('Estadística agregada:', nuevaEstadistica);

        // Limpiar el formulario y volver a la sección de encuentros
        this.limpiarFormularioEstadistica();
        this.currentSection = 'encuentros';
    } catch (error) {
        console.error('Error al agregar estadísticas:', error);
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
    

    async consultarEstadisticas(encuentro_id) {
    try {
        const response = await fetch(`${URL}/consultarEstadisticas/${encuentro_id}`);
        if (!response.ok) {
            throw new Error('Error al consultar las estadísticas');
        }
        this.estadisticas = await response.json();
        console.log('Estadísticas consultadas:', this.estadisticas);
    } catch (error) {
        console.error('Error al consultar estadísticas:', error);
        Swal.fire('Error', error.message, 'error');
    }
},

    async actualizarEstadistica() {
        try {
            const response = await fetch(`${URL}/actualizarEstadisticas/${this.estadisticaEditada.encuentros_encuentro_id}`, {
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
                const response = await fetch(`${URL}/eliminarEstadisticas/${encuentro_id}`, {
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
      const response = await fetch(`${URL}/insertarEncuentro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.encuentro),
      });

      if (!response.ok) {
        throw new Error('Error al agregar el encuentro');
      }

      const nuevoEncuentro = await response.json();
      this.encuentros.push(nuevoEncuentro);
      Swal.fire('Éxito', 'Encuentro agregado correctamente', 'success');
      this.limpiarFormularioEncuentro(); // Método para limpiar el formulario

    } catch (error) {
      console.error('Error al agregar el encuentro:', error);
      Swal.fire('Error', error.message, 'error');
    }
  },

  async fetchEncuentros() {
    try {
      const response = await fetch(`${URL}/consultarEncuentros`);
      if (!response.ok) {
        throw new Error('Error al obtener los encuentros');
      }
      this.encuentros = await response.json();
    } catch (error) {
      console.error('Error al consultar encuentros:', error);
    }
  },

  async actualizarEncuentro() {
    try {
      const response = await fetch(`${URL}/actualizarEncuentro/${this.encuentroEditado.Encuentro_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.encuentroEditado),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el encuentro');
      }

      const encuentroActualizado = await response.json();
      const index = this.encuentros.findIndex(encuentro => encuentro.encuentro_id === encuentroActualizado.Encuentro_id);
      this.$set(this.encuentros, index, encuentroActualizado);
      Swal.fire('Éxito', 'Encuentro actualizado correctamente', 'success');
      this.cancelarEdicionEncuentro(); // Método para cancelar la edición

    } catch (error) {
      console.error('Error al actualizar el encuentro:', error);
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
        const response = await fetch(`${URL}/eliminarEncuentro/${encuentro.Encuentro_id}`, {
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
    async agregarTorneo() {
  try {
    const response = await fetch(`${URL}/insertarTorneo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.torneo),
    });

    if (!response.ok) {
      throw new Error('Error al agregar el torneo');
    }
    const nuevoTorneo = await response.json();
    this.torneos.push(nuevoTorneo); // Añadir el nuevo torneo a la lista
    Swal.fire('Éxito', 'Torneo agregado correctamente', 'success');
    //this.limpiarFormularioTorneo(); 

  } catch (error) {
    console.error('Error al agregar el torneo:', error);
    Swal.fire('Error', error.message, 'error');
  }
},
editarTorneo(torneo) {
    this.torneoEditado = { ...torneo }; // Copia los datos del torneo
    this.isEditingTorneo = true; // Activa el modo de edición
  },
  cancelarEdicionTorneo() {
    this.isEditingTorneo = false; // Desactiva el modo de edición
    this.torneoEditado = null; // Limpia los datos de edición
  },
async actualizarTorneo() {
  try {
    const response = await fetch(`${URL}/actualizarTorneo/${this.torneoEditado.torneo_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.torneoEditado),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el torneo');
    }

    const torneoActualizado = await response.json();
    const index = this.torneos.findIndex(torneo => torneo.torneo_id === torneoActualizado.torneo_id);
    
    // Actualiza el torneo en la lista directamente
    this.torneos[index] = torneoActualizado; 

    Swal.fire('Éxito', 'Torneo actualizado correctamente', 'success');
    this.cancelarEdicionTorneo(); // Opcional: Cierra el formulario de edición

  } catch (error) {
    console.error('Error al actualizar el torneo:', error);
    Swal.fire('Error', error.message, 'error');
  }
},
async eliminarTorneo(torneo) {
  const confirmar = await Swal.fire({
    title: '¿Estás seguro?',
    text: `¿Deseas eliminar el torneo ${torneo.nombre}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (confirmar.isConfirmed) {
    try {
      const response = await fetch(`${URL}/eliminarTorneo/${torneo.torneo_id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el torneo');
      }

      Swal.fire('Eliminado!', 'El torneo ha sido eliminado.', 'success');
      await this.fetchTorneos(); // Refresca la lista de torneos después de eliminar

    } catch (error) {
      console.error('Error al eliminar el torneo:', error);
      Swal.fire('Error', error.message, 'error');
    }
  }
},
async fetchTorneos() {
  try {
    const response = await fetch(`${URL}/consultarTorneos`);
    if (!response.ok) {
      throw new Error('Error al obtener los torneos');
    }
    this.torneos = await response.json(); // Cargar los torneos
  } catch (error) {
    console.error('Error al obtener los torneos:', error);
  }
},
editarEquipo(equipo) {
  this.equipoEditado = { ...equipo }; // Copia los datos del equipo seleccionado
  this.isEditingEquipo = true; // Activa el modo de edición
},
async actualizarEquipo() {
  try {
    const response = await fetch(`${URL}/${this.equipoEditado.equipoid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.equipoEditado),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el equipo');
    }

    const updatedEquipo = await response.json();
    const index = this.equipos.findIndex(equipo => equipo.equipoid === updatedEquipo.equipoid);
    this.$set(this.equipos, index, updatedEquipo); // Actualiza el equipo en la lista
    Swal.fire('Éxito', 'Equipo actualizado correctamente', 'success');
    this.cancelarEdicionEquipo(); // Cierra el formulario de edición

  } catch (error) {
    console.error('Error al actualizar el equipo:', error);
    Swal.fire('Error', error.message, 'error');
  }
},
async eliminarEquipo(equipo) {
  const confirmar = await Swal.fire({
    title: '¿Estás seguro?',
    text: `¿Deseas eliminar el equipo ${equipo.nombre}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (confirmar.isConfirmed) {
    try {
      const response = await fetch(`${URL}/eliminarEquipo/${equipo.equipoid}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el equipo');
      }

      Swal.fire('Eliminado!', 'El equipo ha sido eliminado.', 'success');
      await this.fetchEquipos(); // Refresca la lista de equipos después de eliminar

    } catch (error) {
      console.error('Error al eliminar el equipo:', error);
      Swal.fire('Error', error.message, 'error');
    }
  }
},
  async agregarEquipo() {
    if (!this.entrenador || !this.entrenador.Documento) {
    Swal.fire('Error', 'Por favor, selecciona un entrenador antes de agregar el equipo.', 'error');
    return; 
  }

  const nuevoEquipo = {
    fechacreacion: this.obtenerFechaHoy(),
    categoria: this.categoria, 
    nombre: this.nombre, 
    usuario_id: this.entrenador.Documento
  };
  console.log("Datos a enviar:", nuevoEquipo);

  try {
    const response = await fetch(`${URL}/insertarEquipo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoEquipo),
    });

    if (!response.ok) {
      throw new Error('Error al agregar el equipo');
    }

    const result = await response.json();
    Swal.fire('Éxito', 'Equipo agregado correctamente', 'success');
    this.equipos.push(result); // Agregar el nuevo equipo a la lista
    this.resetForm(); // Opcional: Resetea el formulario

  } catch (error) {
    console.error('Error al agregar el equipo:', error);
    Swal.fire('Error', error.message, 'error');
  }
},

resetForm() {
  // this.equipoid = '';
  this.nombre = '';
  this.categoria = '';
  this.fechaCreacion = this.obtenerFechaHoy();
  this.usuario_id = '';
},
async agregarInscripcion() {
  try {
    // Asegúrate de que los datos tengan la estructura correcta
    const datosAEnviar = {
      equipoid: this.nuevaInscripcion.equipo.equipoid,
      documento: this.nuevaInscripcion.inscripcion.documento,
    };

    console.log('Datos a enviar:', datosAEnviar); // Depuración: Verifica los datos antes de enviar

    const response = await fetch(`${URL}/insertarEquipoInscripcion`, {
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
// async consultarInscripcionesPorEquipo() {
//   try {
//     // Verifica que selectedEquipoId tenga un valor válido
//     if (!this.selectedEquipoId) {
//       throw new Error('No se ha seleccionado un equipo válido.');
//     }

//     console.log('Consultando inscripciones para el equipo ID:', this.selectedEquipoId); // Depuración

//     const response = await fetch(`http://127.0.0.1:8000/consultarEquipoInscripcion/${this.selectedEquipoId}`);
    
//     // Verifica si la respuesta es exitosa
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.detail || 'Error al consultar las inscripciones');
//     }

//     // Procesa la respuesta
//     const data = await response.json();
//     console.log('Inscripciones encontradas:', data); // Depuración

//     // Actualiza la lista de inscripciones
//     this.inscripciones = data;

//     // Si no hay inscripciones, muestra un mensaje
//     if (this.inscripciones.length === 0) {
//       Swal.fire('Información', 'No hay inscripciones registradas para este equipo.', 'info');
//     }
//   } catch (error) {
//     console.error('Error al consultar inscripciones:', error); // Depuración
//     Swal.fire('Error', error.message, 'error');
//   }
// },
async consultarTodasLasInscripciones() {
  try {
    console.log('Consultando todas las inscripciones...'); // Depuración

    const response = await fetch(`${URL}/consultarEquipoInscripcion`);
    
    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Error al consultar las inscripciones');
    }

    // Procesa la respuesta
    const data = await response.json();
    console.log('Inscripciones encontradas:', data); // Depuración

    // Actualiza la lista de inscripciones
    this.inscripciones = data;

    // Si no hay inscripciones, muestra un mensaje
    if (this.inscripciones.length === 0) {
      Swal.fire('Información', 'No hay inscripciones registradas.', 'info');
    }
  } catch (error) {
    console.error('Error al consultar inscripciones:', error); // Depuración
    this.inscripciones = [];
  }
},
async eliminarInscripcion(inscripcion) {
    console.log('Inscripción recibida:', inscripcion); // Depuración

    const confirmar = await Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar la inscripción para el equipo ${inscripcion.equipoid}?`, // Usa equipoid directamente
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (confirmar.isConfirmed) {
        try {
            const cuerpoSolicitud = {
                equipoid: inscripcion.equipoid, // Accede directamente a equipoid
                documento: inscripcion.documento // Accede directamente a documento
            };

            const response = await fetch(`${URL}/eliminarEquipoInscripcion`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cuerpoSolicitud),
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la inscripción');
            }

            Swal.fire('Eliminado!', 'La inscripción ha sido eliminada.', 'success');
            this.inscripciones = this.inscripciones.filter(i => i.documento !== inscripcion.documento); // Actualiza la lista
        } catch (error) {
            console.error('Error al eliminar inscripción:', error);
            Swal.fire('Error', error.message, 'error');
        }
    }
},
    obtenerFechaHoy() {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      },
      async agregarPago() {

        // Crear el objeto del pago
        const nuevoPago = {
          // inscripcion_documento: Number(this.inscripcion_documento),
          monto: Number(this.monto),
          // pagos_id: Number(this.pagos_id),
          fecha: this.fecha,
          categoria: this.categoria,
          descripcion: this.descripcion,
          tipo: this.tipo,
        };

        try {
          // Hacer la solicitud POST para agregar el pago
          const response = await fetch(`${URL}/insertarPago`, {
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
    const response = await fetch(`${URL}/consultarPago`);
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
    editarUsuario() {
        this.isEditing = true; 
    },
    cancelarEdicion() {
        this.isEditing = false; 
    },
async actualizarUsuario() {
  const documento = this.Documento;
  try {
    const response = await fetch(`${URL}/ActualizarUsuario/${documento}`, {
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
      await Swal.fire({
      title: 'Éxito',
      text: 'Usuario actualizado con éxito',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
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
  const confirmar = await Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Estás seguro de que deseas eliminar este usuario?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (!confirmar.isConfirmed) {
    return; // Si el usuario no confirma, no se elimina
  }


  try {
    // Paso 1: Verificar si el usuario tiene implementos asociados a su documento
    const response = await fetch(`${URL}/consultarImplementos/${this.Documento}`);

    if (response.status === 404 || !response.ok) {
      // No se encuentran implementos asociados, procedemos con la eliminación del usuario
      console.log('No se encontraron implementos asociados. Procediendo a eliminar el usuario.');
      await this.eliminarUsuarioSinImplementos();
      return; // Salir de la función después de eliminar
    }

    // Si la respuesta es válida y contiene implementos
    const implementos = await response.json();

    if (implementos.length > 0) {
      // Paso 2: Mostrar un mensaje para preguntar si desea editar o eliminar los implementos
      const result = await Swal.fire({
        title: 'El usuario tiene implementos asociados',
        text: '¿Deseas editar o eliminar los implementos antes de eliminar el usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Editar Implementos',
        cancelButtonText: 'Eliminar Implementos',
      });

      if (result.isConfirmed) {
        // Si decide editar los implementos, redirigir a la sección de edición
        console.log('Redirigiendo a la sección de edición de implementos...');
        this.editarImplementos(implementos);  // Esta función abriría la edición de implementos
        return; // No eliminamos el usuario, solo se editan los implementos
      } else {
        // Si decide eliminar los implementos, eliminarlos
        console.log('Eliminando implementos...');
        for (const implemento of implementos) {
          const responseEliminarImplemento = await fetch(`${URL}/eliminarImplemento/${implemento.implementos}`, {
            method: 'DELETE',
          });

          if (!responseEliminarImplemento.ok) {
            throw new Error(`Error al eliminar el implemento con id ${implemento.implementos}`);
          }

          console.log(`Implemento con id ${implemento.implementos} eliminado`);
        }
      }
    }

    // Paso 3: Ahora eliminamos el usuario después de los implementos
    await this. eliminarUsuarioSinImplementos();

  } catch (error) {
    await Swal.fire(
        'Eliminado!',
        'El usuario ha sido eliminado correctamente.',
        'success'
      );
  }
}
,
async eliminarUsuarioSinImplementos() {
  try {
    // Eliminar el usuario
    const responseEliminar = await fetch(`${URL}/EliminarUsuario/${this.Documento}`, {
      method: 'DELETE',
    });

    if (!responseEliminar.ok) {
      throw new Error('Error al eliminar el usuario');
    }

    await Swal.fire(
        'Eliminado!',
        'El usuario ha sido eliminado correctamente.',
        'success'
      );

    // Limpiar los datos de localStorage y redirigir al login
    localStorage.clear();
    this.$router.push('/login'); // Redirigir a la página de login

  } catch (error) {
    await Swal.fire(
        'No Elimiado ',
        'El usuario no se a eliminado correctamente.',
        'error'
      );
  }
}

   , async fetchDeportistas() {
      try {
        const response = await fetch(`${URL}/ConsultarJugadores`);
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
        const response = await fetch(`${URL}/consultarImplementos`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.inventario = await response.json();
      } catch (error) {
        console.error('Error al consultar inventario:', error);
      }
    },
    async descargarInventario(){
      try{
        const worksheet = XLSX.utils.json_to_sheet(this.inventario);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventario');
        XLSX.writeFile(workbook, 'inventario.xlsx');
      }catch(error){
        console.error('Error al generar el archivo Excel:', error);
        await Swal.fire('Error', 'No se pudo generar el archivo Excel', 'error');
      }
    },
    created() {
      this.fetchInventario();
    },

    async agregarProducto() {
  try {
    // Crear un objeto plano sin el proxy de Vue
    const productoParaEnviar = {
      nombre: this.nuevoProducto.nombre,
      descripcion: this.nuevoProducto.descripcion,
      cantidad: Number(this.nuevoProducto.cantidad)
    };

    console.log("Enviando:", productoParaEnviar);

    const response = await fetch(`${URL}/insertarImplemento`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productoParaEnviar) // Envía el objeto plano
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.detail || 'Error al agregar el producto';
      await Swal.fire('Error', errorMessage, 'error');
      return;
    }

    // Limpiar el formulario
    this.nuevoProducto = { nombre: '', descripcion: '', cantidad: '' };
    
    // Actualizar la lista
    await this.fetchInventario();
    
    await Swal.fire('Éxito', 'Producto agregado correctamente', 'success');
  } catch (error) {
    console.error('Error al agregar producto:', error);
    await Swal.fire('Error', 'Error en algún dato digitado, revisar y corregir', 'error');
  }
},

    editarProducto(producto) {
      this.editingProducto = { ...producto };
    },
    cancelarEdicionEquipo() {
    this.isEditingEquipo = false; // O cualquier otra lógica que necesites
    this.equipoEditado = null; // Opcional: limpiar el objeto editado
  },
    async actualizarEquipo() {
  try {
    const response = await fetch(`${URL}/actualizarEquipo/${this.equipoEditado.equipoid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.equipoEditado),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el equipo');
    }

    const updatedEquipo = await response.json();
    const index = this.equipos.findIndex(equipo => equipo.equipoid === updatedEquipo.equipoid);
    // Actualiza el equipo en la lista
    this.equipos[index] = updatedEquipo; 
    
    Swal.fire('Éxito', 'Equipo actualizado correctamente', 'success');
    this.cancelarEdicionEquipo(); // Cierra el formulario de edición

  } catch (error) {
    console.error('Error al actualizar el equipo:', error);
    Swal.fire('Error', error.message, 'error');
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
          fetch(`${URL}/eliminarImplemento/${producto.implementos}`, {
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
          fetch(`${URL}/EliminarJ/${deportista.documento}`, {
            method: 'DELETE'
          })
          .then(response => {
            if (response.ok) {
              Swal.fire('Eliminado!', 'El deportista ha sido eliminado.', 'success');
              this.fetchDeportistas(); 

            } else {
              Swal.fire('Error', 'Error al eliminar el deportista.', 'error');
            }
          }).then(() =>{
            window.location.reload();// recarga la pagina
          }

          ) 

          .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Error al eliminar el deportista.', 'error');
          });
        }
      });
    },
    editarDeportista(deportista) {
    this.editingDeportista = { ...deportista }; 
    console.log('Deportista a editar:', this.editingDeportista);
},
async actualizarDeportista() {
    // Check if editingDeportista is null
    if (!this.editingDeportista) {
        Swal.fire('Error', 'No se ha seleccionado un deportista para actualizar.', 'error');
        return;
    }
    console.log('Datos del deportista a actualizar:', this.editingDeportista);

    try {
        const documento = this.editingDeportista.documento; 
        const response = await fetch(`${URL}/ActualizarJ/${documento}`, {
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
        // this.cargarDatosDeportista(); // Recargar los datos del deportista
      } catch (error) {
        console.error('Error al actualizar deportista:', error);
        Swal.fire('Error!', 'No se pudo actualizar el deportista.', 'error');
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
    toggleMenu() {
      this.menuActive = !this.menuActive;
    },
    async fetchEquipos() {
  try {
    const response = await fetch(`${URL}/consultarEquipos`);
    if (!response.ok) {
      throw new Error('Error al consultar equipos');
    }
    this.equipos = await response.json();
  } catch (error) {
    console.error('Error al consultar equipos:', error);
  }
},
  },
  
editarEncuentro(encuentro) {
  this.encuentroEditado = { ...encuentro }; // Copia los datos del encuentro
  this.isEditingEncuentro = true; // Activa el modo de edición
},

mounted() {
    this.fetchEntrenadores();
    this.fetchEncuentros();
    this.consultarTodasLasInscripciones();
    this.fetchDeportistas();
    this.fetchInventario();
    this.fetchEquipos();
    this.fetchTorneos();
    this.nombreAdmin = localStorage.getItem('nombreusuario') || 'Nombre no disponible';
    this.emailAdmin = localStorage.getItem('emailusuario') || 'Email no disponible';
    this.usuario = localStorage.getItem('usuario') || 'usuario no disponible';
    this.rolusuario = localStorage.getItem('rolusuario') || 'rol no disponible';
    this.telefonousuario = localStorage.getItem('telefonousuario') || 'telefono no disponible';
    this.fotoAdmin = localStorage.getItem('fotoAdmin') || '';
    this.Documento = localStorage.getItem('Documento');  
    if (!this.Documento) {
      alert('Documento no disponible');
    }
    console.log('URL de la foto:', this.fotoAdmin);
    console.log('Documento del usuario:', this.Documento); 
  }
};
</script>
<style scoped>
.body {
    background: rgb(255, 255, 255);
    background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.815) 50%, rgba(0, 0, 0, 1) 100%);
    margin: -10px;
    font-family: Arial, sans-serif;}
 .contenedor-admin {
  width: 80%;
  padding-top: 60px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.styled-select {
  padding: 12px 15px;
  margin-bottom: 15px;
  font-size: 16px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #333;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}
.perfil-seccion {
  background-color: #222;
  margin: 20px auto;
  padding: 20px;
  width: 80%;
  max-width: 800px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  color: #fff;
  text-align: center;
}
.foto-perfil div {
  font-size: 16px;
  color: #ccc;
  padding: 10px;
  text-align: center;
}
.styled-select:focus {
  outline: none;
  border-color: #f44336;
  box-shadow: 0 0 8px rgba(244, 67, 54, 0.6);
}

.styled-select:hover {
  background-color: #444;
}

header {
  background-color: #d32f2f;
  color: #fff;
  padding: 1rem 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 999;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
}

header:hover {
  background-color: #b71c1c;
}

.header-izquierda,
.header-derecha {
  display: flex;
  align-items: center;
}

.header-izquierda {
  flex: 1;
}
.foto-perfil img {
  width: 200px; 
  height: 200px; 
  border-radius: 50%;
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
  margin-left: 1.5rem;
}

nav ul li a {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s ease;
}

nav ul li a:hover {
  color: #f44336;
}

.deportista-card {
  background-color: #333;
  border: 1px solid #444;
  padding: 20px;
  margin: 20px 0;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.deportista-card:hover {
  background-color: #444;
  transform: translateY(-5px);
}

.deportista-card h3 {
  font-size: 22px;
  margin-bottom: 15px;
  color: #fff;
}

.nombre-usuario {
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 1px;
}

main {
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  margin-top: 80px;
}

.body_admin {
  background-color: #121212;
  color: #fff;
  font-size: 16px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.deportista-card {
  animation: slideInFromLeft 0.6s ease-out;
}

.styled-select {
  animation: fadeIn 1s ease-out;
}

.contenido-principal {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 80%;
}

.internal-menu {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.internal-menu button {
  margin-right: 10px;
  padding: 12px 20px;
  cursor: pointer;
  background-color: #d32f2f;
  color: #fff;
  border: none;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-size: 16px;
}

.internal-menu button:hover {
  background-color: #b71c1c;
  transform: translateY(-3px);
}

.internal-menu button:active {
  transform: scale(0.98);
}

.internal-menu button:focus {
  background-color: #8e0000;
  animation: colorChange 0.5s forwards;
}

@keyframes colorChange {
  0% {
    background-color: #d32f2f;
  }
  50% {
    background-color: #8e0000;
  }
  100% {
    background-color: #d32f2f;
  }
}

.seccion-actual {
  padding: 20px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #222;
  color: #fff;
  transition: transform 0.3s ease-in-out;
}

.seccion-actual:hover {
  transform: translateY(-5px);
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
  border-radius: 10px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
}

.actividades:hover {
  transform: translateY(-5px);
}

.actividades .imagen-seccion {
  flex: 1;
  padding: 1rem;
  background-color: #555;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.imagenes {
  background-color: #555;
  padding: 2rem;
  color: #fff;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.imagenes-seccion {
  margin-top: 1rem;
}

.footer {
    background: linear-gradient(135deg, #000000, #333333); 
    color: #ffffff; 
    padding: 20px 0;  
    text-align: center;
    border-top: 2px solid #ff0000; 
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3); 
  }
  
  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(to top left, #000000, #6b0101);
    justify-content: center;
  }
  
  .social-icons {
    margin-bottom: 10px; /* Menos espacio entre los iconos */
  }
  
  .social-icons .icon {
    color: #ffffff;
    margin: 0 12px; /* Menos margen entre iconos */
    font-size: 22px; /* Tamaño de los iconos reducido */
    transition: transform 0.3s ease, color 0.3s ease; /* Efectos de hover suaves */
    text-decoration: none;
  }
  
  .social-icons .icon:hover {
    color: #ff0000; /* Cambiar color a rojo al hacer hover */
    transform: scale(1.1); /* Aumentar tamaño ligeramente */
  }
  
  .contact-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px; /* Menos espacio entre información de contacto */
  }
  
  .info-item {
    color: #ffffff;
    margin: 3px 0;  /* Márgenes más pequeños */
    font-size: 14px; /* Fuente más pequeña */
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: color 0.3s ease; /* Transición suave para el texto */
  }
  
  .info-item i {
    margin-right: 8px;
    font-size: 16px; /* Iconos más pequeños */
  }
  
  .info-item:hover {
    color: #ff0000; /* Cambio de color a rojo al hacer hover */
  }
  
  .footer h2 {
    font-size: 20px; /* Título más pequeño */
    margin-bottom: 10px; /* Menos margen debajo del título */
    font-family: 'Arial', sans-serif;
    font-weight: bold;
  }
  
  .footer p {
    font-size: 12px; /* Texto más pequeño */
    color: #bbbbbb;
    margin-top: 5px; /* Menos margen arriba */
  }

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }

  .menu-toggle .bar {
    background-color: #fff;
    height: 3px;
    width: 30px;
    margin: 4px 0;
  }

  nav {
    display: none;
    position: absolute;
    top: 60px;
    right: 0;
    background-color: #d32f2f;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    z-index: 999;
  }

  nav.active {
    display: flex;
  }

  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  nav ul li {
    margin: 1rem 0;
  }

  nav ul li a {
    color: #fff;
    text-decoration: none;
    font-size: 18px;
    transition: color 0.3s ease;
  }

  nav ul li a:hover {
    color: #fff;
    text-decoration: underline;
  }

  .actividades {
    flex-direction: column;
    padding: 1rem;
    gap: 0.8rem;
  }

  .imagenes-seccion {
    padding: 1rem;
  }
}

form {
  width: 80%;
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #222;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #fff;
  font-family: 'Arial', sans-serif;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  font-size: 14px;
  color: #ccc;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #333;
  color: #fff;
  font-size: 16px;
  transition: all 0.3s ease;
}

input:focus,
select:focus {
  outline: none;
  border-color: #f44336;
  box-shadow: 0 0 8px rgba(244, 67, 54, 0.6);
}

button.submit-btn {
  padding: 12px 20px;
  background-color: #d32f2f;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button.submit-btn:hover {
  background-color: #b71c1c;
}

button.submit-btn:active {
  background-color: #8e0000;
}

@media (max-width: 768px) {
  form {
    width: 95%;
  }

  input,
  select,
  button.submit-btn {
    font-size: 14px;
    padding: 10px;
  }
  
}
button {
  padding: 12px 20px;
  background-color: #d32f2f; 
  color: #fff; 
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #b71c1c; 
  transform: translateY(-3px); 
}

button:active {
  transform: scale(0.98); 
}

button:focus {
  background-color: #8e0000;
  animation: colorChange 0.5s forwards;
}

@keyframes colorChange {
  0% {
    background-color: #d32f2f;
  }
  50% {
    background-color: #8e0000;
  }
  100% {
    background-color: #d32f2f;
  }
}
@media (max-width: 992px) {
  .internal-menu {
    flex-wrap: wrap;
    gap: 10px;
    padding: 8px;
  }
  
  .internal-menu button {
    flex: 1 1 45%;
    margin: 0;
    padding: 10px 15px;
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .internal-menu {
    flex-wrap: wrap;
    gap: 8px;
    padding: 8px;
  }
  
  .internal-menu button {
    width: 100%;
    margin: 0;
    padding: 12px;
    font-size: 14px;
  }
}

/* Pantallas muy pequeñas */
@media (max-width: 495px) {
  .body{
    margin-top: 220px;
  }
  .internal-menu {
    padding: 5px;
  }
  
  .internal-menu button {
    padding: 10px;
    font-size: 13px;
  }
}


@media (max-width: 390px) {
  .body{
    margin-top: 220px;
  }
  .internal-menu {
    padding: 5px;
  }
  
  .internal-menu button {
    padding: 10px;
    font-size: 13px;
  }
}
</style>
