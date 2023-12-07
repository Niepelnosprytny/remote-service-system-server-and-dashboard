<script setup lang="ts">
import {storeToRefs} from "pinia";
import useUserStore from "~/stores/userStore";
import UserListItem from "~/components/dashboard/user/UserListItem.vue";
import AdminPanelListFilters from "~/components/dashboard/AdminPanelListFilters.vue";
import FilterTypeEnum from "~/enums/modules/FilterTypeEnum";

const store = useUserStore();
store.updateUserList()

const {filteredUserList,userList} = storeToRefs(store);
</script>

<template>
  <admin-panel-list-filters :filter-type="FilterTypeEnum.USER"></admin-panel-list-filters>
<h1 v-for="us in userList">
  <user-list-item :user="us"></user-list-item>
</h1>
</template>

<style scoped>

</style>