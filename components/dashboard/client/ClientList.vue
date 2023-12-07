<script setup lang="ts">
import {storeToRefs} from "pinia";
import useClientStore from "~/stores/clientStore";
import ClientListItem from "~/components/dashboard/client/ClientListItem.vue";
import AdminPanelListFilters from "~/components/dashboard/AdminPanelListFilters.vue";
import FilterTypeEnum from "~/enums/modules/FilterTypeEnum";

const store = useClientStore();
store.updateClientList()

const {filteredClientList,clientList} = storeToRefs(store);
</script>

<template>
  <admin-panel-list-filters :filter-type="FilterTypeEnum.CLIENT"></admin-panel-list-filters>
<h1 v-for="cl in clientList">
  <client-list-item :client="cl"></client-list-item>
</h1>
</template>

<style scoped>

</style>