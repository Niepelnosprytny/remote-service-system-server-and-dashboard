<script setup lang="ts">
import rolesEnum from "~/enums/modules/RolesEnum";
import useClientStore from "~/stores/clientStore";
const {$adminPanelWS} = useNuxtApp();

const props = defineProps({
  client: {required: true},
  update: {required: true},
})
const clientStore = useClientStore()
let dialogControl = ref(false)
let client = ref({
  name: null
})
const deleteClient = async function (id) {
  await useApi(`/api/client/${id}`, {
    method: 'DELETE',
  }).catch((error) => error.data);
  await props.update()
  $adminPanelWS.send('delete')
}
const editClient = async function (id) {
  await useApi(`/api/client/${id}`, {
    method: 'PATCH',
    body: {name: client.value.name},
  }).catch((error) => error.data);
  await props.update()
  dialogControl.value = false
  $adminPanelWS.send('edit')
}
const editDialog = function () {
  client.value.name = props.client.name
  dialogControl.value = true
}
</script>

<template>
  <v-row align="center">
    <v-col>
        <v-card-text>{{ props.client.name }}</v-card-text>
    </v-col>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-col cols="2">
      <v-btn style="margin-right: 10px" @click="editDialog" icon="mdi-pencil"></v-btn>
      <v-btn @click="deleteClient(props.client.id)" icon="mdi-trash-can"></v-btn>
    </v-col>
  </v-row>
  <v-dialog
      v-model="dialogControl"
      width="500">
    <v-card>
      <v-card-title class="headline black" primary-title>
        Edit Client
      </v-card-title>
      <v-card-text class="pa-5">
        <v-form ref="sendForm">
          <v-text-field v-model="client.name" label="Name"></v-text-field>
        </v-form>

      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn  @click="()=>dialogControl=false" outlined color="primary">Cancel</v-btn>
        <v-btn  @click="editClient(props.client.id)" outlined color="primary">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>