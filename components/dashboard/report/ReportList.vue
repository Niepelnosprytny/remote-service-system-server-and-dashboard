<script setup lang="ts">
import useReportStore from "~/stores/reportStore";
import {storeToRefs} from "pinia";
import ReportListItem from "~/components/dashboard/report/ReportListItem.vue";
import ReportListFilters from "~/components/dashboard/report/ReportListFilters.vue";

const store = useReportStore();
store.updateReportList()

const {filteredReportList,reportList} = storeToRefs(store);

</script>

<template>
  <report-list-filters></report-list-filters>
  <v-card style=";margin: 0 25px 25px 25px; padding: 15px">
<v-col style="margin-top: 10px; margin-bottom: 10px" v-for="rep in filteredReportList">
  <report-list-item :report="rep"></report-list-item>
</v-col>
  </v-card>
</template>

<style scoped>

</style>