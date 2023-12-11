<script setup lang="ts">
import useAuthStore from "~/stores/auth";

const props = defineProps({
  report: {required: true},
})
const store = useAuthStore();
const deleteReport = async function(id){
  await useApi(`/api/report/${id}`, {
    method: 'DELETE',
  }).catch((error) => error.data);
}

</script>

<template>
  <nuxt-link v-if="props.report" :to='"/report/"+props.report.id'>
    <v-card>
      <v-row align="center">
      <v-col>
        <v-card-text>
        {{ props.report.title }}
        </v-card-text>
      </v-col>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      <v-col>
        <v-btn @click="deleteReport(props.report.id)" v-if="store.isAdmin()" icon="mdi-trash-can"></v-btn>
      </v-col>
      </v-row>
    </v-card>
  </nuxt-link>
</template>

<style scoped>

</style>