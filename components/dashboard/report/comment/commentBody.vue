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
  <v-card>
    <v-row v-for="comment in comments">
      <v-col cols="12" style="background-color: green; margin-bottom: 20px" v-if="comment.created_by == props.author">
        {{ comment.content }}
      </v-col>
      <v-col cols="12" style="background-color: aqua; margin-bottom: 20px" v-else>
        {{ comment.content }}
      </v-col>
      <v-col cols="3" style="align-content: center;margin-bottom: 20px" v-for="file in getCommentFiles(comment.id)" v-if="files.length>0">
          <v-chip v-if="file.filetype == 'document'">nazwa</v-chip>
          <v-img max-width="150" max-height="150"
                 :src="useRequestURL().origin+'/files/'+file.filename"></v-img>
          <video v-if="file.filetype == 'video' && file.filename.length>0" width="150" height="150" controls>
            <source :src="useRequestURL().origin+'/files/'+file.filename">
            Your browser does not support the video tag.
          </video>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.fill-width {
  overflow-x: auto;
  flex-wrap: nowrap;
}
</style>