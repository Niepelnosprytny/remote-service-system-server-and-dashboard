<script setup lang="ts">
const { $mysql } = useNuxtApp();
import { ref, onMounted } from 'vue';

const users = ref([]);

onMounted(async () => {
  try {
    const [rows, fields] = await $mysql.query('SELECT * FROM user WHERE employer = ?', [2]);
    users.value = rows;
  } catch (error) {
    console.error('Error querying the database:', error);
  }
});
</script>

<template>
  {{ users }}
  <li v-for="user in users" :key="user.id">
    {{ user.name }}
  </li>
  <img src="https://i.ytimg.com/vi/Y7MI_vvRYvk/maxresdefault.jpg" alt="Hello there">
</template>