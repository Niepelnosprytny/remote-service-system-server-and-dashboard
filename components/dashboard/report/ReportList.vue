<script setup lang="ts">
import useReportStore from "~/stores/reportStore";
import {storeToRefs} from "pinia";
import ReportListItem from "~/components/dashboard/report/ReportListItem.vue";
import ReportListFilters from "~/components/dashboard/report/ReportListFilters.vue";

const store = useReportStore();
const {$reportListWs} = useNuxtApp();
store.updateReportList()
watch($reportListWs.data, (newValue) => {
  store.updateReportList()
})
const {filteredReportList,reportList} = storeToRefs(store);

</script>

<template>
  <report-list-filters></report-list-filters>
  <v-card class="listBox">
<v-col style="padding-bottom: 5px" v-for="rep in filteredReportList">
  <report-list-item :report="rep"></report-list-item>
</v-col>
  </v-card>
</template>

<style>
.listBox{
  background-color: #fffaf3;
  margin: 0 25px 25px 25px;
  padding: 15px
}
</style>