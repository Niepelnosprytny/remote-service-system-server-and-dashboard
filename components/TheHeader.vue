<script setup lang="ts">

import useAuthStore from "~/stores/auth";
import { storeToRefs } from "pinia";

const store = useAuthStore();

const { user, token } = storeToRefs(store);

const login = () => {
  reloadNuxtApp({
    path: `/login`,
    force: true
  });
}

const logout = () => {
  store.logout();
  reloadNuxtApp({
    path: `/`,
    force: true
  });
}

const register = () => {
  reloadNuxtApp({
    path: `/register`,
    force: true
  });
}
</script>

<template>

    <pre>{{ token }}</pre>
    <pre>{{ user }}</pre>

  <a href="/"><h1>Dashboard</h1></a>
    <div v-if="!user">
      <button @click="login">Login</button>
    </div>
    <div v-else>
      <h4>{{ `${user.name} ${user.surname}` }}</h4>
      <button @click="logout">Logout</button>
      <button v-if="user.role === 'ROLE_ADMIN'" @click="register">Register</button>
    </div>
</template>