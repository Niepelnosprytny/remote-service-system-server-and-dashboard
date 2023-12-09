<script setup lang="ts">

import useAuthStore from "~/stores/authStore.js";
import {storeToRefs} from "pinia";
import AdminPanelBox from "~/components/dashboard/AdminPanelBox.vue";

const store = useAuthStore();
const {user,token} = storeToRefs(store);

if (!store.isLoggedIn()&&user.role !== 'ROLE_ADMIN') {
  navigateTo('/login')
}
if (!store.isAdmin()) {
  navigateTo('/')
}

</script>
<template>
  <AdminPanelBox></AdminPanelBox>
</template>
