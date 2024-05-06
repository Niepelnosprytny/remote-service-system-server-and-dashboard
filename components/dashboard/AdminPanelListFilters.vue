<script setup lang="ts">
import rolesEnum from "~/enums/modules/RolesEnum";
import filterTypeEnum from "~/enums/modules/FilterTypeEnum";
import useClientStore from "~/stores/clientStore";
import useUserStore from "~/stores/userStore";
import useLocationStore from "~/stores/locationStore";

const clientDialogControl = ref(false)
const userDialogControl = ref(false)
const locationDialogControl = ref(false)
const userStore = useUserStore()
const locationStore = useLocationStore()
const clientStore = useClientStore()
const {clientList} = storeToRefs(clientStore)
const roles = Object.keys(rolesEnum).map(key => rolesEnum[key]);
roles.unshift('wszystkie')
const props = defineProps({
  filterType: {required: true},
  update: {required: true}
})
const search = ref('');
let role = ref('wszystkie');
let sortByName = ref(false);
let client = ref({
  name: null
})
let location = ref({
  name: null,
  street: null,
  city: null,
  postcode: null,
  client: null,
})
let user = ref({
  name: null,
  surname: null,
  password: null,
  email: null,
  role: null,
  employer: null
})
const newClient = async function () {
  const dev = await useApi(`/api/client`, {
    method: 'POST',
    body: {name: client.value.name},
  }).catch((error) => error.data);
  clientDialogControl.value = false
  await props.update()
}
const newUser = async function () {
  const dev = await useApi(`/api/auth/register`, {
    method: 'POST',
    body: {
      email: user.value.email,
      name: user.value.name,
      password: user.value.password,
      surname: user.value.surname,
      role: Object.entries(rolesEnum).find(([key, val]) => val === user.value.role)?.[0],
      employer: user.value.employer
    },
  }).catch((error) => error.data);
  userDialogControl.value = false
  await props.update()
}
const newLocation = async function () {
  const dev = await useApi(`/api/location`, {
    method: 'POST',
    body: {
      name: location.value.name,
      street: location.value.street,
      city: location.value.city,
      postcode: location.value.postcode,
      client: location.value.client
    },
  }).catch((error) => error.data);
  locationDialogControl.value = false
  await props.update()
}
const toggleUser = async function () {
  clientDialogControl.value = true
  await clientStore.updateClientList()
}
let emits = defineEmits(['searchData', 'roleFilter', 'sortByName'])
watch(search, (newValue, oldValue) => {
  emits("searchData", search.value)
  emits("roleFilter", role.value)
}, {deep: true})
watch(role, (newValue, oldValue) => {
  emits("searchData", search.value)
  emits("roleFilter", role.value)
}, {deep: true})
let sort = async function () {
  sortByName.value = !sortByName.value
  emits("sortByName", sortByName.value)
}
</script>

<template>
  <v-card class="listBox" style="margin-bottom: 20px;">
    <v-row align="center" style="max-height: 200px">
      <v-col cols="5" style="padding-bottom: 0">
          <v-text-field v-model="search" placeholder="szukaj"><v-icon>mdi-magnify</v-icon></v-text-field>
      </v-col>
      <v-col cols="3" style="padding-bottom: 0" v-if="props.filterType == filterTypeEnum.USER">
        <v-select v-model="role" :items="roles" label="roles" ></v-select>
      </v-col>

      <v-col style="text-align: center" cols="2">
        <v-btn @click="sort">sort by name</v-btn>
      </v-col>
      <v-spacer></v-spacer>

      <v-col style="text-align: center" cols="2" v-if="props.filterType == filterTypeEnum.USER">
        <v-btn @click="()=>userDialogControl=true" >
          new user
        </v-btn>
      </v-col>
      <v-col style="text-align: center" cols="2" v-if="props.filterType == filterTypeEnum.LOCATION">
        <v-btn @click="()=>locationDialogControl=true">
          new location
        </v-btn>
      </v-col>
      <v-col style="text-align: center" cols="2" v-if="props.filterType == filterTypeEnum.CLIENT">
        <v-btn @click="toggleUser()">
          new client
        </v-btn>
      </v-col>
    </v-row>
  </v-card>


  <v-dialog
      v-if="props.filterType == filterTypeEnum.CLIENT"
      v-model="clientDialogControl"
      width="500">
    <v-card>
      <v-card-title class="headline black" primary-title>
        New Client
      </v-card-title>
      <v-card-text class="pa-5">
        <v-form ref="sendForm">
          <v-text-field v-model="client.name" label="Name"></v-text-field>
        </v-form>

      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn @click="()=>clientDialogControl=false" outlined color="primary">Cancel</v-btn>
        <v-btn @click="newClient()" outlined color="primary">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


  <v-dialog
      v-if="props.filterType == filterTypeEnum.USER"
      v-model="userDialogControl"
      width="500">
    <v-card>
      <v-card-title class="headline black" primary-title>
        New User
      </v-card-title>
      <v-card-text class="pa-5">
        <v-form ref="sendForm">
          <v-text-field v-model="user.email" label="E-mail"></v-text-field>
          <v-text-field v-model="user.name" label="Name"></v-text-field>
          <v-text-field v-model="user.surname" label="Surname"></v-text-field>
          <v-text-field v-model="user.password" label="Pssword"></v-text-field>
          <v-select v-model="user.role" :items="roles" label="Roles"></v-select>
          <v-select v-model="user.employer" :items="clientList" item-title="name" item-value="id"
                    label="Employer"></v-select>

        </v-form>

      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn @click="()=>userDialogControl=false" outlined color="primary">Cancel</v-btn>
        <v-btn @click="newUser()" outlined color="primary">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


  <v-dialog
      v-model="locationDialogControl"
      width="500">
    <v-card>
      <v-card-title class="headline black" primary-title>
        New Location
      </v-card-title>
      <v-card-text class="pa-5">
        <v-form ref="sendForm">
          <v-text-field v-model="location.name" label="Name"></v-text-field>
          <v-text-field v-model="location.street" label="Street"></v-text-field>
          <v-text-field v-model="location.city" label="City"></v-text-field>
          <v-text-field v-model="location.postcode" label="Postcode"></v-text-field>
          <v-select v-model="location.client" :items="clientList" item-title="name" item-value="id"
                    label="Client"></v-select>
        </v-form>

      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn @click="()=>locationDialogControl=false" outlined color="primary">Cancel</v-btn>
        <v-btn @click="newLocation()" outlined color="primary">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.listBox {
}
</style>