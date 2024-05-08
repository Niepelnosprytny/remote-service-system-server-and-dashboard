<script setup lang="ts">

const props = defineProps({
  author: { required: true },
})


</script>

<template>
  <v-card style="text-align: center; height: 6%; background-color: dodgerblue; border-bottom-left-radius: 0;border-bottom-right-radius: 0">
      <v-card-text>{{props.author.email}}</v-card-text>
  </v-card>
</template>

<style scoped>

</style>