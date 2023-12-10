<script setup lang="ts">
import useCommentStore from "~/stores/commentStore";
const props = defineProps({
  report: {required: true},
  author: {required: true}
})
const commentStore = useCommentStore()
await commentStore.getComments(props.report)
const {comments} = storeToRefs(commentStore)

</script>

<template>
  <v-card>
    <div v-for="comment in comments">
      <p style="background-color: green" v-if="comment.created_by == props.author">{{comment.content}}</p>
      <p style="background-color: aqua" v-else>{{ comment.content }}</p>
    </div>
  </v-card>
</template>

<style scoped>

</style>