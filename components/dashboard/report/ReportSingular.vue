<script setup lang="ts">
import ReportDescription from "~/components/dashboard/report/reportView/reportDescription.vue";
import CommentBox from "~/components/dashboard/report/comment/commentBox.vue";

const route = useRoute()
const id = route.params.id;
</script>

<template>
  <comment-box></comment-box>
  <report-description></report-description>
</template>

<style scoped>

</style>