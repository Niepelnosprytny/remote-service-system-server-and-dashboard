<script setup lang="ts">

import useAuthStore from "~/stores/auth.js";
import {storeToRefs} from "pinia";
import ReportList from "~/components/dashboard/ReportList.vue";

const store = useAuthStore();
const user = storeToRefs(store);

if (!store.isLoggedIn()) {
  navigateTo('/login')
}

</script>
<template>
<ReportList></ReportList>
</template>
