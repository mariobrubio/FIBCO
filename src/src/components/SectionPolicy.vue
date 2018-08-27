<template>

  <v-container text-xs-center my-2 >
      
    <v-layout>
      <v-flex>
        <h3 class="display-1 product-title mt-5">Adquiere tu póliza</h3>
        <p class="mt-3">Ingresa el número y fecha de salida del vuelo que quieres asegurar.</p>
      </v-flex>
    </v-layout>

      <div class="px-2">
        <form class="mx-2"> <!-- @submit.stop.prevent="showDialog" -->
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

          <v-layout row wrap>

          <v-flex xs12 sm6>
            <v-text-field
              v-validate="'required|max:3'"
              v-model="name"
              :counter="3"
              mask="AAA"
              :error-messages="errors.collect('name')"
              label="Código de aerolínea (Ejemplo: AVA) -> Avianca"
              prepend-icon="input"
              data-vv-name="name"
              required
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6>
            <v-text-field
              v-validate="'required|max:4'"
              v-model="number"
              :counter="4"
              mask="####"
              :error-messages="errors.collect('number')"
              label="Número de vuelo (Ejemplo: 9220)"
              prepend-icon="input"
              data-vv-name="number"
              required
            ></v-text-field>
          </v-flex>

          </v-layout>          
          
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

          <v-btn :loading="dialog"
      :disabled="dialog" @click="submit" color="primary" dark>buscar</v-btn>
          <v-btn @click="clear" color="primary" dark>limpiar</v-btn>
        </form>
        <v-dialog
          v-model="dialog"
          width="500"
          persistent
        >

          <v-card>
            <v-card-title primary class="headline white--text justify-center primary"><v-icon medium class="mr-2 white--text justify-center">file_copy </v-icon> Tu Póliza FIBCO</v-card-title>
            
            
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Dinero a pagar</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                  label="COP"
                  value="20000"
                  prefix="$"
                  mask="######"
                ></v-text-field>
              </v-flex>
            </v-layout>


            <v-card-text>
            <section v-if="errored">
              <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
            </section>

            <section v-else>
              <div v-if="loading">Loading...</div>

              <div
                v-else
              >
                {{this.info}}
                <div v-if="info==number"> Su vuelo existe </div>
                <div v-else> El vuelo ingresado no existe</div>
              </div>

            </section>
              {{ this.name }}
              {{this.number}}
              {{ this.date.split('-')}}
            </v-card-text>

            <div class="text-xs-center">
              <v-btn round color="primary" dark href="https://www.mercadopago.com/mco/checkout/start?pref_id=244974715-9d789d9c-e316-4c32-a436-71881575835d">Pagar</v-btn>
            </div>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click.native="dialog = false"
              >
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
          


  </v-container>
</template>

<script>
  import axios from 'axios';
  export default {
    $_veeValidate: {
      validator: 'new'
    },

    data: () => ({
      name: '',
      number: '',
      url: '',
      date: '',
      today: new Date().toISOString().substr(0, 10),
      dialog:false,
      modal: false,
      info: null,     
      loading: true, 
      errored: false,
      checkbox: null,
      dictionary: {
        attributes: {
          date: 'Fecha de salida'
          // custom attributes
        },
        custom: {
          name: {
            required: () => 'El código de aerolínea no puede estar vacío',
            // custom messages
          },
          number:{
            required: () => 'El número de vuelo no puede estar vacío'
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
        var year = this.date.split('-')[0];
        var month = this.date.split('-')[1];
        var day = this.date.split('-')[2];
      
        this.$validator.validateAll().then(result => { if (result) {this.dialog = true}})
        this.url = 'https://powerful-shore-20248.herokuapp.com/https://api.flightstats.com/flex/schedules/rest/v1/json/flight/'+this.name+'/'+this.number+'/departing/'+year+'/'+month+'/'+day+'?appId=c0065ed6&appKey=c5a5abbec571e3aaf0a08c5dfa3bc046';
        axios
          .get(this.url)
          .then(response => {
            console.log(response)
            this.info = response.data.scheduledFlights[0].flightNumber
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)
      },
      clear () {
        this.name = ''
        this.date = ''
        this.number= ''
        this.today=''
        this.dialog=''
        this.checkbox = null
        this.$validator.reset()
      },
    }
  }
</script>

<style>
</style>
