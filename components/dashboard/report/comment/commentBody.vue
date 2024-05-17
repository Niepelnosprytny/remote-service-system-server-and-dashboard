<script setup lang="ts">
import useCommentStore from "~/stores/commentStore";
import useFileStore from "~/stores/fileStore";

const props = defineProps({
  report: {required: true},
  author: {required: true}
})
const {$chatWs} = useNuxtApp()
const fileStore = useFileStore()
const commentStore = useCommentStore()
await commentStore.getComments(props.report)
const {comments} = storeToRefs(commentStore)
await fileStore.getFilesForComments(props.report.id)
const {files} = storeToRefs(fileStore)
let hoverComm = ref(null)
let hover = ref(null)
let hoverEvent = function (index, indexComm) {
  hoverComm.value = indexComm
  hover.value = index
}
let dialogControl = ref(false);
let currentFile = ref(null);

let getCommentFiles = function (id) {
  let arr = []
  files.value.forEach((file) => {
    if (file.comment_id === id && file.filename.length > 0) {
      arr.push(file)
    }
  });
  return arr
}
const scrollToEnd = async function () {
  const el = document.getElementById("commentBody");
  el.scrollTop = el.scrollHeight
}
watch($chatWs.data, () => {
scrollToEnd()
})
const comCop = computed(()=>{return comments.value.length})
const fileCop = computed(()=>{return files.value.length})
watch(comCop, () => {
  setTimeout(() => scrollToEnd(), 0);
})
watch(fileCop, () => {
  setTimeout(() => scrollToEnd(), 0);
})
onMounted(()=>{
  scrollToEnd()
})
</script>

<template>
  <v-card ref="commentBody" id="commentBody" style="max-height: 60dvh;overflow-y: auto">
    <v-row v-if="comments.length==0">
      <v-col style="text-align: center;">
        <v-card-text>Brak komentarzy.</v-card-text>
      </v-col>
    </v-row>
    <v-row v-else style="padding: 20px" v-for="(comment,indexComm) in comments">
      <v-col cols="12" v-if="comment.created_by == props.author">
        <v-card-text class="bubble right">
          {{ comment.content }}
        </v-card-text>
      </v-col>
      <v-col cols="12" v-else>
        <v-card-text class="bubble left">
          {{ comment.content }}
        </v-card-text>
      </v-col>
      <v-row style="margin-top: 10px; margin-left: 10px"
             :style="{'justify-content': comment.created_by == props.author ? 'right' : 'left'}">
        <v-col
            cols="4"
            style="margin: 0 35px 0 25px; padding: 5px;"
            v-for="(file,index) in getCommentFiles(comment.id)"
            v-if="files.length>0">
          <v-card v-if="file.filetype == 'document'"
                  style="min-height: 120px; max-height: 120px; height: 100%; width: 100%;">
            <a style="color: black" :href="useRequestURL().origin+'/files/'+file.filename" target="_blank"
               :download="file.filename">
              <v-chip>{{ file.filename }}</v-chip>
              <v-icon size="60" style=" height: 70%; width: 100%; overflow: auto">mdi-file-document-outline</v-icon>
            </a>
          </v-card>
          <v-card v-if="file.filetype == 'image'"
                  style="min-height: 120px; max-height: 120px; height: 100%; width: 100%;">
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
          <v-card v-if="file.filetype == 'video' && file.filename.length>0"
                  style="min-height: 120px; max-height: 120px; height: 100%; width: 100%;">
            <video style="width: 100%; height: 100%;" controls>
              <source :src="useRequestURL().origin+'/files/'+file.filename">
              Your browser does not support the video tag.
            </video>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
  </v-card>

  <v-dialog
      v-model="dialogControl"
      width="1000">
    <v-card>
      <v-card-title class="headline black d-flex flex-row-reverse" primary-title>
        <v-btn variant="plain" class="align-self-end" @click="()=>dialogControl=false">
          <v-icon icon="mdi-close"></v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-5">
        <v-img style="max-height: 800px; max-width: 1000px"
            :src="useRequestURL().origin+'/files/'+currentFile.filename"></v-img>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.on-hover {
  background-color: black;
}

.bubble {
  --r: 1em; /* the radius */
  --t: 1.5em; /* the size of the tail */

  max-width: 300px;
  padding: 1em;
  border-inline: var(--t) solid #0000;
  border-radius: calc(var(--r) + var(--t))/var(--r);
  mask: radial-gradient(100% 100% at var(--_p) 0, #0000 99%, #000 102%) var(--_p) 100%/var(--t) var(--t) no-repeat,
  linear-gradient(#000 0 0) padding-box;
  color: #fff;
}

.left {
  --_p: 0;
  background: #c77f89 border-box;
  border-bottom-left-radius: 0 0;
  place-self: start;
}

.right {
  --_p: 100%;
  background: #7db3b4 border-box;
  border-bottom-right-radius: 0 0;
  place-self: end;
}

</style>