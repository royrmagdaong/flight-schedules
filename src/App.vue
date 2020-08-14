<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h3>FLIGHTS</h3>
      <h3 class="ml-2 font-weight-light">Schedules</h3>

      <v-spacer></v-spacer>

      <!-- DIALOGS -->
      <div class="text-center">
        <v-dialog
          v-model="dialog"
          width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              v-bind="attrs"
              v-on="on"
              class="pa-0"
            >
              <v-icon right>
                mdi-plus-circle-outline
              </v-icon>
              <span class=" ml-2">Add Flight</span> 
            </v-btn>
          </template>

          <v-card>
            <v-card-title class=" primary white--text text-subtitle-1">
              Add Flight
            </v-card-title>

            <div class="mt-4 mx-4">
              <v-select
                v-model="selectAirplaneName"
                :items="items"
                label="Airplane Name"
                outlined
                dense
              ></v-select>
              <v-textarea
                outlined
                name="input-7-4"
                label="Additional Information"
                value=""
                height="100"
                dense
                v-model="additionalInfo"
              ></v-textarea>
              <v-text-field
                label="Passenger Count"
                v-model="passengerCount"
                outlined
                dense
              ></v-text-field>
              <!-- Date Picker -->
              <v-menu
                v-model="schedule"
                :close-on-content-click="false"
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    outlined
                    dense
                    :value="computedDateFormattedMomentjs"
                    clearable
                    label="Shedule"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="date = null"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @change="schedule = false"
                ></v-date-picker>
              </v-menu>
              <!-- Date Picker End -->
            </div>

            <v-divider></v-divider>

            <v-card-actions class="px-4">
              <v-btn
                color="primary"
                text
                outlined
                @click="addFlight"
              >
                CONFIRM
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="warning"
                text
                outlined
                @click="dialog = false"
              >
                CANCEL
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    <!-- End of Dialog  -->
    
    </v-app-bar>


    <v-main>
      <!-- content here -->
      <v-container>
        <v-row>
          <!-- Calendar Section -->
          <v-col cols="12" sm="4" >
            <app-calendar></app-calendar>
          </v-col>

          <!-- Flights Schedule List -->
          <v-col cols="12" sm="8" >
            <div v-for="flight in getFlights" :key="flight.id" class="mb-2">
              <app-flight-list :flights="flight"></app-flight-list>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import Calendar from './components/Calendar'
import Flight from './components/Flight'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';

const axios = require('axios');

export default {
  name: 'App',

  components: {
    'app-calendar': Calendar,
    'app-flight-list': Flight
  },
  created(){

    axios.get('data.json').then( response => {
      // handle success
      this.$store.dispatch('setFlights', response.data)
      console.log(response.data);
    }).catch( error => {
      // handle error
      console.log(error);
    })
  },
  data: () => ({
    dialog: false,
    selectAirplaneName: '',
    items: [
      'Cirrus SR22',
      'Boeing 787',
      'Lockheed SR-71 Blackbird',
      'Learjet 23',
      'Douglas DC-3'
    ],
    date: '',
    schedule: false,
    passengerCount:'',
    additionalInfo:'',
  }),
  computed: {
    getFlights(){
      return this.$store.getters['getFlights']
    },
    computedDateFormattedMomentjs () {
      return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
    },
  },
  methods:{
    addFlight(){
      if(this.selectAirplaneName === '' || this.additionalInfo === '' || this.passengerCount === '' || this.date === ''){
        alert('all fields must be filled up!')
      }else{
        this.dialog = false;
        this.$store.dispatch('addFlight', {
            id:uuidv4(),
            airplaneName: this.selectAirplaneName,
            additionalInfo: this.additionalInfo,
            passengerCount: this.passengerCount,
            date: this.date
          });
        
        // clear
        this.selectAirplaneName = '';
        this.additionalInfo = '';
        this.passengerCount = '';
        this.date = '';
      }
    }
  }
};
</script>
