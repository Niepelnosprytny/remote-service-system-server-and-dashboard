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

      await navigateTo('/');
    } else {
      alert(`Login error - ${JSON.stringify(response.body)}`);}
};
</script>

<template>
  <v-form @submit.prevent="login">
    <div>
      <v-label>Email</v-label>
      <v-text-field type="text" v-model="credentials.email" />
    </div>
    <div>
      <v-label>Password</v-label>
      <v-text-field type="password" v-model="credentials.password" />
    </div>
    <div>
      <v-btn type="submit">Submit</v-btn>
    </div>
  </v-form>
</template>