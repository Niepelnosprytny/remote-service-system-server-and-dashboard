<script setup lang="ts">
import {storeToRefs} from "pinia";
import useLocationStore from "~/stores/locationStore";
import LocationListItem from "~/components/dashboard/location/LocationListItem.vue";
import AdminPanelListFilters from "~/components/dashboard/AdminPanelListFilters.vue";
import FilterTypeEnum from "~/enums/modules/FilterTypeEnum";
import useFilterStore from "~/stores/filterStore";

const store = useLocationStore();
const {locationList} = storeToRefs(store);
await store.updateLocationList()

let searchedFilteredList = ref([])
searchedFilteredList.value = locationList.value
let filterStore = useFilterStore();
let searchText = ref('')
let sortBool = ref(false)
let sortByName = function (value){
  sortBool.value = value
  locationList.value = filterStore.sortByName(locationList.value, sortBool.value)
  searchedFilteredList.value = filterStore.sortByName(searchedFilteredList.value, sortBool.value)
}
let update = async function (){
  await store.updateLocationList()
  searchedFilteredList.value = locationList.value
  search(searchText.value)
  sortByName(sortBool.value)
}
let search = function (value){
  searchText.value = value.toLowerCase()
  if (value.length>0) {
    searchedFilteredList.value = locationList.value.filter(p => {
      return p.name.toLowerCase().includes(searchText.value) ||
          p.street.toLowerCase().includes(searchText.value) ||
          p.city.toLowerCase().includes(searchText.value)
    })
  }else{
    searchedFilteredList.value = locationList.value
  }
}
</script>

<template>
  <admin-panel-list-filters :update="update" @sortByName="sortByName" @searchData="search" :filter-type="FilterTypeEnum.LOCATION"></admin-panel-list-filters>
<v-col v-for="loc in searchedFilteredList">
  <location-list-item :update="update" :location="loc"></location-list-item>
</v-col>
</template>

<style scoped>

</style>