<script setup lang="ts">
import useAuthStore from '~/stores/auth';

const store = useAuthStore();

const user = ref({
  email: '',
  password: '',
  name: '',
  surname: '',
  role: 'ROLE_USER',
  employer: null
});

const { body: employers } = await useApi('/api/client');

const register = async () => {
    const response = await useApi('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(user.value)
    });

    if(response.statusCode === 201) {
      store.login(response.body.token, response.body.user);

      alert(`Registration successful`);

      await navigateTo('/');
    } else {
      alert(`Registration error - ${JSON.stringify(response.body)}`);
    }
};
</script>

<template>
  <v-form @submit.prevent="register">
    <div>
      <v-label>Email</v-label>
      <v-text-field type="text" v-model="user.email" />
    </div>
    <div>
      <v-label>Password</v-label>
      <v-text-field type="password" v-model="user.password" />
    </div>
    <div>
      <v-label>Name</v-label>
      <v-text-field type="text" v-model="user.name" />
    </div>
    <div>
      <v-label>Surname</v-label>
      <v-text-field type="text" v-model="user.surname" />
    </div>
    <div>
      <v-label>Role</v-label>
      <select v-model="user.role">
        <option selected>ROLE_USER</option>
        <option>ROLE_OFFICE</option>
        <option>ROLE_ADMIN</option>
      </select>
    </div>
    <div>
      <v-label>Employer</v-label>
      <select v-model="user.employer">
        <option value="null" selected>Brak</option>
        <option v-for="employer in employers" :key="employer.id" :value="employer.id">{{ employer.name }}</option>
      </select>
    </div>
    <div>
      <v-btn type="submit">Register</v-btn>
    </div>
  </v-form>
</template>