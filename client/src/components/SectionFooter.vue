<template>
  <v-footer
    dark
    height="auto"
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="blue darken-3">
        <strong class="subheading">¡Contáctanos en nuestras redes sociales!</strong>

        <v-spacer></v-spacer>
        
        <v-btn class="mx-3"
               dark
               icon
               href="https://github.com/mandresbr/fibco"
        >
          <v-icon size="24px">fab fa-github</v-icon>
        </v-btn>

        <v-btn class="mx-3"
               dark
               icon
               href="#"
        >
          <v-icon size="24px">fab fa-twitter</v-icon>
        </v-btn>

        <v-btn class="mx-3"
               dark
               icon
               href="https://linkedin.com/in/mandresbr"
        >
          <v-icon size="24px">fab fa-linkedin</v-icon>
        </v-btn>

        <v-btn class="mx-3"
               dark
               icon
               href="https://instagram.com/fibcodelays"
        >
          <v-icon size="24px">fab fa-instagram</v-icon>
        </v-btn>

      </v-card-title>

      <v-card-actions class="justify-center" color="primary">
        &copy;2018 — <strong>FIBCO</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({

    })
}
</script>

<style>
.footer-text {
  font-family: 'Raleway', sans-serif;
  color: #2c3e50;
}
.footer-divider {
  margin-bottom: 20px;
  margin-top: -20px;
}
.stacking {
  margin-bottom: -10px;
}
</style>
