<script setup lang="ts">
import useUserStore from "~/stores/userStore";
import rolesEnum from "~/enums/modules/RolesEnum";
import useClientStore from "~/stores/clientStore";

const {$adminPanelWS} = useNuxtApp();
const clientStore = useClientStore()
const {clientListEdit} = storeToRefs(clientStore)
const roles = Object.keys(rolesEnum).map(key => rolesEnum[key]);
await clientStore.updateClientList()
const passRules = [
  (value) => {
    if (value) return true
    return 'To pole jest wymagane'
  },
  (value) => {
    if (value.length>=9) return true
    return 'Hasło musi mieć przynajmniej 9 znaków'
  },
]
const mailRules = [
  (e) => {
    if (e) return true
    return 'E-mail jest wymagany'
  },
  (e) => {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(e)) return true
    return 'E-mail jest nieprawidłowy'
  },
]
const mainRules = [
  (e) => {
    if (e) return true
    return 'To pole jest wymagane'
  },
]
const deleteRef = ref(false)
const props = defineProps({
  user: {required: true},
  update: {required: true},
  index: {required: true}
})
const deleteUser = async function (id) {
  await useApi(`/api/user/${id}`, {
    method: 'DELETE',
  }).catch((error) => error.data);
  await props.update()
  $adminPanelWS.send('delete')
}
let dialogControl = ref(false)
let user = ref({
  password: null,
  email: null,
  name: null,
  surname: null,
  role: null,
  employer: null
})
const sendForm = ref(null)
const editUser = async function (id) {
  if(user.value.employer.id){
    user.value.employer = user.value.employer.id
  }
  if(user.value.employer == 'brak' || !user.value.employer){
    user.value.employer = null
  }
  const validation = await sendForm.value.validate()
  if (validation.valid) {
    let dev = await useApi(`/api/user/${id}`, {
      method: 'PATCH',
      body: {
        email: user.value.email,
        password: user.value.password,
        name: user.value.name,
        surname: user.value.surname,
        role: Object.entries(rolesEnum).find(([key, val]) => val === user.value.role)?.[0],
        employer: user.value.employer
      },
    }).catch((error) => error.data);
    await props.update()
    dialogControl.value = false
    $adminPanelWS.send('edit')
  }
}
const editDialog = async function () {
  user.value.email = props.user.email
  user.value.name = props.user.name
  user.value.surname = props.user.surname
  user.value.password = props.user.password
  user.value.role = rolesEnum[props.user.role]
  user.value.employer = await clientStore.getClient(props.user.employer)
  dialogControl.value = true
}
</script>

<template>
  <v-card style="padding-bottom: 15px;padding-top: 15px">
  <v-row align="center">
    <v-col cols="3">
        <v-card-text>{{ props.user.name }} {{ props.user.surname }}</v-card-text>
    </v-col>
    <v-col cols="3">
        <v-card-text>{{ props.user.email}}</v-card-text>
    </v-col>
    <v-col cols="3">
        <v-card-text>{{ rolesEnum[props.user.role] }}</v-card-text>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="2">
      <v-btn v-if="!deleteRef || props.index !== props.user.id" style="margin-right: 10px" @click="editDialog" icon="mdi-pencil"></v-btn>
      <v-btn v-if="!deleteRef || props.index !== props.user.id" @click="deleteRef = true" icon="mdi-trash-can"></v-btn>
      <v-btn v-if="deleteRef && props.index === props.user.id" style="margin-right: 10px" @click="deleteClient(props.client.id)"
             icon="mdi-check"></v-btn>
      <v-btn v-if="deleteRef && props.index === props.user.id" @click="deleteRef = false" icon="mdi-close"></v-btn>
    </v-col>
  </v-row>
  </v-card>

  <v-dialog
      v-model="dialogControl"
      width="500">
    <v-card>
      <v-card-title class="headline black" primary-title>
        Edytuj użytkownika
      </v-card-title>
      <v-card-text class="pa-5">
        <v-form ref="sendForm">
          <v-text-field :rules="mailRules" v-model="user.email" label="E-mail"></v-text-field>
          <v-text-field :rules="mainRules" v-model="user.name" label="Imię"></v-text-field>
          <v-text-field :rules="mainRules" v-model="user.surname" label="Nazwisko"></v-text-field>
          <v-text-field :rules="passRules" v-model="user.password" type="password" label="Hasło"></v-text-field>
          <v-select :rules="mainRules" v-model="user.role" :items="roles" label="Rola" ></v-select>
          <v-select v-model="user.employer" :items="clientListEdit" label="Klient" item-value="id" item-title="name" ></v-select>
        </v-form>

      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn @click="()=>dialogControl=false" outlined color="black">Anuluj</v-btn>
        <v-btn @click="editUser(props.user.id)" outlined color="black">Potwierdź</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<style scoped>

</style>