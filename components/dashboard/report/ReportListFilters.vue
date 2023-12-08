<script setup lang="ts">
import useClientStore from "~/stores/clientStore";
import statusEnum from "~/enums/modules/StatusEnum";
import useAuthStore from "~/stores/auth";
const clientStore = useClientStore();
clientStore.updateClientList();
const store = useAuthStore();
const {user} = storeToRefs(store);
const {clientList} = storeToRefs(clientStore)
const status = Object.keys(statusEnum).map(key => statusEnum[key]);

const filters = ref({client:null,user:null,status:null})
watch(
    filters,
    (newValue, oldValue)=>{

    },
    {deep: true}
)
</script>

<template>
  <v-select v-model="filters.client" label="Client" :items="clientList"  item-title="name"></v-select>
  <v-select v-model="filters.status" label="Status" :items="status"></v-select>
  <v-btn v-model="filters.user" value="all" v-if="!store.isAdmin()">wszystkie</v-btn>
  <v-btn v-model="filters.user" :value="user" v-if="!store.isAdmin()">przypisane do mnie</v-btn>
</template>

<style scoped>

</style>