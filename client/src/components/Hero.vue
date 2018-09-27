<template>
  <v-parallax :src="getImgUrl('airport2.jpg')" height="600">
    <v-layout
      column
      align-center
      justify-center
      class="white--text"
    >
      <!-- <img :src="getImgUrl('fibco.png')" alt="fibco.js" height="200"> -->
      <div class="subheading mb-1 hero-text-sub text-xs-center">Blockchain | Compensación | Retrasos Aéreos</div>
      <p class="white--text hero-text-header mb-2 display-2 text-xs-center">Asegura tu vuelo en caso de un retraso</p>
      <div class="subheading mb-3 hero-text-sub text-xs-center">Compra una póliza de <span class="brand-text">FIBCO</span> y obtiene una compensación <span class="brand-text">rápida, inmediata y flexible</span> </div>
      <v-btn
        color="primary" dark
        href="#poliza"
      >
        Empieza ahora
      </v-btn>
    </v-layout>
  </v-parallax>
</template>

<script>
export default {
  methods: {
    getImgUrl (img) {
      return require('@/assets/' + img)
    }
  }
}
</script>

<style>
.hero-text-header {
  font-family: 'Zilla Slab', serif;
}
.hero-text-sub {
  font-family: 'Raleway', sans-serif;
}
.brand-text {
  font-weight: bold;
}
</style>
