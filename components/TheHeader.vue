<script setup lang="ts">
import useAuthStore from "~/stores/authStore";
import {storeToRefs} from "pinia";
const route = useRoute()
const store = useAuthStore();

const {user, token} = storeToRefs(store);

const logout = async () => {
  store.logout();
  await navigateTo('/login');
}
</script>

<template>
  <div v-if="!store.isLoggedIn()">
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
    <div v-if="store.isAdmin()">
    <NuxtLink v-if="route.path!=='/'" to="/">
      <v-btn>Dashboard</v-btn>
    </NuxtLink>
    <NuxtLink v-else to="/admin">
      <v-btn>Admin panel</v-btn>
    </NuxtLink>
    </div>
  </div>
  <div >

  </div>

</template>