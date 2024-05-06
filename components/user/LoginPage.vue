<script setup lang="ts">
import useAuthStore from '~/stores/authStore';

const form = ref()
const loading = ref(false)
const valid = ref(true)
const loginRules = [
  () => {
    if (valid.value) return true
    return 'Nazwa użtkownika lub hasło jest nieprawidłowe'
  },
  () => {
    if (credentials.value.email) return true
    return 'Nazwa użytkownika jest wymagana'
  },
]
const passRules = [
  () => {
    return !!valid.value;
  },
  () => {
    if (credentials.value.password) return true
    return 'Hasło jest wymagane'
  },
]
const store = useAuthStore();
const credentials = ref({
  email: '',
  password: '',
});

const login = async () => {
  loading.value = true
  if(credentials.value.email && credentials.value.password){
  const response = await useApi('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: credentials.value.email,
      password: credentials.value.password

    })
  });

  if (response.statusCode === 200) {
    store.login(response.body.token, response.body.user);
    await navigateTo('/');
  }else{
    valid.value = false
    await form.value?.validate()
  }}
  loading.value = false

};
</script>

<template>
  <v-row style="margin: 0;" align="center" justify="center">
    <v-card style="background-color: #fffaf3;padding: 15px" min-width="30%" max-width="70%" :loading="loading">
      <v-card-title style="padding: 10px">
        <h3>Logowanie do systemu</h3>
      </v-card-title>
      <v-card-item>
        <v-form ref="form" id="form" validate-on="blur" @submit.prevent="login">
          <v-text-field style="padding-bottom: 10px;" :rules="loginRules" label="E-mail" type="text" v-model="credentials.email"/>
          <v-text-field style="padding-bottom: 10px;" :rules="passRules" label="Hasło" type="password" v-model="credentials.password"/>
          <v-card-text style="padding: 0;margin: 0">
            <router-link to="/">Odzyskiwanie kont użytkowników</router-link>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn style="background-color: #7fff93; margin-top: 15px; min-width: 30%;" :disabled="loading" type="submit">Zaloguj</v-btn>
            <v-spacer></v-spacer>

          </v-card-actions>
        </v-form>
      </v-card-item>
    </v-card>
  </v-row>
</template>