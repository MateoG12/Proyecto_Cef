<template>
    <div class="slider">
      <div class="slides" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div class="slide" v-for="(image, index) in images" :key="index">
          <img :src="image" alt="" />
        </div>
      </div>
      <button class="prev" @click="prevSlide">❮</button>
      <button class="next" @click="nextSlide">❯</button>
    </div>
  </template>
  
  <script>
  import carrusel1 from '@/assets/carrusel 1.jpg';
  import carrusel2 from '@/assets/carrusel 3.jpg';
  import carrusel3 from '@/assets/carrusel 2.jpg';
  import carrusel4 from '@/assets/carrusel 1.jpg';
  import carrusel5 from '@/assets/carrusel 3.jpg';
  import carrusel6 from '@/assets/carrusel 2.jpg';
  
  export default {
    data() {
      return {
        currentIndex: 0,
        images: [carrusel1, carrusel2, carrusel3,carrusel4,carrusel5,carrusel6],
      };
    },
    methods: {
      nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      },
      prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      },
      autoSlide() {
        setInterval(this.nextSlide, 5000); // Cambia de imagen cada 3 segundos
      },
    },
    mounted() {
      this.autoSlide();
    },
  };
  </script>
  
  <style scoped>
  .slider {
    position: relative;
    overflow: hidden;
    width: 800px; /* Ajusta según sea necesario */
    height: 500px; /* Ajusta según sea necesario */
  }
  
  .slides {
    display: flex;
    transition: transform 0.5s ease;
  }
  
  .slide {
    min-width: 100%;
    box-sizing: border-box;
  }
  
  img {
    width: 100%;
    height: auto;
  }
  
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.7);
    border: none;
    cursor: pointer;
    padding: 10px;
  }
  
  .prev {
    left: 10px;
  }
  
  .next {
    right: 10px;
  }
  </style>
  