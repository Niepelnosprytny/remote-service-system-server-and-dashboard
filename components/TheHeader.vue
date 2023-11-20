<script setup lang="ts">
import useAuthStore from "~/store/auth";

const store = useAuthStore();

const user = computed(() => store.getUser);

const login = () => {
  reloadNuxtApp({
    path: `/login`
  });
}

const logout = () => {
  store.logout();
  reloadNuxtApp({
    path: `/`
  });
}

const register = () => {
  reloadNuxtApp({
    path: `/register`
  });
}

</script>

<template>
  <a href="/"><h1>Dashboard</h1></a>
  <div v-if="user === null">
    <button @click="login">Login</button>
    <button @click="register">Register</button>
  </div>
  <div v-else>
    <h4>{{ `${user.name} ${user.surname}` }}</h4>
    <button @click="logout">Logout</button>
  </div>
</template>