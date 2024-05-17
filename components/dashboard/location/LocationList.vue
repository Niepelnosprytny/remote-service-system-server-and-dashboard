<script setup lang="ts">
import {storeToRefs} from "pinia";
import useLocationStore from "~/stores/locationStore";
import LocationListItem from "~/components/dashboard/location/LocationListItem.vue";
import AdminPanelListFilters from "~/components/dashboard/AdminPanelListFilters.vue";
import FilterTypeEnum from "~/enums/modules/FilterTypeEnum";
import useFilterStore from "~/stores/filterStore";
import ClientListItem from "~/components/dashboard/client/ClientListItem.vue";

const store = useLocationStore();
const {locationList} = storeToRefs(store);
await store.updateLocationList()
const control = ref(null)
let sorted = ref(false)
let searchedFilteredList = ref([])
let filterStore = useFilterStore();
searchedFilteredList.value = filterStore.reverseArr(locationList.value)
let searchText = ref('')
let sortBool = ref(false)
const {$adminPanelWS} = useNuxtApp();
const comCop = computed(()=>{return locationList.value.length})
watch(comCop, () => {
  update()
})
watch($adminPanelWS.data, (newValue) => {
  update()
})
let sortByName = function (value) {
  if(!sorted.value){
    sorted.value=!sorted.value
  }
  sortBool.value = value
  locationList.value = filterStore.sortByName(locationList.value, sortBool.value)
  searchedFilteredList.value = filterStore.sortByName(searchedFilteredList.value, sortBool.value)
}
let update = async function () {
  await store.updateLocationList()
  searchedFilteredList.value = filterStore.reverseArr(locationList.value)
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
    searchedFilteredList.value = locationList.value.filter(p => {
      return p.name.toLowerCase().includes(searchText.value) ||
          p.street.toLowerCase().includes(searchText.value) ||
          p.city.toLowerCase().includes(searchText.value)
    })
  } else {
    searchedFilteredList.value = locationList.value
  }
}
const numberOfLoads = ref(1)
const helper = ref(numberOfLoads.value*7)
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
                            :filter-type="FilterTypeEnum.LOCATION"></admin-panel-list-filters>
  <v-card @scroll="scroll" class="listBox" style=" justify-content: center; height: 65vh; overflow-y: auto;">
    <v-col style="text-align: center" v-if="searchedFilteredList.length == 0">
      <v-card-text>Brak lokacji.</v-card-text>
    </v-col>
    <v-col @click="()=>{control=loc.id}"  style="padding-bottom: 0" v-for="(loc,index) in searchedFilteredList">
        <location-list-item v-if="index<=helper" :index="control" :update="update" :location="loc"></location-list-item>
    </v-col>
  </v-card>
</template>

<style scoped>
.listBox{}
</style>