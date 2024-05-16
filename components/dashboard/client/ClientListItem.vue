<script setup lang="ts">
import rolesEnum from "~/enums/modules/RolesEnum";
import useClientStore from "~/stores/clientStore";
import useUserStore from "~/stores/userStore";
import useLocationStore from "~/stores/locationStore";

const userStore = useUserStore()
const locationStore = useLocationStore()
const {$adminPanelWS} = useNuxtApp();
const sendForm = ref()
const mainRules = [
  (e) => {
    if (e) return true
    return 'To pole jest wymagane'
  },
]
const props = defineProps({
  client: {required: true},
  update: {required: true},
  index: {required: true},
})
let dialogControl = ref(false)
let client = ref({
  name: null
})
const deleteRef = ref(false)
const deleteClient = async function (id) {
  await useApi(`/api/client/${id}`, {
    method: 'DELETE',
  }).catch((error) => error.data);
  await userStore.updateUserList()
  await locationStore.updateLocationList()
  await props.update()
  deleteRef.value=false
  $adminPanelWS.send('delete')
}
const editClient = async function (id) {
  const validation = await sendForm.value.validate()
  if (validation.valid) {
    await useApi(`/api/client/${id}`, {
      method: 'PATCH',
      body: {name: client.value.name},
    }).catch((error) => error.data);
    await props.update()
    dialogControl.value = false
    $adminPanelWS.send('edit')
  }
}
const editDialog = function () {
  client.value.name = props.client.name
  dialogControl.value = true
}
</script>

<template>
  <v-card style="padding-bottom: 15px;padding-top: 15px">
    <v-row align="center">
      <v-col>
        <v-card-text>{{ props.client.name }}</v-card-text>
      </v-col>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col cols="2">
        <v-btn v-if="!deleteRef || props.index !== props.client.id" style="margin-right: 10px" @click="editDialog" icon="mdi-pencil"></v-btn>
        <v-btn v-if="!deleteRef || props.index !== props.client.id" @click="deleteRef = true" icon="mdi-trash-can"></v-btn>
        <v-btn v-if="deleteRef && props.index === props.client.id" style="margin-right: 10px" @click="deleteClient(props.client.id)"
               icon="mdi-check"></v-btn>
        <v-btn v-if="deleteRef && props.index === props.client.id" @click="deleteRef = false" icon="mdi-close"></v-btn>
      </v-col>
    </v-row>
  </v-card>
  <v-dialog
      ref="sendForm"
      v-model="dialogControl"
      width="500">
    <v-card>
      <v-card-title class="headline black" primary-title>
        Edytuj Klienta
      </v-card-title>
      <v-card-text class="pa-5">
        <v-form ref="sendForm">
          <v-text-field :rules="mainRules" v-model="client.name" label="Nazwa"></v-text-field>
        </v-form>

      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn @click="()=>dialogControl=false" outlined color="black">Cancel</v-btn>
        <v-btn @click="editClient(props.client.id)" outlined color="black">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>