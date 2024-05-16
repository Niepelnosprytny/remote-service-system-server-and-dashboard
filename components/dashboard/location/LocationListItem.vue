<script setup lang="ts">
import rolesEnum from "~/enums/modules/RolesEnum";
import useLocationStore from "~/stores/locationStore";
import useClientStore from "~/stores/clientStore";
const {$adminPanelWS} = useNuxtApp();
const clientStore = useClientStore();
const props = defineProps({
  location: { required: true },
  update: {required: true},
  index: {required: true}
})
const mainRules = [
  (e) => {
    if (e) return true
    return 'To pole jest wymagane'
  },
]
const client = await clientStore.getClient(props.location.client)
const {clientList} = storeToRefs(clientStore)
let dialogControl = ref(false)
let deleteRef = ref(false)
let location = ref({
  name: null,
  street: null,
  city: null,
  postcode: null,
  client: null
})
const deleteLocation = async function (id) {
  await useApi(`/api/location/${id}`, {
    method: 'DELETE',
  }).catch((error) => error.data);
  await props.update()
  $adminPanelWS.send('delete')
}
const sendForm = ref(null)
const editLocation = async function (id) {
  if(location.value.client.id){
    location.value.client = location.value.client.id
  }
  const validation = await sendForm.value.validate()
  if (validation.valid) {
    await useApi(`/api/location/${id}`, {
      method: 'PATCH',
      body: {
        street: location.value.street,
        name: location.value.name,
        city: location.value.city,
        postcode: location.value.postcode,
        client: location.value.client
      },
    }).catch((error) => error.data);
    await props.update()
    $adminPanelWS.send('edit')
    dialogControl.value = false
  }
}
const editDialog = async function () {
  location.value.name = props.location.name
  location.value.street = props.location.street
  location.value.city = props.location.city
  location.value.postcode = props.location.postcode
  location.value.client = await clientStore.getClient(props.location.client)
  await clientStore.updateClientList()
  dialogControl.value = true
}
</script>

<template>
  <v-card  style="padding-bottom: 15px;padding-top: 15px">

  <v-row align="center">
    <v-col cols="3">
      <v-card-text>
        {{props.location.name}}
      </v-card-text>
    </v-col>
    <v-col cols="2">
      <v-card-text>
        {{props.location.street}}
      </v-card-text>
    </v-col>
    <v-col cols="2">
      <v-card-text>
        {{props.location.city}}
      </v-card-text>
    </v-col>
    <v-col cols="1">
      <v-card-text>
        {{props.location.postcode}}
      </v-card-text>
    </v-col>
    <v-col>
      <v-card-text>
        {{client.name}}
      </v-card-text>
    </v-col>
    <v-col cols="2">
      <v-btn v-if="!deleteRef || props.index !== props.location.id" style="margin-right: 10px" @click="editDialog" icon="mdi-pencil"></v-btn>
      <v-btn v-if="!deleteRef || props.index !== props.location.id" @click="deleteRef = true" icon="mdi-trash-can"></v-btn>
      <v-btn v-if="deleteRef && props.index === props.location.id" style="margin-right: 10px" @click="deleteLocation(props.location.id)"
             icon="mdi-check"></v-btn>
      <v-btn v-if="deleteRef && props.index === props.location.id" @click="deleteRef = false" icon="mdi-close"></v-btn>
    </v-col>
  </v-row>
  </v-card>


  <v-dialog
      v-model="dialogControl"
      width="500">
    <v-card>
      <v-card-title class="headline black" primary-title>
        Edytuj lokacje
      </v-card-title>
      <v-card-text class="pa-5">
        <v-form ref="sendForm">
          <v-text-field :rules="mainRules" v-model="location.name" label="Nazwa"></v-text-field>
          <v-text-field :rules="mainRules" v-model="location.street" label="Ulica"></v-text-field>
          <v-text-field :rules="mainRules" v-model="location.city" label="Miasto"></v-text-field>
          <v-text-field :rules="mainRules" v-model="location.postcode" label="Kod pocztowy"></v-text-field>
          <v-select :rules="mainRules" v-model="location.client" :items="clientList" label="Klient" item-title="name" item-value="id" ></v-select>
        </v-form>

      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn @click="()=>dialogControl=false" outlined color="black">Anuluj</v-btn>
        <v-btn @click="editLocation(props.location.id)" outlined color="black">Potwierdź</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>