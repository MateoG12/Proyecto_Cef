<template>
  <div class="slider">
    <div class="slides" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div class="slide" v-for="(image, index) in images" :key="index">
        <img :src="image" alt="" />
      </div>
    </div>
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
      images: [carrusel1, carrusel2, carrusel3, carrusel4, carrusel5, carrusel6],
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    autoSlide() {
      setInterval(this.nextSlide, 10000); 
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
  width: 600px; 
  height: 400px; 
  border-radius: 10px; 
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); 
}

.slides {
  display: flex;
  transition: transform 0.5s ease; 
}

.slide {
  min-width: 100%; 
  box-sizing: border-box;
  margin: 0 auto; 
}

img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover; 
}

button {
  display: none; 
}


@keyframes slideAnimation {
  0% {
    transform: translateX(0);
  }
  33% {
    transform: translateX(-100%);
  }
  66% {
    transform: translateX(-200%);
  }
  100% {
    transform: translateX(0);
  }
}


.slides {
  animation: slideAnimation 12s infinite;
}
</style>