<script setup lang="ts">
import {storeToRefs} from "pinia";
import useClientStore from "~/stores/clientStore";
import ClientListItem from "~/components/dashboard/client/ClientListItem.vue";
import AdminPanelListFilters from "~/components/dashboard/AdminPanelListFilters.vue";
import FilterTypeEnum from "~/enums/modules/FilterTypeEnum";
import useFilterStore from "~/stores/filterStore";

const store = useClientStore();

const {clientList} = storeToRefs(store);
await store.updateClientList()

let searchedFilteredList = ref([])
searchedFilteredList.value = clientList.value
let filterStore = useFilterStore();
let searchText = ref('')
let sortBool = ref(false)
let sortByName = function (value){
  sortBool.value = value
  clientList.value = filterStore.sortByName(clientList.value, sortBool.value)
  searchedFilteredList.value = filterStore.sortByName(searchedFilteredList.value, sortBool.value)
}
let update = async function (){
  await store.updateClientList()
  searchedFilteredList.value = clientList.value
  search(searchText.value)
  sortByName(sortBool.value)
}
let search = function (value){
  searchText.value = value.toLowerCase()
  if (value.length>0) {
    searchedFilteredList.value = clientList.value.filter(p => {
      return p.name.toLowerCase().includes(searchText.value)
    })
  }else{
    searchedFilteredList.value = clientList.value
  }
}
</script>

<template>
  <admin-panel-list-filters :update="update" @sortByName="sortByName" @searchData="search" :filter-type="FilterTypeEnum.CLIENT"></admin-panel-list-filters>
<v-col v-for="cl in searchedFilteredList">
  <client-list-item :update="update" :client="cl"></client-list-item>
</v-col>
</template>

<style scoped>

</style>