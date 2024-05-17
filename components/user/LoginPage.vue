<script setup lang="ts">
import useAuthStore from '~/stores/authStore';

const form = ref()
const loading = ref(false)
const valid = ref(true)
const mailRules = [
  (e) => {
    if (e) return true
    return 'E-mail lub hasło jest nieprawidłowe'
  },
  (e) => {
    if (e) return true
    return 'E-mail jest wymagany'
  },
  (e) => {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(e)) return true
    return 'E-mail jest nieprawidłowy'
  },
]
const passRules = [
  () => {
    return !!valid.value;
  },
  (value) => {
    if (value) return true
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
    console.log(response)
  }}
  loading.value = false

};
const dialogControl = ref(false)

const messageSendLoading = ref(false)
const messageSend = ref(false)
const messageMail = ref('')
const mailForm = ref(null)
const sendEmail = async () => {
  const mail = useMail()
  const validation = await mailForm.value.validate()
  console.log(validation)
  if (validation.valid) {
    messageSendLoading.value = true
    mail.send({
      from: 'Administracja SebastianInc',
      subject: 'Odzyskiwanie hasła użytkownika',
      text: `Prośba o zresetowanie hasła użytkownika ${messageMail.value}`,
    })
    messageSendLoading.value = false
    messageSend.value = true
    dialogControl.value = false
  }


}
</script>

<template>
  <v-row style="margin: 100px;" align="center" justify="center">
    <v-card style="background-color: #f7f7f7;padding: 15px" min-width="30%" max-width="70%" :loading="loading">
      <v-card-title style="padding: 10px">
        <h3>Logowanie do systemu</h3>
      </v-card-title>
      <v-card-item>
        <v-form ref="form" id="form" validate-on="blur" @submit.prevent="login">
          <v-text-field style="padding-bottom: 10px;" :rules="mailRules" label="E-mail" type="text" v-model="credentials.email"/>
          <v-text-field style="padding-bottom: 10px;" :rules="passRules" label="Hasło" type="password" v-model="credentials.password"/>
          <v-card-text style="padding: 0;margin: 0">
            <nuxt-link @click="()=>{dialogControl = true}" style="cursor: pointer; text-decoration: none; color: black">Odzyskiwanie kont użytkowników</nuxt-link>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn style="background-color: #a82e3f; color: white; margin-top: 15px; min-width: 30%;" :disabled="loading" type="submit"><b>Zaloguj</b></v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-form>
      </v-card-item>
    </v-card>
  </v-row>
  <v-dialog
      v-model="dialogControl"
      width="500">
    <v-card style="padding: 15px;">
      <v-card-title style="margin-bottom: 20px" primary-title>
        Odzyskiwanie hasła użytkownika
      </v-card-title>
        <v-row style="overflow-y: auto; height: 80%">
          <v-col v-if="messageSendLoading" cols="12" style="text-align: center">
            <v-progress-circular indeterminate></v-progress-circular>
          </v-col>
          <v-col cols="12">
          <v-form ref="mailForm" enctype="multipart/form-data">
          <v-text-field style=" margin-bottom: 20px; padding: 0 20px 0 20px" :rules="mailRules" v-model="messageMail" label="E-mail"></v-text-field>
          </v-form>
          </v-col>
        </v-row>
      <v-card-actions>
        <v-btn @click="()=>{dialogControl=false}" outlined color="black">Anuluj</v-btn>
        <v-btn @click="sendEmail" outlined color="black">Potwierdź</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog
      v-model="messageSend"
      width="500">
    <v-card style="padding: 15px;">
      <v-card-text primary-title>
        Prośba o reset hasła wysłana.
        Proszę poczekać na odpowiedź na podanym mailu.
      </v-card-text>
      <v-card-actions style="justify-content: center">
        <v-btn @click="()=>{messageSend = !messageSend}" outlined color="black">Potwierdź</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>