<script setup lang="ts">
import {storeToRefs} from "pinia";
import useUserStore from "~/stores/userStore";
import AdminPanelListFilters from "~/components/dashboard/AdminPanelListFilters.vue";
import FilterTypeEnum from "~/enums/modules/FilterTypeEnum";
import UserListItem from "~/components/dashboard/user/UserListItem.vue";

const store = useUserStore();
store.updateUserList()

let {filteredUserList,userList} = storeToRefs(store);
</script>

<template>
  <admin-panel-list-filters :filter-type="FilterTypeEnum.USER"></admin-panel-list-filters>
  <v-col v-for="us in userList">
  <user-list-item :user="us"></user-list-item>
  </v-col>
</template>

<style scoped>

</style>