<template>
  <v-container text-xs-center mx-5>
    <v-divider></v-divider>
    <v-flex mt-5 ma-2>
        <h3 class="display-1 product-title mt-1">Nuestro equipo</h3>
    </v-flex>
    <v-layout
    column
    justify-center
  >

    <v-expansion-panel popout>
      <v-expansion-panel-content
        v-for="(message, i) in messages"
        :key="i"
        hide-actions
      >
        <v-layout
          slot="header"
          align-center
          row
          spacer
        >
          <v-flex xs4 sm2 md1>
            <v-avatar
              slot="activator"
              size="36px"
            >
              <img
                v-if="message.avatar"
                src="https://avatars1.githubusercontent.com/u/21285099?s=400&u=1053798f2e6ed54d5954991b7f555880d2af6bfb&v=4"
                alt="Avatar"
              >
              <v-icon
                v-else
                :color="message.color"
                v-text="message.icon"
              ></v-icon>
            </v-avatar>
          </v-flex>

          <v-flex sm5 md3 hidden-xs-only>
            <strong v-html="message.name"></strong>
            <span
              v-if="message.total"
              class="grey--text"
            >
              &nbsp;({{ message.total }})
            </span>
          </v-flex>

          <v-flex no-wrap xs5 sm3>
            <v-chip
              v-if="message.new"
              :color="`${message.color} lighten-4`"
              class="ml-0"
              label
              small
            >
              {{ message.new }} new
            </v-chip>
            <strong v-html="message.title"></strong>
          </v-flex>

          <v-flex
            v-if="message.excerpt"
            class="grey--text"
            ellipsis
            hidden-sm-and-down
          >
            &mdash;
            {{ message.excerpt }}
          </v-flex>
        </v-layout>

        <v-card>
          <v-divider></v-divider>
          <v-card-text v-text="lorem" ></v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      messages: [
        {
          avatar: 'https://avatars1.githubusercontent.com/u/21285099?s=400&u=1053798f2e6ed54d5954991b7f555880d2af6bfb&v=4',
          name: 'Mario Bolaños',
          title: 'Full-Stack Developer y CEO de FIBCO',
          excerpt: 'Gracias por elegir FIBCO, te pagamos si tu vuelo se retrasa'
        }
      ],
      lorem: "Mario Bolaños es nuestro CEO, se encarga de absolutamente todo, desde el frontend hasta el backend. Todo un full stack developer."
      
    })
  }
</script>

<style>
</style>
