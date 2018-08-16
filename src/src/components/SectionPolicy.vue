<template>
  <v-container text-xs-center my-2 >
    <v-layout>
      <v-flex>
        <h3 class="display-1 product-title mt-1">Adquiere tu póliza</h3>
        <p class="mt-3">Ingresa el número y fecha de salida del vuelo que quieres asegurar.</p>
      </v-flex>
    </v-layout>

      <div class="px-5">
        <form class="mx-5" @submit.stop.prevent="showDialog" >
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            lazy
            full-width
            width="290px"
          >
            <v-text-field
              slot="activator"
              :error-messages="dateErrors"
              required
              v-model="date"
              label="Fecha de salida"
              prepend-icon="event"
              @input="$v.date.$touch()"
              @blur="$v.date.$touch()"
            ></v-text-field>
            <v-date-picker v-model="date" 
                           locale="es-419" 
                           
                           @input="$refs.dialog.save(date)"
                           :min="today"                       
                           ></v-date-picker>

          </v-dialog>

            <v-text-field
              v-model="name"
              :error-messages="numberErrors"
              :counter="7"
              label="Número de vuelo"
              required
              prepend-icon="input"
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>
            
            <v-checkbox
              v-model="checkbox"
              :error-messages="checkboxErrors"
              label="Confirmo que tengo el tiquete con el número de vuelo especificado"
              required
              @change="$v.checkbox.$touch()"
              @blur="$v.checkbox.$touch()"
            ></v-checkbox>

            <v-btn @click="submit" color="primary" dark>Buscar</v-btn>
            <v-btn @click="clear" color="primary" dark>Limpiar</v-btn>
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
import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(7) },
      date: {required},
      checkbox: { required }
    },

    data: () => ({
      name: '',
      email: '',
      date: null,
      menu: false,
      modal: false,
      dialog: false,
      menu2: false,
      checkbox: false,
      dialog: false,
      today: new Date().toISOString().substr(0, 10)
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.required && errors.push('Debes aceptar que los datos son correctos!')
        return errors
      },
      numberErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('El número de tiquete debe ser de 7 caracteres')
        !this.$v.name.required && errors.push('Número de tiquete requerido.')
        return errors
      },
      dateErrors () {
        const errors = []
        if (!this.$v.date.$dirty) return errors
        !this.$v.date.required && errors.push('La fecha de salida es requerida')
        return errors
      }
    },

    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.date=''
        this.today=''
        this.checkbox = false
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
