<script setup lang="ts">
import useAuthStore from "~/stores/authStore";
import useCommentStore from "~/stores/commentStore";
import useFileStore from "~/stores/fileStore";
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
  if(content.value && content.value.length>0 && content.value.length<255) {
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
    $chatWs.send(JSON.stringify({message: 'comment sent', reportId: props.report.id}))
    await notifStore.sendCommentNotifications(props.report)
    $notifWs.send('comment notif sent')
    await commentStore.getComments(props.report)
    await fileStore.getFilesForComments(props.report.id)
    content.value = ''
    loading.value = false
  }
};
watch(files, (newValue, oldValue) => {
  galleryLoading.value = true
  if (newValue !== oldValue && newValue.length <= 5) {
    prepareGallery()
  }else{
    galleryHelper.value = []
  }
  galleryLoading.value = false
}, {deep: true})
const galleryLoading = ref(false)
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
    reader.onload = function (e) {
      let buffer = e.target.result;
      let videoBlob = new Blob([new Uint8Array(buffer)], { type: 'video/mp4' });
      obj.url = window.URL.createObjectURL(videoBlob)
      galleryHelper.value.push(obj)
    };
    reader.readAsArrayBuffer(files.value[id]);
  }
}
watch($chatWs.data, (newValue) => {
  commentStore.getComments(props.report)
  fileStore.getFilesForComments(props.report.id)
})
const chatRules = [
  (e) => {
    if (e.length<=255) return true
    return 'Wiadomość nie może mieć więcej niz 255 znaków'
  },
]
const fileRules = [
  (e) => {
    if (e.length<=5) return true
    return 'Nie można wysłać więcej niż 5 załączników'
  },
]
loading.value = false
</script>

<template>
  <v-card style="justify-content: center; padding: 5px 10px 0 10px; min-height: 5dvh;; overflow-y: auto; background-color: #f7f7f7">
      <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
      <v-col cols="12" style="margin-bottom: 7px; padding-bottom: 0;">
        <v-chip style="max-width: 19%; margin-right: 1%" @click="()=>{files.splice(files.indexOf(file),1);}"
                v-for="(file) in files" v-if="files.length<=5"><div >{{ file.name }}</div>
        </v-chip>
      </v-col>
      <v-col cols="12" style="padding-bottom: 0; padding-top: 4px">
        <v-text-field
            :rules="chatRules"
            style="position: relative;"
            :disabled="loading"
            v-model="content"
            label="Komentarz"
            :append-inner-icon="'mdi-send-variant'"
            prepend-inner-icon="mdi-attachment"
            type="text"
            variant="filled"
            clearable
            @click:append-inner="sendComment"
            @click:clear="()=>{content = ''}"
            @click:prepend-inner="()=>{dialogControl=true;prepareGallery()}"
        >
        </v-text-field>
      </v-col>

  </v-card>
  <v-dialog
      v-model="dialogControl"
      width="1000">
    <v-card style="padding: 15px;width: 70vw; height: 80vh">
      <v-card-title style="height: 10%" primary-title>
        Dodaj załączniki
      </v-card-title>
      <v-form id="galleryForm" enctype="multipart/form-data">
        <v-file-input :disabled="galleryLoading" :rules="fileRules" bg-color="#f7f7f7" style="margin-bottom: 15px" accept="image/*,video/*,.doc,.pdf" prepend-inner-icon="mdi-attachment" chips v-model="files"
                      multiple prepend-icon=""
                      clearable></v-file-input>
      </v-form>
      <v-row style="overflow-y: auto; height: 80%">
        <v-col v-if="galleryLoading" cols="12" style="text-align: center">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-col>
        <v-col cols="4" v-for="file in galleryHelper">
          <v-row align="center" style="padding: 0;">
            <v-col cols="10">
              <v-chip style="margin-bottom: 10px">{{ file.file.name }}</v-chip>
            </v-col>
            <v-col cols="2">
              <v-icon icon="mdi-trash-can"
                      @click="()=>{files.splice(files.indexOf(file.file),1); galleryHelper.splice(galleryHelper.indexOf(file),1)}">
              </v-icon>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
          <v-card style="min-height: 200px; height: 100%; width: 100%" v-if="file.type == 'document'">
            <v-icon size="80" v-if="file.type == 'document'" style="height: 100%; width: 100%; overflow: auto">
              mdi-file-document-outline
            </v-icon>
          </v-card>
          <v-img style="max-height: 200px" v-if="file.type == 'image'" :src="file.url"></v-img>
          <video ref="videoTag" preload="auto" v-if="file.type == 'video'" style="max-height: 210px; height: auto; width: 100%" controls>
            <source :src="file.url">
          </video>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn @click="()=>{files=[];dialogControl=false}" outlined color="black">Anuluj</v-btn>
        <v-btn @click="()=>{dialogControl=false}" outlined color="black">Potwierdź</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<style scoped>

</style>