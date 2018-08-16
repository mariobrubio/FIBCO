<template>
  
  <v-toolbar app class="white"
      absolute
      scroll-off-screen
      scroll-target="#poliza"
    >
    <v-spacer class="hidden-sm-and-up brand-spacer"/>
    <v-toolbar-title class="text-xs-center brand-logo">
      <v-icon x-large class="primary--text brand-icon">flight_takeoff</v-icon>FIBCO<span class="blue--text text--darken-3 hidden-sm-and-down accented-text"> Flight Delay Compensation</span>
    </v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items class="hidden-xs-only">
        <v-btn v-for="item in menu" :key="item.name" :href="item.href" flat color="primary">{{ item.name }}</v-btn>
    </v-toolbar-items>
  </v-toolbar>

</template>

<script>
export default {
  props: ['menu']
}
</script>

<style>

</style>
