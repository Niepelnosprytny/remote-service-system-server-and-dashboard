<script setup lang="ts">
import {storeToRefs} from "pinia";
import useUserStore from "~/stores/userStore";
import AdminPanelListFilters from "~/components/dashboard/AdminPanelListFilters.vue";
import FilterTypeEnum from "~/enums/modules/FilterTypeEnum";
import UserListItem from "~/components/dashboard/user/UserListItem.vue";
import useFilterStore from "~/stores/filterStore";
import rolesEnum from "~/enums/modules/RolesEnum";

const store = useUserStore();
await store.updateUserList()
let {userList} = storeToRefs(store);
let filterStore = useFilterStore()
let searchedFilteredList = ref([])
let searchText = ref('')
let sortBool = ref(false)
let roleFilter = ref(null)

searchedFilteredList.value = userList.value
let filterByRole = function (value){
  roleFilter.value = value
  const index = Object.values(rolesEnum).indexOf(roleFilter.value as unknown as rolesEnum);
  const key = Object.keys(rolesEnum)[index];
  searchedFilteredList.value = filterStore.filterUserListByRole(userList.value,key)
  if(searchText.value.length>0){search(searchText.value)}

}
let sortByName = function (value){
    sortBool.value = value
    userList.value = filterStore.sortByName(userList.value, sortBool.value)
    searchedFilteredList.value = filterStore.sortByName(searchedFilteredList.value, sortBool.value)
}
let search = function (value){
  searchText.value = value
  if (value.length>0) {
    searchedFilteredList.value = userList.value.filter(p => {
      return p.name.toLowerCase().includes(searchText.value) ||
          p.surname.toLowerCase().includes(searchText.value) ||
          p.email.toLowerCase().includes(searchText.value)
    })
  }else{
    searchedFilteredList.value = userList.value
  }
}
let update = async function (){
  await store.updateUserList()
  searchedFilteredList.value = userList.value
  search(searchText.value)
  sortByName(sortBool.value)
  if(roleFilter!=null){
    filterByRole(roleFilter.value)
  }
}
</script>

<template>
  <admin-panel-list-filters :update="update" @sortByName="sortByName" @roleFilter="filterByRole" @searchData="search" :filter-type="FilterTypeEnum.USER"></admin-panel-list-filters>
  <v-col v-for="us in searchedFilteredList">
  <user-list-item :update="update" :user="us"></user-list-item>
  </v-col>
</template>

<style scoped>

</style>