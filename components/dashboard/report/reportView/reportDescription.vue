<script setup lang="ts">
import useLocationStore from "~/stores/locationStore";
import statusEnum from "~/enums/modules/StatusEnum";

const locationStore = useLocationStore()
const route = useRoute()
const id = route.params.id;

const statuses = Object.values(statusEnum)
const props = defineProps({
  report: {required: true},
})
const deleteReport = async function(){
  await useApi(`/api/report/${id}`, {
    method: 'DELETE',
  }).catch((error) => error.data);
  await navigateTo(`/`);
}
const editReport = async function(){
  editMode.value = !editMode.value
  // await useApi(`/api/report/${id}`, {
  //   method: 'DELETE',
  // }).catch((error) => error.data);
  // await navigateTo(`/`);
}
const author = await locationStore.getLocation(props.report.id)
const editMode = ref(false)
const deleteMode = ref(false)
let report = ref({
  status: null,
  content: null,
  title: null,
})

</script>

<template>
  <v-card-actions>
    <v-btn v-if="!editMode && !deleteMode" @click="()=>{editMode = !editMode; report.status = props.report.status; report.content = props.report.content; report.title = props.report.title}" icon="mdi-pencil"></v-btn>
    <v-btn v-if="!editMode && !deleteMode" @click="()=>{deleteMode = !deleteMode}" icon="mdi-trash-can"></v-btn>

    <v-btn v-if="editMode" @click="editReport" icon="mdi-check"></v-btn>
    <v-btn v-if="editMode" @click="()=>{editMode = !editMode;}" icon="mdi-cancel"></v-btn>

    <v-btn v-if="deleteMode" @click="deleteReport" icon="mdi-check"></v-btn>
    <v-btn v-if="deleteMode" @click="()=>{deleteMode = !deleteMode;}" icon="mdi-cancel"></v-btn>
  </v-card-actions>
  <v-card>
    <v-card-item>
    <p>{{author.name}}</p>
    <p>{{author.city}} {{author.postcode}}</p>
    <p>{{author.street}}</p>
    <p>Utworzone: {{new Date(props.report.created_at).toDateString()}}</p>
      <v-row>
        <v-col cols="12">
          <v-select v-model="report.status" v-if="editMode" :items="statuses" ></v-select>
          <v-card-text v-else>{{props.report.status}}</v-card-text>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="report.title" v-if="editMode"></v-text-field>
          <v-card-text v-else>{{props.report.title}}</v-card-text>
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="report.content" v-if="editMode"></v-textarea>
          <v-card-text v-else> {{props.report.content}}</v-card-text>
        </v-col>
      </v-row>
    </v-card-item>

  </v-card>
</template>

<style scoped>

</style>