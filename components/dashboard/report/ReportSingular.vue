<script setup lang="ts">
import ReportDescription from "~/components/dashboard/report/reportView/reportDescription.vue";
import CommentBox from "~/components/dashboard/report/comment/commentBox.vue";
import useReportStore from "~/stores/reportStore";

const route = useRoute()
const id = route.params.id;
const reportStore = useReportStore()
await reportStore.getReportById(id)

const update = async function(){
  await reportStore.getReportById(id)
}
</script>

<template>
    <v-row>
      <v-col cols="6">
        <comment-box :report="reportStore.report"></comment-box>
      </v-col>
      <v-col cols="6">
        <report-description @update="update" :report="reportStore.report"></report-description>
      </v-col>
    </v-row>
</template>

<style scoped>

</style>