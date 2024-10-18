<template>
    <div class="body_entre">
      <main>
        <div class="contenedor-entre">
          <div class="perfil-seccion">
            <section class="perfil">
              <h2>Tu Perfil</h2>
              <div class="foto-perfil">Foto</div>
              <p>Nombre:{{ nombreEntre }}</p>
              <p>Email: {{ emailEntre }}</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum laboriosam dolorem ipsum, inventore esse dolor sunt minima necessitatibus numquam error, harum praesentium blanditiis veniam iure autem unde, delectus reiciendis magni.l  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum odit tenetur totam officiis libero deserunt ut in, doloremque asperiores, maxime veritatis esse quod eius modi laboriosam cum saepe nobis amet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi deleniti molestiae debitis expedita reiciendis accusantium magni illo sit cupiditate quam repudiandae iusto voluptates incidunt, quod libero quas voluptatibus! Et, incidunt!</p>
            </section>
          </div>
  
          <div class="contenido-principal">
            <nav class="internal-menu">
              <button @click="currentSection = 'deportista'">Información del Deportista</button>
              <button @click="currentSection = 'pagos'">Pagos</button>
              <button @click="currentSection = 'inventario'">Inventario</button>
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
                <div  v-for="producto in inventario" :key="producto.id" class="inventario-card">
                <p>Producto: {{ producto.nombre }}</p>
                <p>Descripción: {{ producto.descripcion }}</p>
                <p>Cantidad: {{ producto.cantidad }}</p>
                <p>Ubicación: {{ producto.ubicacion }}</p>
                </div>
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
        nombreEntre: '', 
        emailEntre: '' ,
        menuActive: false,
        currentSection: 'deportista',
        deportistas: [],
        inventario: [],
        selectedCategory: '',
        categoriasPermitidas: ['Sub7', 'Sub9', 'Sub11', 'Sub13', 'Sub15', 'Sub17', 'Sub20', 'Elite'] // Categorías permitidas
        
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
  },
  mounted() {
    this.fetchDeportistas();
    this.fetchInventario();
    this.nombreEntre = localStorage.getItem('nombreEntre') || 'Nombre no disponible';
    this.emailEntre = localStorage.getItem('emailEntre') || 'Email no disponible';
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
  