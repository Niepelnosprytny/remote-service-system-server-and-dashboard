<script setup lang="ts">
import { ref, onMounted } from 'vue';
import UserTest from "~/components/test/UserTest.vue";

const users = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify({
        query: 'SELECT * FROM user;',
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    users.value = data.body.data[0];
  } catch (error) {
    console.error('Error:', error);
  }
});
</script>

<template>
  <UserTest />

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