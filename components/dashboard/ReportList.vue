<script setup lang="ts">
import useReportStore from "~/stores/reportStore";
import {storeToRefs} from "pinia";

const store = useReportStore();
store.updateReportList()

const {filteredReportList,reportList} = storeToRefs(store);
console.log(reportList)
// console.log(filteredTaskList)
</script>

<template>
<h1 v-for="rep in reportList">
  <p>{{ rep }}</p>
</h1>
</template>

<style scoped>

</style>