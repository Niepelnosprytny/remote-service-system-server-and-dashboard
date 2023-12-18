<script setup lang="ts">
import {storeToRefs} from "pinia";
import useLocationStore from "~/stores/locationStore";
import LocationListItem from "~/components/dashboard/location/LocationListItem.vue";
import AdminPanelListFilters from "~/components/dashboard/AdminPanelListFilters.vue";
import FilterTypeEnum from "~/enums/modules/FilterTypeEnum";

const store = useLocationStore();
store.updateLocationList()

const {filteredLocationList,locationList} = storeToRefs(store);
</script>

<template>
  <admin-panel-list-filters :filter-type="FilterTypeEnum.LOCATION"></admin-panel-list-filters>
<v-col v-for="loc in locationList">
  <location-list-item :location="loc"></location-list-item>
</v-col>
</template>

<style scoped>

</style>