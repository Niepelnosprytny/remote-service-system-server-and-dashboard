<script setup lang="ts">
import ChatHeader from "~/components/dashboard/report/comment/chatHeader.vue";
import ChatFooter from "~/components/dashboard/report/comment/chatFooter.vue";
import CommentBody from "~/components/dashboard/report/comment/commentBody.vue";
import useCommentStore from "~/stores/commentStore";
const route = useRoute()
const props = defineProps({
  report: {required: true},
})
const commentStore = useCommentStore()
const author = await commentStore.getAuthor(props.report.created_by)

</script>

<template>
  <v-card style="margin: 20px;">
  <chat-header :author="author"></chat-header>
  <comment-body :report="props.report" :author="author"></comment-body>
  <chat-footer :report="props.report"></chat-footer>
  </v-card>
</template>

<style scoped>

</style>