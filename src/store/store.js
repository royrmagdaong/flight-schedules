import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        flights: []
    },
    mutations:{
        SET_FLIGHTS(state, data){
            state.flights = data
        },
        ADD_FLIGHT(state, data){
            state.flights.unshift(data)
        },
        DELETE_FLIGHT(state, data){
            state.flights = state.flights.filter(function(ele){ return ele.id != data; });
        },
        UPDATE_FLIGHT(state, data){
            var flightIndex = state.flights.findIndex((obj => obj.id == data.id));
            state.flights[flightIndex] = data;
            var lastItem = state.flights[state.flights.length-1];
            state.flights.pop();
            state.flights.push(lastItem);
        }
    },
    actions:{
        setFlights: (context, payload) => {
            context.commit('SET_FLIGHTS', payload);
        },
        addFlight: (context, payload) => {
            context.commit('ADD_FLIGHT', payload);
        },
        deleteFlight: (context, payload) => {
            context.commit('DELETE_FLIGHT', payload);
        },
        updateFlight: (context, payload) => {
            context.commit('UPDATE_FLIGHT', payload);
        }
    },
    getters:{
        getFlights: state => state.flights
    }
})