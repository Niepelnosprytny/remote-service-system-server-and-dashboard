<script setup lang="ts">
import useAuthStore from "~/stores/authStore";

const store = useAuthStore()
const route = useRoute()
if(!store.isLoggedIn()&&route.path!=='/login'){
  navigateTo('/login')
}
</script>
<template>
  <v-app class="app">
    <TheHeader v-if="store.isLoggedIn()" />
    <div style="padding:70px 20px 20px 20px">
    <slot />
    </div>
    <TheFooter v-if="store.isLoggedIn()" />
  </v-app>
</template>

<style>
.app{
  background-color: #ffbb00;
}
</style>
