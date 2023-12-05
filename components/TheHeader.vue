<script setup lang="ts">
import useAuthStore from "~/stores/auth";
import {storeToRefs} from "pinia";

const store = useAuthStore();

const {user, token} = storeToRefs(store);

const logout = async () => {
  store.logout();
  await navigateTo('/login');
}
</script>

<template>
  <NuxtLink to="/"><h1>Dashboard</h1></NuxtLink>
  <div v-if="!user">
    <NuxtLink to="/login">
      <v-btn>Login</v-btn>
    </NuxtLink>
  </div>
  <div v-else>
    <h4>{{ `${user.name} ${user.surname}` }}</h4>
    <v-btn @click="logout">Logout</v-btn>
    <NuxtLink to="/new/user" v-if="user.role === 'ROLE_ADMIN'">
      <v-btn>New user</v-btn>
    </NuxtLink>
  </div>
</template>