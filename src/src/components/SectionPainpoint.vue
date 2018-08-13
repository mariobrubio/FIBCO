<template>
  <v-container text-xs-center my-2 >
    <v-layout>
      <v-flex>
        <h3 class="display-1 product-title mt-1">Adquiere tu póliza</h3>
        <p class="mt-3">Ingresa el número y fecha de salida del vuelo que quieres asegurar.</p>
      </v-flex>
    </v-layout>
    <v-divider/>
	<div class="px-5">
		<form class="mx-5">
			<v-menu
	        ref="menu"
	        :close-on-content-click="false"
	        v-model="menu"
	        :nudge-right="40"
	        :return-value.sync="date"
	        lazy
	        transition="scale-transition"
	        offset-y
	        full-width
	        min-width="290px"
	      >
	        <v-text-field
	          slot="activator"
	          v-model="date"
	          :error-messages="dateErrors"
	          label="Fecha de salida"
	          required
	          prepend-icon="event"
	          readonly
	        ></v-text-field>
	        <v-date-picker v-model="date" no-title scrollable locale="es-419">
	          <v-spacer></v-spacer>
	          <v-btn flat color="primary" @click="menu = false">Cancelar</v-btn>
	          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
	        </v-date-picker>
	      </v-menu>

	    	<v-text-field
		      v-model="name"
		      :error-messages="numberErrors"
		      :counter="7"
		      label="Número de tiquete"
		      required
		      prepend-icon="input"
		      @input="$v.name.$touch()"
		      @blur="$v.name.$touch()"
		    ></v-text-field>
		    
		    
		    <v-checkbox
		      v-model="checkbox"
		      :error-messages="checkboxErrors"
		      label="Confirmo que tengo el tiquete con el número especificado"
		      required
		      @change="$v.checkbox.$touch()"
		      @blur="$v.checkbox.$touch()"
		    ></v-checkbox>

		    <v-btn @click="submit">Buscar</v-btn>
		    <v-btn @click="clear">Limpiar</v-btn>
	  	</form>
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
      email: { required, email },
      date: {required},
      select: { required },
      checkbox: { required }
    },

    data: () => ({
      name: '',
      email: '',
      date: null,
      menu: false,
      modal: false,
      menu2: false,
      checkbox: false
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
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
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
        this.select = null
        this.checkbox = false
      }
    }
  }
</script>

<style>
</style>
