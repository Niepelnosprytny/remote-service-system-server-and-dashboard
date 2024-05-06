<script setup lang="ts">
import useAuthStore from "~/stores/authStore";
import useReportStore from "~/stores/reportStore";
import useLocationStore from "~/stores/locationStore";

const props = defineProps({
  report: {required: true},
})
const locationStore = useLocationStore()
const store = useAuthStore();
const reportStore = useReportStore()
const {$reportListWs} = useNuxtApp();
const location = await locationStore.getLocation(props.report.location_id)
const deleteReport = async function (id) {
  $reportListWs.send('delete')
  await useApi(`/api/report/${id}`, {
    method: 'DELETE',
  }).catch((error) => error.data);
  await reportStore.updateReportList()
}
const date = new Date(props.report.created_at).toLocaleDateString('en-GB')
const hover = ref()

</script>

<template>


  <v-card v-on:mouseover="()=>{hover = props.report.id}" v-on:mouseleave="()=>{hover = null}"
          :class="{ solved: props.report.status==='Rozwiązane', open: props.report.status==='Otwarte', inProgress: props.report.status==='W trakcie realizacji', duplicate: props.report.status==='Duplikat' }">
    <v-row style="min-height: 80px; margin: 0">
      <v-col align-self="center" cols="12">
        <nuxt-link class="link" v-if="props.report" :to='"/report/"+props.report.id'>
          <v-row align="center" justify="center">
            <v-card
                style="position: absolute; width: 100%; height: 100%; background-color: black; opacity: 30%; margin: 0"
                v-if="hover == props.report.id">
            </v-card>
            <v-col cols="4">
              <v-card-text>
                <h3>{{ props.report.title }}</h3>
              </v-card-text>
            </v-col>
            <v-col cols="3">
              <v-card-text>
                {{ location.name }}
              </v-card-text>
            </v-col>
            <v-col cols="2">
              <v-card-text>
                {{ date }}
              </v-card-text>
            </v-col>
            <v-col cols="2">
              <v-card-text>
                {{ props.report.status }}
              </v-card-text>
            </v-col>
            <v-col cols="1" style="padding-right: 25px;" v-if="store.isAdmin()">
              <v-btn style="background-color: #fffaf3;" @click="deleteReport(props.report.id)" v-if="store.isAdmin()"
                     icon="mdi-trash-can"></v-btn>
            </v-col>
          </v-row>
        </nuxt-link>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.link {
  color: black;
  text-decoration: none;
}

.linkHover {
  filter: brightness(0.8);
}

.solved {
  background-image: linear-gradient(90deg, rgba(245, 87, 7, 1) 0%, rgba(245, 122, 7, 1) 95%);
}

.open {
  background-color: #fffaf3;
}

.inProgress {
  background-image: linear-gradient(90deg, rgba(162, 245, 7, 1) 39%, rgba(93, 206, 79, 1) 100%);
}

.duplicate {
  background-image: linear-gradient(90deg, rgba(7, 99, 245, 1) 0%, rgba(7, 178, 245, 1) 95%);
}
</style>