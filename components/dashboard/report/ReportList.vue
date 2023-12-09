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
<h1 v-for="rep in reportList">
  <report-list-item :report="rep"></report-list-item>
</h1>
</template>

<style scoped>

</style>