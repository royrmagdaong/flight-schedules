<template>
  <v-card
    class="mx-auto"
    outlined
  >
    <v-card-title>
        <div>{{flights.airplaneName}}</div>
    </v-card-title>

    <v-card-subtitle class="pl-2">
        <v-icon right small color="primary" class="pb-1">
            mdi-calendar-month-outline
        </v-icon>
        <span class="primary--text font-weight-light ml-1">{{ formatDate(flights.date) }}</span>
        
        
    </v-card-subtitle>

    <v-card-text>
        <div class="text-body-1">
            {{flights.additionalInfo}}
        </div>
        <div class="mt-2 ">
            Passenger Count: <b>{{flights.passengerCount}}</b> Person/s
        </div>
    </v-card-text>

    <v-card-actions class="px-4 pt-0">

      <!-- Update Dialog -->
      <div class="text-center">
        <v-dialog
          v-model="updateDialog"
          width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              outlined color="primary"
              class="pr-5 px-2"
              v-bind="attrs"
              v-on="on"
              @click="fillUpdateForm(flights)"
            >
              <v-icon right>
                mdi-pencil-outline
              </v-icon>
              <span class=" ml-2">Edit</span> 
            </v-btn>
          </template>

          <v-card>
            <v-card-title class=" primary white--text text-subtitle-1">
              Edit Flight
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
                @click="updateFlight(flights.id)"
              >
                Update
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="warning"
                text
                outlined
                @click="updateDialog = false"
              >
                CANCEL
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <!-- Update Dialog END -->

      <v-spacer></v-spacer>

      <!-- Delete Confirmation Dialog -->
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            outlined color="warning"
            v-bind="attrs"
            v-on="on"
            
            >
            Cancel Flight
            </v-btn>
        </template>

            <v-card>
                <v-card-title>
                    Please Confirm
                </v-card-title>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="warning"
                    outlined
                    @click="deleteFlight(flights.id)"
                >
                    Cancel Flight
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      <!-- Delete Confirmation Dialog END -->

    </v-card-actions>
  </v-card>
</template>

<script>
import moment from 'moment'

export default {
    props:['flights'],

    data:() => ({
        dialog: false,
        updateDialog: false,
        selectAirplaneName: '',
        items: [
        'Cirrus SR22',
        'Boeing 787',
        'Lockheed SR-71 Blackbird',
        'Learjet 23',
        'Douglas DC-3'
        ],
        additionalInfo: '',
        passengerCount: '',
        schedule: false,
        date: ''
    }),
    created(){
        this.selectAirplaneName = this.flights.airplaneName;
        this.additionalInfo = this.flights.additionalInfo;
        this.passengerCount = this.flights.passengerCount;
        this.date = this.flights.date;
    },
    computed: {
        computedDateFormattedMomentjs () {
            return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
        },
    },
    methods:{
        formatDate(date){
            return moment(date).format('dddd, MMMM Do YYYY');
        },
        deleteFlight(id){
            this.$store.dispatch('deleteFlight', id);
            this.dialog = false;
        },
        fillUpdateForm(flight){
            this.selectAirplaneName = flight.airplaneName;
            this.additionalInfo = flight.additionalInfo;
            this.passengerCount = flight.passengerCount;
            this.date = flight.date;
        },
        updateFlight(id){
            var flightObj = {
                id: id,
                airplaneName: this.selectAirplaneName,
                additionalInfo: this.additionalInfo,
                passengerCount: this.passengerCount,
                date: this.date
            }
            this.$store.dispatch('updateFlight', flightObj);
            this.updateDialog = false;
        }
    }
}
</script>

<style>

</style>