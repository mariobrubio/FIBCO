<template>
  <v-container grid-list-md mt-2>
    <v-divider class="mb-5"/>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg5 offset-md1>
        <h3 class="display-1 product-title text-xs-center mt-3">¿Por qué FIBCO?</h3>
        <p class="mt-4 demo-text primary--text"><v-icon left class="blue--text text--darken-3 demo-icon">done_all</v-icon> Instantáneo</p>
        <p>La compensación ante retrasos de vuelos nunca había sido tan fácil. El contrato inteligente de FIBCO compensa al usuario <strong>inmediatamente</strong> un vuelo se encuentra retrasado.</p>

        <p class="mt-4 demo-text primary--text"><v-icon left class="blue--text text--darken-3 demo-icon">autorenew</v-icon> Automático</p>
        <p> Con FIBCO no debes preocuparte por hacer absolutamente nada, el contrato inteligente <strong>por si mismo</strong> se encarga de realizar la compensación. Dile adiós a los largos procesos de compensación.</p>

        <p class="mt-4 demo-text primary--text"><v-icon left class="blue--text text--darken-3 demo-icon">security</v-icon> Seguro</p>
        <p>FIBCO está basado en Blockchain, por lo tanto es practicamente <strong>inhackeable</strong>, dado que la información de cada póliza se encuentra totalmente <strong>distribuida</strong> y <strong>descentralizada</strong>.</p>

        <p class="mt-4 demo-text primary--text"><v-icon left class="blue--text text--darken-3 demo-icon">attach_money</v-icon> Flexible</p>
        <p>Recibe compensaciones <strong>distintas</strong> dependiendo de la póliza que elijas, con tarifas justas y tiempos de retraso variables.</p>

        <v-divider class="hidden-sm-and-up"></v-divider>
      </v-flex>
      <v-flex xs12 sm6 md5 lg4 offset-md1 offset-lg2 xl3>
        <v-card class="blue darken-3" dark >
          <v-card-text>
            <v-card>
            <v-card-media :src="getImgUrl('blockchain2.png')" height=300></v-card-media>
            </v-card>
            </v-card-text>
            <v-card-title primary class="demo-title white--text"><v-icon x-large>vpn_lock </v-icon>  Blockchain</v-card-title>
            <v-card-text class="demo-text">
            <p>Toda póliza adquirida en FIBCO se almacena en una Blockchain</p>
            <p>La información de las pólizas es inmutable, inhackeable. Una forma descentralizada de asegurarte ante un retraso de vuelo.</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
.demo-title {
  font-family: 'Raleway', sans-serif;
  font-size: 36px;
  font-weight: bold;
}
.demo-text {
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  font-weight: bold;
}
.demo-icon {
  margin-top: -5px;
}
</style>
