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

const resetFilters = async function () {
  filters.reportClient = null
  filters.user = null
  filters.status = null
  reportStore.resetFilters()
}
const setUserFilter = function () {
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
  <v-card class="mainFilterFrame">
    <v-row>
      <v-spacer></v-spacer>

      <v-col cols="2" style="margin-top: 20px; margin-right: 20px;margin-left: 20px">
        <v-select bg-color="#fffaf3" v-model="filters.reportClient" label="Klient" :items="clientList"
                  item-title="name" item-value="id"></v-select>
      </v-col>
      <v-col cols="2">
        <v-select bg-color="#fffaf3" style="margin-top: 20px;" v-model="filters.status" label="Status"
                  :items="status"></v-select>
      </v-col>
      <v-col cols="2" style="text-align: center" align-self="center">
        <v-btn class="filterButtons" style="margin-left: 25px;margin-right: 25px; overflow-x: auto"
               @click="resetFilters" value="all">wszystkie
        </v-btn>
      </v-col>
      <v-col align-self="center" cols="3" v-if="!store.isAdmin()">
        <v-btn class="filterButtons" style="overflow-x: auto" v-model="filters.user" @click="setUserFilter">przypisane
          do mnie
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-card>
</template>

<style scoped>
.mainFilterFrame {
  background-image: linear-gradient(135deg, #a82e3f 0%, #007A92 100%);
  margin: 25px 25px 10px 25px;
}

.filterButtons {
  background-color: #fffaf3;
}
</style>