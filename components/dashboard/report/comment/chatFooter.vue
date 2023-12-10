<script setup lang="ts">
import useAuthStore from "~/stores/auth";

const authStore = useAuthStore()
const props = defineProps({
  report: {required: true}
})
const comment = ref({
  content: null,
  report_id: props.report.id,
  created_by: authStore.getId()
});
const sendComment = async function () {
  let damn = await useApi(`/api/comment`, {
    method: 'POST',
    body: comment.value,
  }).catch((error) => error.data);
  console.log(damn)
}
</script>

<template>
  <v-text-field
      v-model="comment.content"
      label="Comment"
  ></v-text-field>
  <v-btn @click="sendComment" icon="mdi-send-variant"></v-btn>
  <v-btn icon="mdi-attachment"></v-btn>
</template>

<style scoped>

</style>