<template>
  <div class="containeer">
  <div class="header-contenido ">
    <div class="header-txt ">
      <h1 >Independiente cef</h1>
      <p v-if="!mostrarTextoLargo">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure enim quasi delectus totam.
      </p>
      <p v-if="mostrarTextoLargo">
        Numquam laborum ratione alias enim, aperiam et necessitatibus quas similique accusamus voluptatibus eligendi porro amet, odit tenetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa, nam eos. Modi odio architecto optio voluptates at. Natus, ut nostrum cumque eveniet aliquam iste repellendus maxime corrupti maiores alias nulla!
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo iusto aperiam fugiat facilis fugit enim, est eum porro eos nam tempore deleniti quasi accusamus nisi ratione quas numquam, minima corporis.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora et quidem mollitia? Itaque deleniti aliquam ipsum facilis, aspernatur sequi esse molestiae est ab quasi? Ipsum ipsam quam cumque quisquam. Expedita?
      </p>
      <a href="#" class="btn-1" :class="{ 'btn-activo': mostrarTextoLargo }" @click.prevent="toggleTexto">Mas información</a>
    </div>
    <div class="header-img">
      <img  class="header-img" src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\boton 1.jpg" alt="Descripción de la imagen">
    </div>
  </div>
</div>

<a href="dirigir con chat"></a><h2>NOTICIAS</h2>
  <div class="noticias">
  <div class="column">
    <div class="item">
      <h3>Nuevo Programa de Entrenamiento</h3>
      <p>La Academia de Fútbol lanza un innovador programa de entrenamiento para jóvenes talentos. Este programa se enfoca en desarrollar habilidades técnicas y tácticas, así como fomentar el trabajo en equipo.</p>
    <img class="imagendañada1" src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\boton 1.jpg" alt="espacio imagen">
    </div>
    <div class="item">
      <h3>>Éxito en el Torneo Local</h3>
      <p>El equipo juvenil de la academia se coronó campeón en el torneo local. Con un rendimiento excepcional, nuestros jugadores demostraron el talento y la dedicación que se cultivan en nuestra institución</p>
      <img  class="imagendañada1"src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\boton 1.jpg" alt="espacio imagen">
    </div>
  </div>
  <div class="column">
    <div class="item">
      <h3>Inscripciones Abiertas</h3>
      <p>¡Las inscripciones para la próxima temporada ya están abiertas! Invitamos a todos los jóvenes futbolistas a unirse a nuestra familia y mejorar sus habilidades en un ambiente profesional y amigable.</p>
      <img class="imagendañada1" src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\boton 1.jpg" alt="espacio imagen">
    </div>
    <div class="item">
      <h3>Entrenamientos</h3>
      <p>El próximo lunes se tiene practica en el campo</p>
      <img class="imagendañada1" src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\boton 1.jpg" alt="espacio imagen">
    </div>
  </div>
</div>

  
  <div class="slider">
    <div class="slider-content" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <img v-for="(image, index) in images" :key="index" :src="image" alt="Slider Image" />
    </div>
    <button @click="prevImage" class="slider-button">Anterior</button>
    <button @click="nextImage" class="slider-button">Siguiente</button>
  </div>
  <h2>Cumpleaños de Este Mes</h2>
  <div class="cumpleaños">
  <div class="cumpleanos-list">
    <div class="cumpleano-item item-large">
      <h4>Juan Pérez</h4>
      <p>Fecha: 5 de octubre</p>
      <img class="imagenperfil" src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\perfil.jpg" alt="">
    </div>
    <div class="cumpleano-item item-small">
      <h4>María López</h4>
      <p>Fecha: 12 de octubre</p>
      <img class="imagenperfil"  src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\perfil.jpg" alt="">
    </div>
    <div class="cumpleano-item item-small">
      <h4>Carlos García</h4>
      <p>Fecha: 18 de octubre</p>
      <img class="imagenperfil"  src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\perfil.jpg" alt="">
    </div>
    <div class="cumpleano-item item-large">
      <h4>Laura Martínez</h4>
      <p>Fecha: 25 de octubre</p>
      <img class="imagenperfil"  src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\perfil.jpg" alt="">
    </div>
  </div>

      <button @click="mostrarMapa" class="btn-mapa">Ver Ubicación del Centro</button>
      
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
</div>
  <div class="contenedor3">
