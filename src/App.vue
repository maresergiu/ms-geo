<template>
    <div id="app">
        <header id="site-header">
            <div class="holder">
                <h2 class="sub-title">Header</h2>
            </div>
        </header>
        <main id="main">
            <div class="holder">
                <div
                    v-if="httpError !== null">
                    <p>{{httpError}}</p>
                </div>
                <div v-else>
                    <form name="capital">
                        <InputElement
                            :label="`Please type the capital city of ${countryName}`"
                            inputId="capital"
                            inputName="capital"
                            inputType="string"
                            placeholder="ex: London"
                            :hideLabel="false"
                            :triggerValidation="triggerValidation"
                            @emittedErrorInput="handleErrorInput"
                            @emittedValidInput="handleValidInput" />
                    </form>
                    <button
                        type="button"
                        class="cta"
                        @click="handleFormSubmit">
                        Submit
                    </button>
                    <div v-if="finalResult && formErros.length === 0">
                        <p>{{finalResult}}</p>
                    </div>
                </div>
            </div>
        </main>
        <footer id="site-footer">
            <div class="holder">
                <h2 class="sub-title">Footer</h2>
            </div>
        </footer>
    </div>
</template>

<script>
import './scss/main.scss'
import './scss/libs/normalize.scss'

import axios from 'axios'

import InputElement from './components/InputElement.vue'

export default {
    name: 'App',
    components: {
        InputElement
    },
    data () {
        return {
            triggerValidation: 0,
            capitalCities: [],
            randomNumber: 0,
            formErros: [],
            httpError: null,
            finalResult: null
        }
    },
    computed: {
        countryName (){
            return this.capitalCities.length ? this.capitalCities[this.randomNumber].name: ''
        }
    },
    methods: {
        handleErrorInput (obj) {
            this.formErros.push(obj)
        },
        handleValidInput (obj) {
            if(obj.value.toLowerCase() === this.capitalCities[this.randomNumber].capital.toLowerCase()){
                this.finalResult = `Final result is ${this.capitalCities[this.randomNumber].capital.toLowerCase()}`
            }
        },
        handleFormSubmit (){
            this.triggerValidation++
        },
        generateRandomNumber (range){
            this.randomNumber = Math.floor(Math.random() * range);
        }
    },
    mounted (){
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          this.generateRandomNumber(response.data.length)
          this.capitalCities = response.data
        })
        .catch(() => {
            this.httpError = 'Something went wrong.'
        });
    }
}
</script>
