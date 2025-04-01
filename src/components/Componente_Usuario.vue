<template>
  <div class="body">

  

  <div id="inicio" class="containeer">
  <div class="header-contenido ">
    <div class="header-txt ">
      <h1 >Independiente C.E.F</h1>
      <p v-if="!mostrarTextoLargo" class="texto-centro">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure enim quasi delectus totam.
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis dicta perferendis expedita doloremque beatae eum magnam, iusto incidunt sunt enim esse exercitationem est illum cupiditate, labore dolores adipisci amet rem.
</p>
<p v-if="mostrarTextoLargo" class="texto-centro">
    Numquam laborum ratione alias enim, aperiam et necessitatibus quas similique accusamus voluptatibus eligendi porro amet, odit tenetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa, nam eos. Modi odio architecto optio voluptates at. Natus, ut nostrum cumque eveniet aliquam iste repellendus maxime corrupti maiores alias nulla!
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo iusto aperiam fugiat facilis fugit enim, est eum porro eos nam tempore deleniti quasi accusamus nisi ratione quas numquam, minima corporis.
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora et quidem mollitia? Itaque deleniti aliquam ipsum facilis, aspernatur sequi esse molestiae est ab quasi? Ipsum ipsam quam cumque quisquam. Expedita?
</p>
      <a href="#" class="btn-1" :class="{ 'btn-activo': mostrarTextoLargo }" @click.prevent="toggleTexto">Mas información</a>
    </div>
    <div class="header-img">
      <img  class="header-img" src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\proyectopython\src\components\icons\boton 1.jpg" alt="Descripción de la imagen">
    </div>
  </div>
</div>
<h2 class="Titulo_Cumpleaños2"> Noticias </h2>
<div id="noticias" class="noticias">
    <div class="noticias-contenedor-blanco"></div>
    <div class="card">
        <img class="imagen-principal" src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\proyectopython\src\components\icons\boton 1.jpg" alt="">
        <div class="texto-overlay">
            <p class="texto-pequeno">Noticia</p>
            <h1>1</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis qui eius dicta totam saepe commodi officiis ratione amet explicabo quasi! Reiciendis corporis deleniti assumenda est praesentium aperiam fuga maxime nostrum.</p>
        </div>
    </div>

    <div class="card">
        <img class="imagen-principal" src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\proyectopython\src\components\icons\boton 1.jpg" alt="">
        <div class="texto-overlay">
            <p class="texto-pequeno">Noticia</p>
            <h1>2</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis qui eius dicta totam saepe commodi officiis ratione amet explicabo quasi! Reiciendis corporis deleniti assumenda est praesentium aperiam fuga maxime nostrum.</p>
        </div>
    </div>

    <div class="card">
        <img class="imagen-principal" src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\proyectopython\src\components\icons\boton 1.jpg" alt="">
        <div class="texto-overlay">
            <p class="texto-pequeno">Noticia</p>
            <h1>3</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis qui eius dicta totam saepe commodi officiis ratione amet explicabo quasi! Reiciendis corporis deleniti assumenda est praesentium aperiam fuga maxime nostrum.</p>
        </div>
    </div>

    <div class="card">
        <img class="imagen-principal" src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\proyectopython\src\components\icons\boton 1.jpg" alt="">
        <div class="texto-overlay">
            <p class="texto-pequeno">Noticia</p>
            <h1>4</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis qui eius dicta totam saepe commodi officiis ratione amet explicabo quasi! Reiciendis corporis deleniti assumenda est praesentium aperiam fuga maxime nostrum.</p>
        </div>
    </div>
</div>
<div>
  <div class="informacion-slider">
    <div class="informacionslider">
        <h2 id="nosotros">Nosotros</h2>
        <p>Somos una empresa dedicada a ofrecer soluciones innovadoras para mejorar la experiencia del usuario. Nos enfocamos en crear productos de alta calidad, utilizando la última tecnología para asegurar la satisfacción de nuestros clientes.</p>
    </div>
    <div class="Slider">
        <SliderComponent />
    </div>
</div>
</div>
<h2 class="Titulo_Cumpleaños">🎂 Cumpleaños de Este Mes 🎂</h2>
<div class="cumpleaños">
  <div class="cumpleanos-list">
    <div v-for="jugador in cumpleanos" :key="jugador.documento" class="cumpleano-item" 
     :class="{'cumpleano-hoy': jugador.cumpleHoy}">
    <h4 class="cumpleaños-titulo">{{ jugador.nombre }}</h4>
    <p  class="cumpleaños-titulo">Fecha: {{ new Date(jugador.fecha_nacimiento).toLocaleDateString() }}</p>
    <img class="imagenperfil" :src="jugador.foto" alt="">
</div>
  </div>
</div>

<div class="informacion-video">
    <div class="video-container">
        <video class="video" controls>
            <source src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\proyectopython\src\components\icons\205193-926528071_small.mp4" type="video/mp4">
            Tu navegador no soporta el video.
        </video>
    </div>
    <div class="texto-container">

    </div>
