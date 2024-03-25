<script setup lang="ts">
import useCommentStore from "~/stores/commentStore";
import useFilterStore from "~/stores/filterStore";
import useFileStore from "~/stores/fileStore";

const props = defineProps({
  report: {required: true},
  author: {required: true}
})

const fileStore = useFileStore()
const commentStore = useCommentStore()
await commentStore.getComments(props.report)
const {comments} = storeToRefs(commentStore)
await fileStore.getFilesForComments(props.report.id)
const {files} = storeToRefs(fileStore)
let hoverComm = ref(null)
let hover = ref(null)
let hoverEvent = function (index,indexComm){
  hoverComm.value = indexComm
  hover.value = index
}
let downloadImage = function (name){
    fileStore.downloadFile(name)
}
let dialogControl = ref(false);
let currentFile = ref(null);
let getCommentFiles = function (id){
  let arr = []
  files.value.forEach((file)=>{
    if(file.comment_id === id && file.filename.length>0){
      arr.push(file)
    }
  });
  return arr
}
</script>

<template>
    <v-hover v-slot="{ hover }">
      <v-card>
      <v-chip v-if="hover" >dsadasd</v-chip>
      <v-chip v-else >damn</v-chip>
      </v-card>
    </v-hover>

  <v-card>
    <v-row v-for="(comment,indexComm) in comments">
      <v-col cols="12" style="background-color: green; margin-bottom: 20px" v-if="comment.created_by == props.author">
        {{ comment.content }}
      </v-col>
      <v-col cols="12" style="background-color: aqua; margin-bottom: 20px" v-else>
        {{ comment.content }}
      </v-col>

      <v-col
          cols="3"
          style="align-content: center;margin-bottom: 20px"
          v-for="(file,index) in getCommentFiles(comment.id)"
          v-if="files.length>0">
        {{index}}{{ indexComm }}
          <v-chip v-if="file.filetype == 'document'">{{ file.filename }}</v-chip>
          <v-img
              v-on:mouseover="hoverEvent(index,indexComm)"
              v-on:mouseleave="hoverEvent(null,null)"
              v-if="file.filetype == 'image'" max-width="150" max-height="150"
                 :src="useRequestURL().origin+'/files/'+file.filename">
            <v-card class="on-hover d-flex" style="align-items: center;justify-content: center;opacity: 0.4; height: 100%; width: 100%" activator="" v-if="hover == index && indexComm == hoverComm">
              <v-spacer></v-spacer>
              <v-btn :onclick="()=>{dialogControl=true; currentFile=file}"><v-icon icon="mdi-eye"></v-icon></v-btn>
                <v-spacer></v-spacer>
              <a :href="useRequestURL().origin+'/files/'+file.filename" target="_blank" :download="file.filename">
              <v-btn><v-icon icon="mdi-download"></v-icon></v-btn>
              </a>
              <v-spacer></v-spacer>

            </v-card>
            
          </v-img>

          <video v-if="file.filetype == 'video' && file.filename.length>0" width="150" height="150" controls>
            <source :src="useRequestURL().origin+'/files/'+file.filename">
            Your browser does not support the video tag.
          </video>
      </v-col>
    </v-row>
  </v-card>
  <v-dialog
      v-model="dialogControl"
      width="500">
    <v-card>
      <v-card-title class="headline black d-flex flex-row-reverse" primary-title>
        <v-btn variant="plain" class="align-self-end" @click="()=>dialogControl=false"><v-icon icon="mdi-close"></v-icon></v-btn>
      </v-card-title>
      <v-card-text class="pa-5">
        <v-img
            :src="useRequestURL().origin+'/files/'+currentFile.filename"></v-img>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.on-hover {
  background-color: black;
}
.fill-width {
  overflow-x: auto;
  flex-wrap: nowrap;
}
</style>