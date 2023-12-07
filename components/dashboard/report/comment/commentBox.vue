<script setup lang="ts">
import ChatHeader from "~/components/dashboard/report/comment/chatHeader.vue";
import ChatFooter from "~/components/dashboard/report/comment/chatFooter.vue";
import CommentBody from "~/components/dashboard/report/comment/commentBody.vue";

const route = useRoute()
const id = route.params.id;
</script>

<template>
  <chat-header author="unknown"></chat-header>
  <comment-body></comment-body>
  <chat-footer></chat-footer>
</template>

<style scoped>

</style>