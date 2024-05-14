<script setup lang="ts">

const props = defineProps({
  author: { required: true },
})


</script>

<template>
  <v-card style="text-align: center;justify-content: center; height: 10%; background-image: linear-gradient(135deg, #a82e3f 0%, #007A92 100%); color: white; border-bottom-left-radius: 0;border-bottom-right-radius: 0">
    <v-col>
    <v-card-text><b>{{props.author.email}}</b></v-card-text>
    </v-col>
  </v-card>
</template>

<style scoped>

</style>