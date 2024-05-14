<script setup lang="ts">
import rolesEnum from "~/enums/modules/RolesEnum";
import filterTypeEnum from "~/enums/modules/FilterTypeEnum";
import useClientStore from "~/stores/clientStore";
import useUserStore from "~/stores/userStore";

const clientDialogControl = ref(false)
const userDialogControl = ref(false)
const locationDialogControl = ref(false)
const userStore = useUserStore()
const clientStore = useClientStore()
const {clientList, clientListEdit} = storeToRefs(clientStore)
const roles = Object.keys(rolesEnum).map(key => rolesEnum[key]);
const rolesEdit = Object.keys(rolesEnum).map(key => rolesEnum[key]);
roles.unshift('wszystkie')
const props = defineProps({
  filterType: {required: true},
  update: {required: true}
})
const search = ref('');
let role = ref('wszystkie');
let sortByName = ref(false);

const mainRules = [
  (e) => {
    if (e) return true
    return 'To pole jest wymagane'
  },
]
const clientRules = [
  (e) => {
    if (e) return true
    return 'To pole jest wymagane'
  },
]
const passRules = [
  (value) => {
    if (value) return true
    return 'To pole jest wymagane'
  },
  (value) => {
    if (value.length>=9) return true
    return 'Hasło musi mieć przynajmniej 9 znaków'
  },
  (value) => {
    if (value.length<=19) return true
    return 'Hasło nie może mieć więcej niż 19 znaków'
  },
  (value) =>{
    if(/[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value) && /[#?!@$%^&*-]/.test(value)) return true
    return 'Hasło musi mieć przynajmniej 1 wielką literę, 1 mała literę, 1 cyfre i znak specjalny'
  }
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
const sendForm = ref(null)
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
  const validation = await sendForm.value.validate()
  if(validation.valid) {
    const dev = await useApi(`/api/client`, {
      method: 'POST',
      body: {name: client.value.name},
    }).catch((error) => error.data);
    clientDialogControl.value = false
    await props.update()
  }
}

// defineExpose({
//   sendForm
// })
const newUser = async function () {
  const validation = await sendForm.value.validate()
  if(validation.valid){
    await userStore.newUser(user.value.email, user.value.name, user.value.password, user.value.surname, user.value.role, user.value.employer)
    user.value.name = null
    user.value.email = null
    user.value.surname = null
    user.value.password = null
    user.value.role = null
    user.value.employer = null
    userDialogControl.value = false
    await props.update()
  }
}
const newLocation = async function () {
  const validation = await sendForm.value.validate()
  if(validation.valid){
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
        <v-text-field v-model="search" placeholder="Szukaj">
          <v-icon>mdi-magnify</v-icon>
        </v-text-field>
      </v-col>
      <v-col cols="3" style="padding-bottom: 0" v-if="props.filterType == filterTypeEnum.USER">
        <v-select v-model="role" :items="roles" label="Role"></v-select>
      </v-col>

      <v-col style="text-align: center" cols="2">
        <v-btn @click="sort">Sortuj alfabetycznie</v-btn>
      </v-col>
      <v-spacer></v-spacer>

      <v-col style="text-align: center" cols="2" v-if="props.filterType == filterTypeEnum.USER">
        <v-btn @click="()=>userDialogControl=true">
          nowy użytkownik
        </v-btn>
      </v-col>
      <v-col style="text-align: center" cols="2" v-if="props.filterType == filterTypeEnum.LOCATION">
        <v-btn @click="()=>locationDialogControl=true">
          nowa lokacja
        </v-btn>
      </v-col>
      <v-col style="text-align: center" cols="2" v-if="props.filterType == filterTypeEnum.CLIENT">
        <v-btn @click="toggleUser()">
          nowy klient
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
        Nowy klient
      </v-card-title>
      <v-card-text class="pa-5">
        <v-form ref="sendForm">
          <v-text-field :rules="mainRules" v-model="client.name" label="Nazwa"></v-text-field>
        </v-form>

      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn @click="()=>clientDialogControl=false" outlined color="black">Anuluj</v-btn>
        <v-btn @click="newClient()" outlined color="black">Potwierdź</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


  <v-dialog
      v-if="props.filterType == filterTypeEnum.USER"
      v-model="userDialogControl"
      width="500">
    <v-card>
      <v-card-title class="headline black" primary-title>
        Nowy użytkownik
      </v-card-title>
      <v-card-text class="pa-5">
        <v-form ref="sendForm">
          <v-text-field style="padding-bottom: 10px" :rules="mailRules" v-model="user.email" label="E-mail"></v-text-field>
          <v-text-field style="padding-bottom: 10px" :rules="mainRules" v-model="user.name" label="Imię"></v-text-field>
          <v-text-field style="padding-bottom: 10px" :rules="mainRules" v-model="user.surname" label="Nazwisko"></v-text-field>
          <v-text-field style="margin-bottom: 15px" :rules="passRules" v-model="user.password" label="Hasło"></v-text-field>
          <v-select style="padding-bottom: 10px" :rules="mainRules" v-model="user.role" :items="rolesEdit" label="Rola"></v-select>
          <v-select style="padding-bottom: 10px" :rules="clientList" v-model="user.employer" :items="clientListEdit" item-title="name" item-value="id"
                    label="Klient"></v-select>

        </v-form>

      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn @click="()=>userDialogControl=false" outlined color="black">Cancel</v-btn>
        <v-btn @click="newUser()" outlined color="black">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


  <v-dialog
      v-model="locationDialogControl"
      width="500">
    <v-card>
      <v-card-title class="headline black" primary-title>
        Nowa lokacja
      </v-card-title>
      <v-card-text class="pa-5">
        <v-form validate-on="input" ref="sendForm">
          <v-text-field :rules="mainRules" v-model="location.name" label="Nazwa"></v-text-field>
          <v-text-field :rules="mainRules" v-model="location.street" label="Ulica"></v-text-field>
          <v-text-field :rules="mainRules" v-model="location.city" label="Miasto"></v-text-field>
          <v-text-field :rules="mainRules" v-model="location.postcode" label="Kod pocztowy"></v-text-field>
          <v-select :rules="clientRules" v-model="location.client" :items="clientList" item-title="name" item-value="id"
                    label="Klient"></v-select>
        </v-form>

      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn @click="()=>locationDialogControl=false" outlined color="black">Anuluj</v-btn>
        <v-btn @click="newLocation()" outlined color="black">Potwierdź</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.listBox {
}
</style>