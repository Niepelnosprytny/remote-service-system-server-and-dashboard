<script setup lang="ts">
import useClientStore from "~/stores/clientStore";
import statusEnum from "~/enums/modules/StatusEnum";
import useAuthStore from "~/stores/authStore";
import useFilterStore from "~/stores/filterStore";
import useReportStore from "~/stores/reportStore";

const clientStore = useClientStore();
await clientStore.updateClientList();
const store = useAuthStore();
const {user} = storeToRefs(store);
const {clientList} = storeToRefs(clientStore)
const filterStore = useFilterStore();
const status = Object.values(statusEnum);
const reportStore = useReportStore();
reportStore.resetFilters()
let filters = ref({reportClient: null, user: null, status: null})

const resetFilters = function (){
  filters.reportClient = null
  filters.user = null
  filters.status = null
  reportStore.resetFilters()
}
const setUserFilter = function (){
  filters.value.user = user.value;
  filters.value.status = null;
  filters.value.reportClient = null;
}
watch(
    filters,
    (newValue, oldValue) => {
      filterStore.setFilters(filters)
      reportStore.filterReportList()
    },
    {deep: true}
)
</script>

<template>
  <v-card style="margin: 25px 25px 0 25px; padding: 15px">
    <v-row>
      <v-spacer></v-spacer>
    <v-col align-self="center" style="margin-top: 20px;margin-right: 20px;margin-left: 20px">
    <v-select  v-model="filters.reportClient" label="Client" :items="clientList"
              item-title="name" item-value="id"></v-select>
    </v-col>
    <v-col align-self="center">
    <v-select style="margin-top: 20px;"  v-model="filters.status" label="Status" :items="status"></v-select>
    </v-col>
    <v-col cols="5" align-self="center">
    <v-btn style="margin-left: 25px;margin-right: 25px" @click="resetFilters" value="all">wszystkie</v-btn>
    <v-btn v-model="filters.user" @click="setUserFilter" v-if="!store.isAdmin()">przypisane do mnie</v-btn>
    </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>

</style>