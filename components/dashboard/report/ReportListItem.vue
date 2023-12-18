<script setup lang="ts">
import useAuthStore from "~/stores/authStore";
import useReportStore from "~/stores/reportStore";

const props = defineProps({
  report: {required: true},
})
const store = useAuthStore();
const reportStore = useReportStore()
const deleteReport = async function (id) {
  await useApi(`/api/report/${id}`, {
    method: 'DELETE',
  }).catch((error) => error.data);
  await reportStore.updateReportList()
}

</script>

<template>
  <v-card>
    <v-row style="margin-bottom: 4px; margin-top: 4px">
    <v-col cols="10">
      <nuxt-link v-if="props.report" :to='"/report/"+props.report.id'>
        <v-row align="center">
          <v-col>
            <v-card-text>
              {{ props.report.title }}
            </v-card-text>
          </v-col>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>

        </v-row>
      </nuxt-link>
    </v-col>
    <v-col>
      <v-btn @click="deleteReport(props.report.id)" v-if="store.isAdmin()" icon="mdi-trash-can"></v-btn>
    </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>

</style>