<div class="zoom">
  <div class="imagen-boton1">
      <button class="p_zoom"><router-link to="/Categoria" >CATEGORIA</router-link></button>
    </div>
</div>
<div class="zoom">
  <div class="imagen-boton2">
    <button class="p_zoom">CONVOCATORIAS</button>
  </div>
</div>
<div class="zoom">
  <div class="imagen-boton3">
    <button class="p_zoom"><router-link to="/Personal" >PERSONAL</router-link></button>
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
              <a href="mailto:info@example.com" class="info-item"><i class="fas fa-envelope"></i> info@example.com</a>
              <a href="tel:+123456789" class="info-item"><i class="fas fa-phone"></i> +123 456 789</a>
              <p class="info-item"><i class="fas fa-map-marker-alt"></i> Calle Ejemplo 123, Ciudad</p>
          </div>
      </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const mostrarTextoLargo = ref(false);

function toggleTexto() {
  mostrarTextoLargo.value = !mostrarTextoLargo.value;
}

const mapaVisible = ref(false);

function mostrarMapa() {
  mapaVisible.value = !mapaVisible.value; 
}


const images = ref([
  'https://via.placeholder.com/800x400?text=Imagen+1',
  'https://via.placeholder.com/800x400?text=Imagen+2',
  'https://via.placeholder.com/800x400?text=Imagen+3',
  'https://via.placeholder.com/800x400?text=Imagen+3',
]);

const currentIndex = ref(0);

function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
}

function prevImage() {
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
}

body {
  background: rgb(0,0,0);
background: linear-gradient(180deg, rgba(0,0,0,1) 24%, rgba(233,45,45,1) 59%, rgba(0,0,0,1) 79%);
}

.header-contenido {
  margin:0 auto;
  padding: 100px 0;
  display: flex;
  align-items: center;
  color: white; 
}
.header-txt  {
  padding-left: 200px;
  width: 50%;
}
.imagenperfil{
  height: 140px;
  width: 140px;
  padding: 10px;
}
.header-img {
  width: 800px; 
  height: 500px;
  margin-left: 60px;
  margin-top:50px ;
  border-radius: 8px; 
}
.header-txt h1 {
  font-size: 70px;
  line-height: 150px;
  color: aliceblue;
  margin-bottom: 25px;
}
.header-txt p {
  font-size: 18px;
  color: rgb(255, 255, 255);
  margin-bottom: 35px;
}

.btn-1 {
  display: inline-block;
  padding: 13px 30px;
  background-color: rgb(177, 3, 3);
  color: rgb(29, 84, 133);
  border-radius: 25px;
  font-size: 18px;
  color: black;
  transition: background-color 0.3s ease, transform 0.3s ease; 
}

.btn-activo {
  background-color: rgb(255, 255, 255); 
  transform: scale(1.1); 
  color: black;
}


.header-img img {
  width: 100%;
  max-width: 500px;
}
.noticias {
  padding: 50px 0;
  width: 95%;
  padding-top: 50px;
  margin: 0 auto; 
  text-align: center;
  color: white;
  display: flex; 
  flex-wrap: wrap; 
  justify-content: space-between; 
}
.imagendañada1{
  height: 150px;
  width: 150px;
}
.column {
  display: flex; 
  flex-direction: column; 
  width: 48%; 
}

.item {
  cursor: pointer; 
  background-color: rgb(163, 5, 5); 
  border: none; 
  font-size: 20px; 
  color: aliceblue; 
  padding: 30px; 
  border-radius: 8px;
  height: 300px; 
  margin: 10px 0; 
  opacity: 0; 
  transform: translateY(20px); 
  animation: fadeIn 0.6s forwards;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

@keyframes fadeIn {
  to {
    opacity: 1; 
    transform: translateY(1); 
  }
}


.item:hover {
  transform: scale(1.05); 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); 
}

