<template>
  <!-- <v-date-picker readonly full-width elevation="1">

  </v-date-picker> -->

  <v-date-picker v-model="picker" readonly full-width elevation="1" :show-current="false"></v-date-picker>
</template>

<script>
export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 10),
      }
    },
}
</script>

<style>

</style>