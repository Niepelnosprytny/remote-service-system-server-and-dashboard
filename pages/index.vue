<script setup lang="ts">

import useAuthStore from "~/stores/authStore.js";
import {storeToRefs} from "pinia";
import ReportList from "~/components/dashboard/report/ReportList.vue";
import ReportListFilters from "~/components/dashboard/report/ReportListFilters.vue";

const store = useAuthStore();
const user = storeToRefs(store);

if (!store.isLoggedIn()) {
  navigateTo('/login')
}

</script>
<template>
      <report-list></report-list>
</template>
