<script setup lang="ts">
import ReportDescription from "~/components/dashboard/report/reportView/reportDescription.vue";
import CommentBox from "~/components/dashboard/report/comment/commentBox.vue";

const route = useRoute()
const id = route.params.id;

let report = await useApi(`/api/report/${id}`).catch((error) => error.data);
report = report.body
</script>

<template>
  <v-card style="margin: 25px" flat="">
    <v-row>
      <v-col>
        <comment-box :report="report"></comment-box>
      </v-col>
      <v-col>
        <report-description :report="report"></report-description>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>

</style>