@keyframes slideIn {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideIn {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes scaleUp {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.1); /* Escalar un 10% */
    opacity: 1;
  }
}
h2{
  color: rgb(255, 255, 255);
  text-align: center;
  font-size: 40px;
  font-weight: bold;
}
.cumpleaños {
  padding: 50px 50px;
  text-align: center;
  width: 100%;

}

.cumpleanos-list {
  display: flex;
  justify-content: center; 
  flex-wrap: wrap; 
  margin-bottom: 40px;
  gap: 20px; 
}

.cumpleano-item {
  background-color: rgb(163, 5, 5);
  color: aliceblue;
  padding: 15px;
  border-radius: 8px;
  width: 300px; 
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.cumpleano-item:hover {
  transform: scale(1.1); 
}

.item-large {
  height: 250px; 
}

.item-small {
  height: 200px; 
}



.btn-mapa {
  background-color: rgb(163, 5, 5);
  color: aliceblue;
  padding: 20px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.map-modal {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
  height: 100%;
  z-index: 9999; 
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); 
}

.map-modal iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.slider {
  position: relative;
  width: 1000px; 
  height: 650px; 
  margin: 20px auto; 
  overflow: hidden;
  padding-top: 30px;
}

.slider-content {
  display: flex;
  transition: transform 0.5s ease; 
}

.slider img {
  width: 1000px;
  height: 650px; 
}

.slider-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 10;
}

.slider-button:nth-child(2) {
  left: 10px; 
}

.slider-button:nth-child(3) {
  right: 10px; 
}
.contenedor3{
display: flex;
justify-content: space-around;
width: 100%;
padding-top: 200px;
margin-left: 300px;
padding-bottom: 100px;
background-color: #ffffff;

}
.imagen-boton1{
background-image: url("E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\carrusel 1.jpg");
object-fit: cover; 
width: 250px;
height: 250px;
padding: 20px 10px;
background-size: cover;
border-radius: 20px;

}
.imagen-boton2{
background-image:url("E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\carrusel 3.jpg");
object-fit: cover; 
width: 250px;
height: 250px;
padding: 20px 10px;
background-size: cover;
border-radius: 20px;

}
.imagen-boton3{
background-image: url("E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\boton 3.jpg");
object-fit: cover; 
width: 250px;
height: 250px;
padding: 20px 10px;
background-size: cover;
border-radius: 20px;

}
.zoom{
border-radius: 20px;
border: none;
transition: 1.5s ease;
 -moz-transition: 1.5s ease;
 -webkit-transition: 1.5s ease; 
 -o-transition: 1.5s ease;
}
.zoom:hover{
transform : scale(1.5);
-webkit-transform : scale(1.5); 
-o-transform : scale(1.5); 
-ms-transform : scale(1.5); 
}
.p_zoom {
cursor: pointer; 
background-color: transparent; 
border: none; 
font-size: 25px; 
margin: auto;
color: rgb(0, 0, 0); 
font-weight: bold;

position: relative; 
padding-bottom: 10px; 
}
.p_zoom::after {
content: "";
color: #530505;
display: block; 
position: absolute; 
left: 0; 
bottom: 0;
width: 100%;
height: 2px; 
background-color: rgb(49, 4, 4); 
opacity: 0; 
transition: opacity 0.3s; 
}

.p_zoom:hover::after {
opacity: 1; 
}
.footer {
border-top: 1px solid #f00  ;
box-shadow: 5px 5px 2px 0px rgba(0, 0, 0, 0.5);
background-color: #000000; 
color: #ffffff; 
padding: 20px 0px ;
text-align: center;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.social-icons {
  margin-bottom: 10px;
}

.social-icons .icon {
  color: #ffffff;
  margin: 0 10px;
  font-size: 24px;
  text-decoration: none;
}

.social-icons .icon:hover {
  color: #f00; 
}

.contact-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-item {
  color: #ffffff;
  margin: 5px 0;
  text-decoration: none;
}

.info-item i {
  margin-right: 8px;
}

.info-item:hover {
  color: #f00; 
}
.contenedor3{
  align-items: center;
  width: 70%;
  background-color: #000000;
  
}
</style>