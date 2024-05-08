<script setup lang="ts">
import useLocationStore from "~/stores/locationStore";
import statusEnum from "~/enums/modules/StatusEnum";
import useFileStore from "~/stores/fileStore";
import useClientStore from "~/stores/clientStore";

const {$reportListWs} = useNuxtApp();
const locationStore = useLocationStore()
const clientStore = useClientStore()
const route = useRoute()
const id = route.params.id;
const dialogControl = ref(false)
const indexComm = ref()
const index = ref()
const currentFile = ref()
const emits = defineEmits(['update'])
const statuses = Object.values(statusEnum)
const props = defineProps({
  report: {required: true},
})
const deleteReport = async function () {
  $reportListWs.send('delete')
  await useApi(`/api/report/${id}`, {
    method: 'DELETE',
  }).catch((error) => error.data);
  await navigateTo(`/`);
}
const fileStore = useFileStore()
const files = await fileStore.getFilesForReport(props.report.id)
const location = await locationStore.getLocation(props.report.location_id)
const client = await clientStore.getClient(location.client)
const editMode = ref(false)
const deleteMode = ref(false)
let report = ref({
  status: null,
  content: null,
  title: null,
})
const editReport = async function () {
  editMode.value = !editMode.value
  await useApi(`/api/report/${props.report.id}`, {
    method: 'PATCH',
    body: {status: report.value.status, title: report.value.title, content: report.value.content},
  }).catch((error) => error.data);
  $reportListWs.send('edit')
  await emits('update')
}

</script>

<template>
  <v-card style="height: 80vh; margin: 20px;">
    <v-container style="text-align: center; height: 10%">
    <v-row >
      <v-col cols="4">
        <v-card-text style="border-bottom: 1px dashed black;">Zgłoszenie {{ props.report.id }}</v-card-text>
      </v-col>
      <v-col cols="4">
        <v-select v-model="report.status" v-if="editMode" :items="statuses"></v-select>
        <v-card-text style="border-bottom: 1px dashed black;" v-else>{{ props.report.status }}</v-card-text>
      </v-col>
      <v-col cols="4">
        <v-card-text style="border-bottom: 1px dashed black;">Utworzone: {{ new Date(props.report.created_at).toLocaleDateString() }}</v-card-text>
      </v-col>
    </v-row>
    </v-container>
    <v-container style="border-bottom: 1px dashed black; height: 55%">
      <v-row>
        <v-col v-if="editMode" style="text-align: center;height: 5%;" cols="12">
          <v-text-field v-model="report.title"></v-text-field>
        </v-col>
        <v-col v-else style="text-align: center;height: 5%;" cols="12">
          <v-card-text style="border-bottom: 1px dashed black;">{{ props.report.title }}</v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card-text style="border-bottom: 1px dashed black;">{{ client.name }}</v-card-text>
        </v-col>
        <v-col cols="6">
          <v-card-text style="border-bottom: 1px dashed black;">{{ location.city }} {{ location.postcode }} ul. {{ location.street }}</v-card-text>
        </v-col>
      </v-row>
      <v-row>
      <v-col cols="12">
        <v-textarea v-model="report.content" v-if="editMode"></v-textarea>
        <v-card-text v-else style="overflow-y: auto; max-height: 200px"> {{ props.report.content }}</v-card-text>
      </v-col>
      </v-row>
    </v-container>
    <v-container style="height: 25%">
    <v-row style="padding: 0 20px 0 20px; overflow-y: auto">
      <v-col
          cols="3"
          style="margin: 5px; padding: 0"
          v-for="(file,index) in files"
          v-if="files.length>0">
        <v-card v-if="file.filetype == 'document'" style="min-height: 120px; max-height: 120px; height: 100%; width: 100%;">
          <a style="color: black" :href="useRequestURL().origin+'/files/'+file.filename" target="_blank"
             :download="file.filename">
            <v-chip>{{ file.filename }}</v-chip>
            <v-icon size="60" style=" height: 70%; width: 100%; overflow: auto">mdi-file-document-outline</v-icon>
          </a>
        </v-card>
        <v-card v-if="file.filetype == 'image'" style="min-height: 120px; max-height: 120px; height: 100%">
        <v-img
            v-on:mouseover="hoverEvent(index,indexComm)"
            v-on:mouseleave="hoverEvent(null,null)"
            :src="useRequestURL().origin+'/files/'+file.filename"
        style="height: 100%; width: 100%">
          <v-card class="on-hover d-flex"
                  style="align-items: center;justify-content: center;opacity: 0.4; height: 100%; width: 100%"
                  v-if="hover == index && indexComm == hoverComm">
            <v-spacer></v-spacer>
            <v-btn :onclick="()=>{dialogControl=true; currentFile=file}">
              <v-icon icon="mdi-eye"></v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <a :href="useRequestURL().origin+'/files/'+file.filename" target="_blank" :download="file.filename">
              <v-btn>
                <v-icon icon="mdi-download"></v-icon>
              </v-btn>
            </a>
            <v-spacer></v-spacer>

          </v-card>

        </v-img>
        </v-card>
        <v-card v-if="file.filetype == 'video' && file.filename.length>0" style="min-height: 120px; max-height: 120px; height: 100%">
        <video
               style="width: 100%; height: 100%; max-height: 130px" controls>
          <source :src="useRequestURL().origin+'/files/'+file.filename">
          Your browser does not support the video tag.
        </video>
        </v-card>
      </v-col>
    </v-row>
    </v-container>
    <v-container style="padding: 10px; height: 10%">
    <v-row >
      <v-col style="text-align: right;">
        <v-btn style="margin: 5px" v-if="!editMode && !deleteMode"
               @click="()=>{editMode = !editMode; report.status = props.report.status; report.content = props.report.content; report.title = props.report.title}"
               icon="mdi-pencil"></v-btn>
        <v-btn style="margin: 5px" v-if="!editMode && !deleteMode" @click="()=>{deleteMode = !deleteMode}"
               icon="mdi-trash-can"></v-btn>

        <v-btn style="margin: 5px" v-if="editMode" @click="editReport" icon="mdi-check"></v-btn>
        <v-btn style="margin: 5px" v-if="editMode" @click="()=>{editMode = !editMode;}" icon="mdi-cancel"></v-btn>

        <v-btn style="margin: 5px" v-if="deleteMode" @click="deleteReport" icon="mdi-check"></v-btn>
        <v-btn style="margin: 5px" v-if="deleteMode" @click="()=>{deleteMode = !deleteMode;}" icon="mdi-cancel"></v-btn>
      </v-col>
    </v-row>
    </v-container>
  </v-card>
</template>

<style scoped>

</style>