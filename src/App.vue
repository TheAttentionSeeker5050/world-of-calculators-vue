<script setup>
import { RouterLink, RouterView } from 'vue-router';
// import HelloWorld from './components/HelloWorld.vue'
import Header from "./components/globalComponents/Header.vue";
import Footer from './components/globalComponents/Footer.vue';

import './styles/custom.scss';


</script>

<template>
  <Header/>
  
  <RouterView />

  <Footer/>
</template>

<style scoped>

#main-page-wrapper {
  max-width: 800px;
  text-align: justify;
  margin-top: 35px;
  margin-bottom: 25px;
}


</style>
