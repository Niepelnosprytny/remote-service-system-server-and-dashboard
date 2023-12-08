<script setup lang="ts">

import ReportList from "~/components/dashboard/report/ReportList.vue";
import useAuthStore from "~/stores/auth";
const store = useAuthStore()
if (!store.isLoggedIn()){
  navigateTo('/')
}
</script>
<template>
      <report-list></report-list>
</template>
