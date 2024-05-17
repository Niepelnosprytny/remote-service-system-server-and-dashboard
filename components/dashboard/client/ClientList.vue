<script setup lang="ts">
import {storeToRefs} from "pinia";
import useClientStore from "~/stores/clientStore";
import ClientListItem from "~/components/dashboard/client/ClientListItem.vue";
import AdminPanelListFilters from "~/components/dashboard/AdminPanelListFilters.vue";
import FilterTypeEnum from "~/enums/modules/FilterTypeEnum";
import useFilterStore from "~/stores/filterStore";
import {useWebSocket} from "@vueuse/core";
import LocationListItem from "~/components/dashboard/location/LocationListItem.vue";

const store = useClientStore();
const {clientList} = storeToRefs(store);
await store.updateClientList()
let searchedFilteredList = ref([])
let filterStore = useFilterStore();
searchedFilteredList.value = filterStore.reverseArr(clientList.value)
let searchText = ref('')
let sorted = ref(false)
let sortBool = ref(false)
const loading = ref(false)
let sortByName = function (value) {
  if(!sorted.value){
    sorted.value=!sorted.value
  }
  sortBool.value = value
  clientList.value = filterStore.sortByName(clientList.value, sortBool.value)
  searchedFilteredList.value = filterStore.sortByName(searchedFilteredList.value, sortBool.value)
}
const control = ref(null)
const {$adminPanelWS} = useNuxtApp();
watch($adminPanelWS.data, (newValue) => {
  update()
})
let update = async function () {
  await store.updateClientList()
  searchedFilteredList.value = filterStore.reverseArr(clientList.value)
  if(searchText.value.length>0) {
    search(searchText.value)
  }
  if(sorted.value){
    sortByName(sortBool.value)
  }
}
let search = function (value) {
  searchText.value = value.toLowerCase()
  if (value.length > 0) {
    searchedFilteredList.value = clientList.value.filter(p => {
      return p.name.toLowerCase().includes(searchText.value)
    })
  } else {
    searchedFilteredList.value = clientList.value
  }
}
const numberOfLoads = ref(1)
const helper = ref(numberOfLoads.value*6)
const scroll = function (e) {
  const {scrollTop, offsetHeight, scrollHeight} = e.target
  if ((scrollTop + offsetHeight) >= scrollHeight) {
    if(numberOfLoads.value*7<=searchedFilteredList.value.length){
      numberOfLoads.value++
      helper.value = numberOfLoads.value*7
    }
  }
}
</script>

<template>
  <admin-panel-list-filters :update="update" @sortByName="sortByName" @searchData="search"
                            :filter-type="FilterTypeEnum.CLIENT"></admin-panel-list-filters>
  <v-card @scroll="scroll" class="listBox" style=" justify-content: center; height: 65vh; overflow-y: auto;">
    <v-container style="text-align: center" v-if="loading">
      <v-progress-circular indeterminate></v-progress-circular>
    </v-container>
    <v-col style="text-align: center" v-if="searchedFilteredList.length == 0">
      <v-card-text>Brak klientów.</v-card-text>
    </v-col>
    <v-col @click="()=>{control=cl.id}" style="padding-bottom: 0;" v-for="(cl,index) in searchedFilteredList">
        <client-list-item v-if="index<=helper" :index="control" :update="update" :client="cl"></client-list-item>
    </v-col>
  </v-card>
</template>

<style scoped>
.listBox {
}
</style>