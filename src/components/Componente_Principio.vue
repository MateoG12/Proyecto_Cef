<template>
<header class="header">
    <div class="contenedor">
      <div class="menu">
        <!-- <details>
          <summary class="boton1">
            <img class="boton-menu" src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\menu.png" alt="">
          </summary>
          <div class="acordion1">
            <p class="p2" ><router-link  to="/Categoria">Categoria</router-link></p>
            <P class="p">Convocatoria</P>
            <p class="p">Eventos</p>
            <p class="p">Personal</p>
          </div>
        </details> -->
      </div>
      <p ><router-link class="p3" to="/">Inicio</router-link></p>
      <p class="p2">Noticia</p>
      <div class="logo">
          <img class="img" src="E:\SENA\.QUINTO TRIMESTRE\Nur Derly\VueJS frame\Proyecto\src\components\icons\WhatsApp_Image_2024-08-23_at_9.04.20_AM-removebg-preview.png" alt=":(">
      </div>
      <p class="p2">Nosotros</p>
      <div class="login">
        <button class="boton-inicio"><router-link to="/login" ><P class="p_boton">Inicio Sesion  |  Inscribete</P></router-link></button>
      </div> 
    </div>
</header>
</template>
<style>
  .header{
    font-family: Arial, sans-serif;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 2px 5px rgba(255, 6, 6, 0.5);
    position: fixed; 
    top: 0; 
    color: #ffffff;
    background-color: rgb(0, 0, 0);
    width: 100%;
    height: 100px;
    margin: -10px;   
    z-index: 1000;
  }
  .menu {
    position: absolute;
    top: 0;
    left: 0;
  }
  .boton-menu{
    width: 50px;
    height: 50px;
  }
  .boton1 {
    background: transparent;
    color: rgba(255, 255, 255, 0);
    font-size: 16px;
    cursor: pointer;
    padding: 30px 50px;
  }
  .acordion1 {
    background-color: white;
    padding: 10px 20px;
    border: 1px solid #000000;
    margin: -20px 10px 10px 30px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  .p{
      font-size: 20px;
      cursor: pointer;
      color: #333;
  }
  .contenedor{
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
  }
  .img{
      width: 100px;
      height: 100px;
  }
  .p_boton{
    color: #ffffff;
  }
  .p2{
    font-size: 20px;
    cursor: pointer;
    color: rgb(255, 255, 255);
    border: none;
  }
  .p2 ::before{
    border-bottom: #ffffff;
    border: none;
  }
  .p3{
    font-size: 20px;
    margin-left: 60px;
    cursor: pointer;
    color: rgb(255, 255, 255);
    border: none;
  }
  .boton-inicio {
    background: #ab1a1a; 
    color: #fff; 
    border: none; 
    position: relative; 
    height: 50px;
    padding: 5px 10px; 
    cursor: pointer; 
    transition: 800ms ease all; 
    outline: none; 
    text-align: center; 
    display: inline-block;
  }
  
  .boton-inicio:hover {
    background: #000000; 
    color: #ffffff; 
  }
  
  .boton-inicio:before, .boton-inicio:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    background: #ab1a1a; 
    transition: 400ms ease all;
  }
  
  .boton-inicio:after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
  }
  
  .boton-inicio:hover:before, .boton-inicio:hover:after {
    width: 100%; 
    transition: 800ms ease all; 
  }
</style>