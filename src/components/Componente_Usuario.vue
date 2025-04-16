<template>
  <div class="body">
  <div id="inicio" class="containeer">
  <div class="header-contenido ">
    <div class="header-txt ">
      <h1 >Independiente C.E.F</h1>
      <p v-if="!mostrarTextoLargo" class="texto-centro">
  En el Club Independiente C.E.F formamos jugadores con valores, disciplina y pasión por el fútbol. Descubre quiénes somos y cómo transformamos vidas a través del deporte.
</p>
<p v-if="mostrarTextoLargo" class="texto-centro">
  Nuestro club nace con la misión de impulsar el talento futbolístico de niños y jóvenes, brindándoles un entorno seguro, familiar y comprometido con la excelencia deportiva. Nos destacamos por una metodología que fomenta el desarrollo técnico, físico y humano de cada jugador.
</p>
      <a href="#" class="btn-1" :class="{ 'btn-activo': mostrarTextoLargo }" @click.prevent="toggleTexto">Mas información</a>
    </div>
    <div class="header-img">
      <img  class="header-img" src=".\icons\boton 1.jpg" alt="Descripción de la imagen">
    </div>
  </div>
</div>
<div id="noticias" class="noticias">
    <div class="noticias-contenedor-blanco"></div>
    <div class="card">
        <img class="imagen-principal" src=".\icons\boton 1.jpg" alt="">
        <div class="texto-overlay">
            <p class="texto-pequeno">Noticia</p>
            <h1>1</h1>
            <p>¡Arrancamos la temporada con pie derecho! Nuestros equipos participaron en el torneo municipal logrando destacadas actuaciones.</p>
        </div>
    </div>

    <div class="card">
        <img class="imagen-principal" src=".\icons\boton 1.jpg" alt="">
        <div class="texto-overlay">
            <p class="texto-pequeno">Noticia</p>
            <h1>2</h1>
            <p>El Club Independiente C.E.F celebró una exitosa jornada de integración con las familias de nuestros jugadores, promoviendo valores de unión y compromiso.</p>
        </div>
    </div>

    <div class="card">
        <img class="imagen-principal" src=".\icons\boton 1.jpg" alt="">
        <div class="texto-overlay">
            <p class="texto-pequeno">Noticia</p>
            <h1>3</h1>
            <p>Se abren las inscripciones para las categorías sub-7 a sub-17. ¡Ven y haz parte de nuestra familia futbolística!</p>
        </div>
    </div>

    <div class="card">
        <img class="imagen-principal" src=".\icons\boton 1.jpg" alt="">
        <div class="texto-overlay">
            <p class="texto-pequeno">Noticia</p>
            <h1>4</h1>
            <p>El cuerpo técnico participó en una capacitación con entrenadores certificados FIFA, fortaleciendo nuestra visión pedagógica del deporte.</p>
        </div>
    </div>
</div>
<div>
  <div class="informacion-slider">
    <div class="informacionslider">
        <h2 id="nosotros">Nosotros</h2>
        <p>En el Club Deportivo CEF, vivimos el fútbol con el corazón. Somos una institución que no solo forma jugadores, sino también personas. Creemos en el deporte como herramienta para educar, unir y transformar.

Desde nuestros inicios, trabajamos día a día para brindar un espacio donde niños, jóvenes y adultos puedan crecer, competir y disfrutar del fútbol en un ambiente sano, respetuoso y familiar. Cada entrenamiento y cada partido es una oportunidad para aprender, compartir y superarse.</p>
    </div>
    <div class="Slider">
        <SliderComponent />
    </div>
</div>
</div>


<!-- <h2 class="Titulo_Cumpleaños">🎂 Cumpleaños de Este Mes 🎂</h2>
<div class="cumpleaños">
  <div class="cumpleanos-list">
    
    <div v-if="cumpleanos.length === 0" class="mensaje-no-cumple">
      <p>No hay jugadores cumpliendo años este mes 🎈</p>
    </div>

    <div v-else>
      <div 
        v-for="jugador in cumpleanos" 
        :key="jugador.documento" 
        class="cumpleano-item" 
        :class="{ 'cumpleano-hoy': jugador.cumpleHoy }"
      >
        <h4 class="cumpleaños-titulo">{{ jugador.nombre }}</h4>
        <p class="cumpleaños-titulo">Fecha: {{ new Date(jugador.fecha_nacimiento).toLocaleDateString() }}</p>
        <img class="imagenperfil" :src="jugador.foto" alt="">
      </div>
    </div>
    
  </div>
</div>-->

<div class="informacion-video">
    <div class="video-container">
        <video class="video" controls>
            <source src=".\icons\205193-926528071_small.mp4" type="video/mp4">
            Tu navegador no soporta el video.
        </video>
    </div>
    <div class="texto-container">
      ¿Te gusta el fútbol?
En Independiente cef tienes cancha sintética, luces para jugar de noche y buen ambiente.
Arma tu equipo, reserva y viví el partido como se debe. ¡Nos vemos en la cancha!
    </div>
</div>
<div class="contenedor3partes">
<div class="contenedorlocalidad">
  <div class="contenedor-info">
    <h2>Centro Independiente CEF</h2>
    <p>Este es el Centro Independiente CEF, donde se llevan a cabo diversas actividades. ¡Descubre más sobre nuestra ubicación!</p>
    <button @click="mostrarMapa" class="btn-mapa">Ver</button>
  </div>
  <div class="contenedor-imagen">
    <img src=".\icons\independite 1.jpg" alt="Imagen del Centro">
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
</div>
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

// const BASE_URL = 'http://localhost:8000';
const BASE_URL = 'proyecto-cef-backend.railway.internal' 

async function obtenerCumpleanos() {
  const response = await fetch('https://proyecto-cef-backend-production.up.railway.app/CumpleanosEsteMes');
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