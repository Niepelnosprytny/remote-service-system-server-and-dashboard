<script setup lang="ts">
import rolesEnum from "~/enums/modules/RolesEnum";
import useLocationStore from "~/stores/locationStore";
import useClientStore from "~/stores/clientStore";

const props = defineProps({
  location: { required: true },
  update: {required: true}
})
const clientStore = useClientStore()
const {clientList} = storeToRefs(clientStore)
let dialogControl = ref(false)
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
}
const editLocation = async function (id) {
  if(location.value.client.id){
    location.value.client = location.value.client.id
  }
  await useApi(`/api/location/${id}`, {
    method: 'PATCH',
    body: {street: location.value.street, name: location.value.name, city: location.value.city, postcode: location.value.postcode, client: location.value.client},
  }).catch((error) => error.data);
  await props.update()
  dialogControl.value = false
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
  <v-row align="center">
    <v-col>
      <v-card-text>
        <p>{{props.location.name}}</p>
      </v-card-text>
    </v-col>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-col>
      <v-btn @click="deleteLocation(props.location.id)" icon="mdi-trash-can"></v-btn>
      <v-btn @click="editDialog" icon="mdi-pencil"></v-btn>
    </v-col>
  </v-row>



  <v-dialog
      v-model="dialogControl"
      width="500">
    <v-card>
      <v-card-title class="headline black" primary-title>
        Edit Location
      </v-card-title>
      <v-card-text class="pa-5">
        <v-form ref="sendForm">
          <v-text-field v-model="location.name" label="Name"></v-text-field>
          <v-text-field v-model="location.street" label="Street"></v-text-field>
          <v-text-field v-model="location.city" label="City"></v-text-field>
          <v-text-field v-model="location.postcode" label="Postcode"></v-text-field>
          <v-select v-model="location.client" :items="clientList" label="Client" item-title="name" item-value="id" ></v-select>
        </v-form>

      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn @click="()=>dialogControl=false" outlined color="primary">Cancel</v-btn>
        <v-btn @click="editLocation(props.location.id)" outlined color="primary">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>