</div>
<div class="contenedorlocalidad">
  <div class="contenedor-info">
    <h2>Centro Independiente CEF</h2>
    <p>Este es el Centro Independiente CEF, donde se llevan a cabo diversas actividades. ¡Descubre más sobre nuestra ubicación!</p>
    <button @click="mostrarMapa" class="btn-mapa">Ver</button>
  </div>
  <div class="contenedor-imagen">
    <img src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\proyectopython\src\components\icons\independite 1.jpg" alt="Imagen del Centro">
  </div>
</div>

<div v-if="mapaVisible" class="map-modal">
  <div class="map-overlay" @click="mostrarMapa"></div>
  <iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.672825086688!2d-74.22625728450232!3d4.725344843357773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3a35bb03c916c3%3A0x9e130e4b5c07b1e2!2sFunza%2C%20Cundinamarca%2C%20Colombia!5e0!3m2!1ses!2sus!4v1632780041962!5m2!1ses!2sus"
    width="100%" 
    height="100%" 
    style="border:0;" 
    allowfullscreen="" 
    loading="lazy"></iframe>
</div>
<div class="contenedor3">
  <div class="zoom">
    <div class="imagen-boton1">
      <button class="p_zoom"><router-link to="/Categoria"><p class="p_zoom">CATEGORIA</p></router-link></button>
    </div>
  </div>
  <div class="zoom">
    <div class="imagen-boton2">
      <a href="https://www.instagram.com/clubindependiente_cef" target="_blank">
        <button class="p_zoom">CONVOCATORIAS</button>
      </a>
    </div>
  </div>
  <div class="zoom">
    <div class="imagen-boton3">
      <button class="p_zoom"><router-link to="/Personal"><p class="p_zoom">PERSONAL</p></router-link></button>
    </div>
  </div>
</div>
<footer class="footer">
      <div class="footer-content">
          <div class="social-icons">
              <a href="#" class="icon"><i class="fab fa-facebook-f">#</i></a>
              <a href="#" class="icon"><i class="fab fa-twitter">#</i></a>
              <a href="#" class="icon"><i class="fab fa-instagram">#</i></a>
          </div>
          <div class="contact-info">
              <a href="mailto:info@example.com" class="info-item"><i class="fas fa-envelope"></i>Clubindependietecef@Gmail.com</a>
              <a href=" tel: 3246565131" class="info-item"><i class="fas fa-phone"></i>3138683102</a>
              <p class="info-item"><i class="fas fa-map-marker-alt"></i> Calle Ejemplo 123, Ciudad</p>
          </div>
      </div>
  </footer>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SliderComponent from '@/components/Slider.vue';

const mostrarTextoLargo = ref(false);
const mapaVisible = ref(false);
const cumpleanos = ref([]);

function toggleTexto() {
  mostrarTextoLargo.value = !mostrarTextoLargo.value;
}

function mostrarMapa() {
  mapaVisible.value = !mapaVisible.value; 
}

const BASE_URL = 'http://localhost:8000'; // Cambia esto a la URL de tu servidor

async function obtenerCumpleanos() {
  const response = await fetch('http://127.0.0.1:8000/CumpleanosEsteMes');
  const data = await response.json(); // Guarda la respuesta en una variable
  console.log(data);

  if (Array.isArray(data)) {
    // Obtener la fecha actual ajustada a la zona horaria de Colombia
    const today = new Date();
    const todayInColombia = new Date(
      today.toLocaleString('en-US', { timeZone: 'America/Bogota' })
    );

    // Obtener el día, mes y año en formato adecuado
    const day = todayInColombia.getDate();
    const month = todayInColombia.getMonth(); // Mes es 0-indexado
    const year = todayInColombia.getFullYear();

    // Crear una fecha ajustada
    const colombiaDate = new Date(year, month, day);

    // Recorrer los jugadores y verificar si tienen cumpleaños hoy
    cumpleanos.value = data.map(jugador => {
      // Convierte la fecha de nacimiento de string a Date
      const fechaNacimiento = new Date(jugador.fecha_nacimiento);

      // Verifica si el cumpleaños es hoy (comparar día y mes, no el año)
      const esCumpleHoy = fechaNacimiento.getDate() === colombiaDate.getDate() && 
                          fechaNacimiento.getMonth() === colombiaDate.getMonth();

      // Asigna la URL de la foto
      jugador.foto = BASE_URL + jugador.foto;
      jugador.cumpleHoy = esCumpleHoy;

      return jugador;
    });

    // Imprime cada jugador y su foto
    cumpleanos.value.forEach(jugador => {
      console.log(`Jugador: ${jugador.nombre}, Foto URL: ${jugador.foto}`);
    });
  } else {
    console.error('La respuesta del servidor no es un array.');
  }
}



onMounted(() => {
  obtenerCumpleanos();
});
</script>


<style scoped src="/src/assets/estilos_usuarios.css">

</style>