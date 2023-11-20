<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '~/store/auth';

const store = useStore();
const login = ref({
  email: '',
  password: '',
});
let token = ref();

const userLogin = async () => {
  try {
    token.value = await ($fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: login.value.email,
        password: login.value.password

      })
    }));
    store.login(token);
    console.log('Login successful');
  } catch (error) {
    console.error('Login error', error);
  }
};
</script>

<template>
  <pre>{{ token }}</pre>

  <form @submit.prevent="userLogin">
    <div>
      <label>Email</label>
      <input type="text" v-model="login.email" />
    </div>
    <div>
      <label>Password</label>
      <input type="password" v-model="login.password" />
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
</template>