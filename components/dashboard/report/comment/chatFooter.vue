<script setup lang="ts">
import useAuthStore from "~/stores/authStore";
import useCommentStore from "~/stores/commentStore";

const authStore = useAuthStore()
const commentStore = useCommentStore()
const props = defineProps({
  report: {required: true}
})
const images = ref()
const comment = ref({
  content: null,
  report_id: props.report.id,
  created_by: authStore.getId()
});
const sendComment = async function () {
  await useApi(`/api/comment`, {
    method: 'POST',
    body: comment.value,
  }).catch((error) => error.data);
  await commentStore.getComments(props.report)
  comment.value.content = null
};
const sendFile = async function (){
  for (const image of images.value) {
    await useApi(`/api/file`, {
      method: 'POST',
      body: {
        filename: image.name,
        comment_id: 2,
      }
    }).catch((error) => console.log(`Error: ${error}`));
  }
}
  const test = async function (){
  console.log(images.value)
  }
</script>

<template>
  <v-text-field
      v-model="comment.content"
      label="Comment"
  ></v-text-field>
  <v-file-input @change="test" v-model="images" multiple="true" prepend-icon="mdi-attachment"></v-file-input>
  <p v-if="images&&images.length>0">dsadasdas</p>
  <v-btn @click="sendComment" icon="mdi-send-variant"></v-btn>
  <v-btn icon="mdi-attachment"></v-btn>
</template>

<style scoped>

</style>