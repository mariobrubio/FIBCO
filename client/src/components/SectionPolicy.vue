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


            <v-card-text>
            <section v-if="errored">
              <p>En el momento, no podemos obtener la información de su vuelo. Intente más tarde.</p>
            </section>

            <section v-else>
              <div v-if="loading">Loading...</div>
              
              <div
                v-else
              >
                
                <div class="text-xs-center" v-if="length>0"> Su vuelo {{this.name}}{{this.number}} de la fecha {{this.date}}  está programado

                <section>

                <v-form ref="form" v-model="valid" lazy-validation>

                    <v-layout row>
                      <v-flex xs4>
                        <v-subheader>Dinero a pagar</v-subheader>
                      </v-flex>
                      <v-flex xs8>
                        <v-text-field
                          label="COP"
                          v-model.number="numberpay"
                          :rules="numberpayRules"
                          :counter="6"    
                          value="20000"
                          prefix="$"
                          mask="######"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>  

                    Precio a pagar ${{formatPrice(numberpay)}}

                     <v-data-table
                      :headers="headers"
                      :items="payoutInfo"
                      hide-actions
                      class="elevation-1"
                    >
                      <template slot="items" slot-scope="props">
                        <td class="text-xs-center">{{props.item.time}}</td>
                        <td class="text-xs-center">${{formatPrice(numberpay*props.item.payout)}}</td>
                      </template>
                    </v-data-table>
                      
                    
                    
                  </v-form>
              
            </section>

                </div>
                <div class="text-xs-center" v-else> El vuelo ingresado no existe
                  <section>

                <v-form ref="form" v-model="valid" lazy-validation>

                    <v-layout row>
                      <v-flex xs4>
                        <v-subheader>Dinero a pagar</v-subheader>
                      </v-flex>
                      <v-flex xs8>
                        <v-text-field
                          label="COP"
                          v-model.number="numberpay"
                          :rules="numberpayRules"
                          :counter="6"    
                          value="20000"
                          prefix="$"
                          mask="######"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>  

                    Precio a pagar ${{formatPrice(numberpay)}}

                     <v-data-table
                      :headers="headers"
                      :items="posts"
                      hide-actions
                      class="elevation-1"
                    >
                      <template slot="items" slot-scope="props">
                        <td class="text-xs-center">{{props.item.time}}</td>
                        <td class="text-xs-center">${{formatPrice(numberpay*props.item.payout)}}</td>
                      </template>
                    </v-data-table>
                      
                    
                    
                  </v-form>
              
            </section>

    

                </div>
              </div>

            </section>
            
            </v-card-text>          

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                        text-xs-center
                        :disabled="!valid"
                        @click="submitpay" color="primary" 
                      >
                        Pagar
                      </v-btn>
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
  import axios from 'axios'
  import PostsService from '@/services/PostsService'
  export default {
    $_veeValidate: {
      validator: 'new'
    },
    name: 'posts',
    data: () => ({
      name: '',
      number: '',
      numberpay: '',
      valid: true,
      numberpayRules: [
        v => !!v || 'El valor a pagar es requerido',
        v => (v && v<=200000) || 'El valor a pagar máximo es $200.000'
      ],
      url: '',
      date: '',
      today: new Date().toISOString().substr(0, 10),
      dialog:false,
      dialog2:false,
      modal: false,
      info:null,
      posts: [],
      length: 0,     
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
      },
      headers: [
          {
            text: 'Demora en minutos',
            align: 'center',
            sortable: false,
            value: 'time'
          },
          {
            text: 'Pago',
            align: 'center',
            sortable: false,
            value: 'pay'
          }
        ]
    }),



    mounted () {
      this.$validator.localize('es', this.dictionary),
      this.getPosts()
    },

    methods: {
      submit () {
        var year = this.date.split('-')[0];
        var month = this.date.split('-')[1];
        var day = this.date.split('-')[2];
      
        this.$validator.validateAll().then(result => { if (result) {this.dialog = true}})
        this.url = 'https://powerful-shore-20248.herokuapp.com/https://api.flightstats.com/flex/schedules/rest/v1/json/flight/'+this.name+'/'+this.number+'/departing/'+year+'/'+month+'/'+day+'?appId=46bf2338&appKey=6ee5bded617bc42090b48bb643fa4f9e';
        axios
          .get(this.url)
          .then(response => {
            console.log(response)
            this.length = response.data.scheduledFlights.length
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)
      },
      submitpay () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          window.location.href = "https://www.mercadopago.com/mco/checkout/start?pref_id=244974715-9d789d9c-e316-4c32-a436-71881575835d"
          axios.post('/api/submit', {
            numberpay: this.numberpay
          })
        }
      },
      formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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
      async getPosts () {
      const response = await PostsService.fetchPosts()
      this.posts = response.data
      }
    }
  }
</script>

<style>
</style>
