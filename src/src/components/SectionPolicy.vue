<template>
  <v-container text-xs-center my-2 >
    <v-layout>
      <v-flex>
        <h3 class="display-1 product-title mt-1">Adquiere tu póliza</h3>
        <p class="mt-3">Ingresa el número y fecha de salida del vuelo que quieres asegurar.</p>
      </v-flex>
    </v-layout>

      <div class="px-2">
        <form class="mx-2" @submit.stop.prevent="showDialog" >
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            data-vv-name="date"
            persistent
            lazy
            full-width
            width="290px"
          >
            <v-text-field
              slot="activator"
              :error-messages="errors.collect('date')"
              v-validate="'required'"
              v-model="date"
              prepend-icon="event"
              label="Fecha de salida"
              data-vv-name="date"
              required
            ></v-text-field>
            <v-date-picker v-model="date" 
                           locale="es-419" 
                           @input="$refs.dialog.save(date)"
                           :min="today"                       
                           ></v-date-picker>

          </v-dialog>
          <v-text-field
            v-validate="'required|max:7'"
            v-model="name"
            :counter="7"
            :error-messages="errors.collect('name')"
            label="Número de vuelo"
            prepend-icon="input"
            data-vv-name="name"
            required
          ></v-text-field>
          
          
          <v-checkbox
            v-validate="'required'"
            v-model="checkbox"
            :error-messages="errors.collect('checkbox')"
            value="1"
            label="Confirmo que tengo el tiquete con el número de vuelo especificado"
            data-vv-name="checkbox"
            type="checkbox"
            required
          ></v-checkbox>

          <v-btn @click="submit">buscar</v-btn>
          <v-btn @click="clear">limpiar</v-btn>
        </form>
        <v-dialog
            v-model="dialog"
            width="500"
          >

            <v-card>
              <v-card-title
                class="headline blue darken-3"
                primary-title
              >
                Su Póliza
              </v-card-title>

              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </v-card-text>

              <v-divider></v-divider>

              
            </v-card>
        </v-dialog>
      </div>
          


  </v-container>
</template>

<script>
  import Vue from 'vue'
  import VeeValidate from 'vee-validate'

  Vue.use(VeeValidate)

  export default {
    $_veeValidate: {
      validator: 'new'
    },

    data: () => ({
      name: '',
      date: '',
      today: new Date().toISOString().substr(0, 10),
      dialog:false,
      modal: false,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      checkbox: null,
      dictionary: {
        attributes: {
          date: 'Fecha de salida'
          // custom attributes
        },
        custom: {
          name: {
            required: () => 'El número de vuelo no puede estar vacío',
            max: 'El número de vuelo no puede ser mayor de 7 caracteres'
            // custom messages
          },
          date: {
            required: () => 'La fecha de salida no puede estar vacía',
          },
          checkbox: {
            required: () => 'Debes aceptar que tienes el tiquete',
          }
          
        }
      }
    }),

    mounted () {
      this.$validator.localize('es', this.dictionary)
    },

    methods: {
      submit () {
        this.$validator.validateAll()
      },
      clear () {
        this.name = ''
        this.date = ''
        this.today=''
        this.dialog=''
        this.checkbox = null
        this.$validator.reset()
      },
      showDialog (){
        if(this.checkboxErrors.length > 0 || this.numberErrors.length > 0 || this.dateErrors.length > 0) {
        // no hacer nada pues hay algun error en algun campo
          return 
        } else {
          // abrir dialogo pues las rules dicen que esta todo OK
          this.dialog = true
        }
      }
    }
  }
</script>

<style>
</style>
