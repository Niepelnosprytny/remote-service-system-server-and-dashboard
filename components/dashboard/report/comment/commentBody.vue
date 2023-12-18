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
await fileStore.getFilesForComments()
const {files} = storeToRefs(fileStore)

</script>

<template>
  <v-card>
    <div v-for="comment in comments">
      <p style="background-color: green" v-if="comment.created_by == props.author">{{ comment.content }}</p>
      <p style="background-color: aqua" v-else>{{ comment.content }}</p>
            <div >
              <div v-for="file in files" v-if="files.length>0">
                <p v-if="file.comment_id == comment.id">photo in progress</p>
              </div>
            </div>
    </div>
  </v-card>
</template>

<style scoped>

</style>