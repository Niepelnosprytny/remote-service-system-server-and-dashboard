<script setup lang="ts">
import useAuthStore from '~/stores/auth';

const store = useAuthStore();
const credentials = ref({
  email: '',
  password: '',
});

const login = async () => {
    const response = await useApi('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.value.email,
        password: credentials.value.password

      })
    });

    if(response.statusCode === 200) {
      store.login(response.body.token, response.body.user);

      alert(`Login successful`);

      reloadNuxtApp({
        path: `/`,
        force: true
      });
    } else {
      alert(`Login error - ${JSON.stringify(response.body)}`);}
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