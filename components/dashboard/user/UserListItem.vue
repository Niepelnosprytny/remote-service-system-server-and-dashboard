<script setup lang="ts">
import useUserStore from "~/stores/userStore";
import rolesEnum from "~/enums/modules/RolesEnum";
import useClientStore from "~/stores/clientStore";

const clientStore = useClientStore()
const {clientList} = storeToRefs(clientStore)
const roles = Object.keys(rolesEnum).map(key => rolesEnum[key]);
const props = defineProps({
  user: {required: true},
  update: {required: true}
})
const deleteUser = async function (id) {
  await useApi(`/api/user/${id}`, {
    method: 'DELETE',
  }).catch((error) => error.data);
  await props.update()
}
let dialogControl = ref(false)
let user = ref({
  email: null,
  name: null,
  surname: null,
  role: null,
  employer: null
})
const editUser = async function (id) {
  if(user.value.employer.id){
    user.value.employer = user.value.employer.id
  }
  let dev = await useApi(`/api/user/${id}`, {
    method: 'PATCH',
    body: {email: user.value.email, name: user.value.name, surname: user.value.surname, role: Object.entries(rolesEnum).find(([key, val]) => val === user.value.role)?.[0], employer: user.value.employer},
  }).catch((error) => error.data);
  console.log(dev)
  await props.update()
  dialogControl.value = false
}
const editDialog = async function () {
  user.value.email = props.user.email
  user.value.name = props.user.name
  user.value.surname = props.user.surname
  user.value.role = rolesEnum[props.user.role]
  user.value.employer = await clientStore.getClient(props.user.employer)
  dialogControl.value = true
  await clientStore.updateClientList()
}
</script>

<template>
  <v-row align="center">
    <v-col>
      <v-card-text>
        <p>{{ props.user.name }}</p>
      </v-card-text>
    </v-col>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-col>
      <v-btn @click="deleteUser(props.user.id)" icon="mdi-trash-can"></v-btn>
      <v-btn @click="editDialog" icon="mdi-pencil"></v-btn>
    </v-col>
  </v-row>

  <v-dialog
      v-model="dialogControl"
      width="500">
    <v-card>
      <v-card-title class="headline black" primary-title>
        Edit User
      </v-card-title>
      <v-card-text class="pa-5">
        <v-form ref="sendForm">
          <v-text-field v-model="user.email" label="E-mail"></v-text-field>
          <v-text-field v-model="user.name" label="Name"></v-text-field>
          <v-text-field v-model="user.surname" label="Surname"></v-text-field>
          <v-select v-model="user.role" :items="roles" label="roles" ></v-select>
          <v-select v-model="user.employer" :items="clientList" label="employer" item-value="id" item-title="name" ></v-select>
        </v-form>

      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn @click="()=>dialogControl=false" outlined color="primary">Cancel</v-btn>
        <v-btn @click="editUser(props.user.id)" outlined color="primary">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<style scoped>

</style>