<script setup lang="ts">
import useAuthStore from "~/stores/auth";

const store = useAuthStore()
const route = useRoute()
if(!store.isLoggedIn()&&route.path!=='/login'){
  navigateTo('/login')
}
</script>
<template>
  <div>
    <TheHeader v-if="store.isLoggedIn()" />
    <slot />
    <TheFooter v-if="store.isLoggedIn()" />
  </div>
</template>
