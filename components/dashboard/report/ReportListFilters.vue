<script setup lang="ts">
import useClientStore from "~/stores/clientStore";
import statusEnum from "~/enums/modules/StatusEnum";
import useAuthStore from "~/stores/authStore";
const clientStore = useClientStore();
clientStore.updateClientList();
const store = useAuthStore();
const {clientList} = storeToRefs(clientStore)
const status = Object.keys(statusEnum).map(key => statusEnum[key]);

</script>

<template>
  <v-select :label="'Client'" :items="clientList"  item-title="name"></v-select>
  <v-select :label="'Status'" :items="status"></v-select>
  <v-btn v-if="!store.isAdmin()">wszystkie</v-btn>
  <v-btn v-if="!store.isAdmin()">przypisane do mnie</v-btn>
</template>

<style scoped>

</style>