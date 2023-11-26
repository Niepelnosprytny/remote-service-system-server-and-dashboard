<script setup lang="ts">
import useAuthStore from "~/stores/auth";

const store = useAuthStore();
const {token, user} = storeToRefs(store);

const cookie = await useCookie('auth', {
  default: () => {
    return null
  },
  maxAge: 86400,  //1 day in seconds
  sameSite: true
});

if (cookie.value) {
  token.value = cookie.value;
  user.value = (await useApi('/api/auth')).body;
}

store.$subscribe(async (mutation, state) => {
  cookie.value = state.token;
});
</script>

<template>
  <NuxtLayout name="custom">
    <NuxtPage/>
  </NuxtLayout>
</template>