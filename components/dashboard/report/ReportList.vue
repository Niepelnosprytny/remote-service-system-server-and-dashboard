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
const {filteredReportList, reportList} = storeToRefs(store);
const numberOfLoads = ref(1)
const helper = ref(numberOfLoads.value*7)
const scroll = function (e) {
  const {scrollTop, offsetHeight, scrollHeight} = e.target
  if ((scrollTop + offsetHeight) >= scrollHeight) {
    if(numberOfLoads.value*7<=filteredReportList.value.length){
      numberOfLoads.value++
      helper.value = numberOfLoads.value*7
    }
  }
}
</script>

<template>
  <report-list-filters></report-list-filters>
  <v-card @scroll="scroll" class="listBox"
          style=" justify-content: center; height: 74vh; overflow-y: auto;">
    <v-container  style="text-align: center" v-if="store.reportLoading">
    <v-progress-circular  indeterminate></v-progress-circular>
    </v-container>
    <v-col style="text-align: center" v-if="filteredReportList.length == 0">
      <v-card-text>Brak zgłoszeń.</v-card-text>
    </v-col>
    <v-col v-if="filteredReportList.length>0"  style="padding-bottom: 5px" v-for="(rep,index,key) in filteredReportList">
      <report-list-item v-if="index<=helper" :report="rep"></report-list-item>
    </v-col>
  </v-card>
</template>

<style>
.listBox {
  background-color: #fffaf3;
  margin: 0 25px 25px 25px;
  padding: 15px
}
</style>