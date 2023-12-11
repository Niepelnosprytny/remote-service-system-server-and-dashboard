<script setup lang="ts">
const route = useRoute()
const id = route.params.id;

const props = defineProps({
  report: {required: true},
})
const deleteReport = async function(){
  await useApi(`/api/report/${id}`, {
    method: 'DELETE',
  }).catch((error) => error.data);
}

</script>

<template>
  <v-card>
    {{props.report.title}}
    {{props.report.content}}
  <v-btn icon="mdi-pencil"></v-btn>
  <v-btn @click="deleteReport" icon="mdi-trash-can"></v-btn>
  </v-card>
</template>

<style scoped>

</style>