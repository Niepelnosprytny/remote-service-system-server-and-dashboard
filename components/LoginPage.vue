<script setup lang="ts">
import useAuthStore from '~/stores/auth';

const store = useAuthStore();
const credentials = ref({
  email: '',
  password: '',
});

const login = async () => {
  try {
    const response = await useApi('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.value.email,
        password: credentials.value.password

      })
    });

    store.login(response.body.token, response.body.user);

    alert(`Login successful`);

    reloadNuxtApp({
      path: `/`
    });
  } catch (error) {
    alert(`Login error - ${error.message}`);
    console.log(`Login error - ${error}`);
  }
};
</script>

<template>
  <form @submit.prevent="login">
    <div>
      <label>Email</label>
      <input type="text" v-model="credentials.email" />
    </div>
    <div>
      <label>Password</label>
      <input type="password" v-model="credentials.password" />
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
</template>