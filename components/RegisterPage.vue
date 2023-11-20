<script setup lang="ts">
import { ref } from 'vue';
import useAuthStore from '~/store/auth';

const store = useAuthStore();

const user = ref({
  email: '',
  password: '',
  name: '',
  surname: '',
  role: 'ROLE_USER',
  employer: null
});

const employers = ref([]);

employers.value = (await $fetch('/api/client')).body;

const register = async () => {
  try {
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(user.value)
    });

    store.login(response.body.token, response.body.user);

    alert(`Registration successful`);

    reloadNuxtApp({
      path: `/`
    });
  } catch (error) {
    alert(`Registration error - ${error.message}`);
    console.error(`Registration error - ${error}`);
  }
};
</script>

<template>
  <form @submit.prevent="register">
    <div>
      <label>Email</label>
      <input type="text" v-model="user.email" />
    </div>
    <div>
      <label>Password</label>
      <input type="password" v-model="user.password" />
    </div>
    <div>
      <label>Name</label>
      <input type="text" v-model="user.name" />
    </div>
    <div>
      <label>Surname</label>
      <input type="text" v-model="user.surname" />
    </div>
    <div>
      <label>Role</label>
      <select v-model="user.role">
        <option selected>ROLE_USER</option>
        <option>ROLE_OFFICE</option>
        <option>ROLE_ADMIN</option>
      </select>
    </div>
    <div>
      <label>Employer</label>
      <select>
        <option value="null" selected>Brak</option>
        <option v-for="employer in employers" :value="employer.id">{{ employer.name }}</option>
      </select>
    </div>
    <div>
      <button type="submit">Register</button>
    </div>
  </form>
</template>