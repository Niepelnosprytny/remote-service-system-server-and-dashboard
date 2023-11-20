<script setup lang="ts">
import ApiTest from "~/components/test/ApiTest.vue";

const users = (await $fetch('/api/user')).body;
</script>

<template>
  <ApiTest />
  <img src="https://i.ytimg.com/vi/Y7MI_vvRYvk/maxresdefault.jpg" alt="Hello there">
  <div v-for="user in users" :key="user.id">
    <h3><strong>{{ user.name }} {{ user.surname }}</strong></h3>
    <ul>
      <li><strong>ID:</strong> {{ user.id }}</li>
      <li><strong>Email:</strong> {{ user.email }}</li>
      <li><strong>Password:</strong> {{ user.password }}</li>
      <li><strong>Role:</strong> {{ user.role }}</li>
      <li><strong>Employer:</strong> {{ user.employer }}</li>
    </ul>
  </div>
</template>