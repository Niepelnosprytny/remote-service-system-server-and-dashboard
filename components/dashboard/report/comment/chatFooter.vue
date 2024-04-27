<script setup lang="ts">
import useAuthStore from "~/stores/authStore";
import useCommentStore from "~/stores/commentStore";
import useFileStore from "~/stores/fileStore";
import {useWebSocket} from "@vueuse/core";
import useNotificationStore from "~/stores/notificationsStore";

const notifStore = useNotificationStore()
const fileStore = useFileStore()
const authStore = useAuthStore()
const {$chatWs} = useNuxtApp()

const commentStore = useCommentStore()
const props = defineProps({
  report: {required: true}
})
const loading = ref(true)
const dialogControl = ref(false)
const files = ref([])
const galleryHelper = ref([])
const content = ref('')
$chatWs.send(JSON.stringify({message: 'init', reportId: props.report.id}))
const {$notifWs} = useNuxtApp()

const sendComment = async function () {
  await notifStore.sendNotifications(props.report)
  $notifWs.send(content.value)
  const comment = {
    content: content.value,
    report_id: props.report.id,
    created_by: authStore.getId()
  };
  loading.value = true
  let commentId = await useApi(`/api/comment`, {
    method: 'POST',
    body: comment,
  }).catch((error) => error.data);
  if (files.value.length > 0) {
    await uploadFile(commentId.body, comment.report_id)
    files.value = []
  }
  $chatWs.send(JSON.stringify({message: content.value, reportId: props.report.id}))
  await commentStore.getComments(props.report)
  await fileStore.getFilesForComments(props.report.id)
  content.value = ''
  loading.value = false
};
watch(files, (newValue, oldValue) => {
  if (oldValue.length == 0 || newValue.length == 0) {
    prepareGallery()
  }
}, {deep: true})
const uploadFile = async (comment_id, report_id) => {
  let form = new FormData()
  form.append('report_id', report_id)
  form.append('comment_id', comment_id)
  files.value.forEach((file) => {
    form.append('file', file)
  })
  let dab = await useApi(`/api/file`, {
    method: 'POST',
    body: form
  }).catch((error) => console.log(`Error: ${error}`));
}
const prepareGallery = async function () {
  galleryHelper.value = []
  for (let id in files.value) {
    let obj = {url: '', type: '', file: {}}
    obj.file = files.value[id]
    if (files.value[id].type.includes('image')) {
      obj.type = 'image'
    } else if (files.value[id].type.includes('video')) {
      obj.type = 'video'
    } else {
      obj.type = 'document'
    }
    let reader = new FileReader();
    reader.onload = function () {
      obj.url = reader.result
      galleryHelper.value.push(obj)
    };
    reader.readAsDataURL(files.value[id]);
  }
}
watch($chatWs.data, (newValue) => {
  commentStore.getComments(props.report)
  fileStore.getFilesForComments(props.report.id)
})
loading.value = false
</script>

<template>
  <v-chip @click="()=>{files.splice(files.indexOf(file),1);}" v-for="file in files">{{ file.name }}</v-chip>
  <v-text-field
      :disabled="loading"
      v-model="content"
      label="Comment"
  ></v-text-field>
  <v-btn :disabled="loading" @click="sendComment" icon="mdi-send-variant"></v-btn>
  <v-btn :disabled="loading" @click="()=>{dialogControl=true;prepareGallery()}" icon="mdi-attachment"></v-btn>

  <v-dialog
      v-model="dialogControl"
      width="800">
    <v-card>
      <v-card-title class="headline black" primary-title>
        add attachments
      </v-card-title>
      <v-card-text class="pa-5">
        <v-form id="galleryForm" enctype="multipart/form-data">
          <v-file-input chips="true" v-model="files" multiple="true" prepend-icon="mdi-attachment"></v-file-input>
        </v-form>
        <v-col v-for="file in galleryHelper">
          <v-chip v-if="file.type == 'document'">{{ file.file.name }}</v-chip>
          <v-img v-if="file.type == 'image'" :src="file.url"></v-img>
          <video v-if="file.type == 'video'" width="320" height="240" controls>
            <source :src="file.url">
            Your browser does not support the video tag.
          </video>
          <v-btn
              @click="()=>{files.splice(files.indexOf(file.file),1); galleryHelper.splice(galleryHelper.indexOf(file),1)}">
            usun
          </v-btn>
        </v-col>
      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn @click="()=>{files=[];dialogControl=false}" outlined color="primary">Cancel</v-btn>
        <v-btn @click="()=>{dialogControl=false}" outlined color="primary">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<style scoped>

</style>