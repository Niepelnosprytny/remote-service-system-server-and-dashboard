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
const {$adminPanelWS} = useNuxtApp();
watch($adminPanelWS.data, (newValue) => {
  update()
})
searchedFilteredList.value = userList.value
let filterByRole = function (value) {
  if (value != 'wszystkie') {
    roleFilter.value = value
    const index = Object.values(rolesEnum).indexOf(roleFilter.value as unknown as rolesEnum);
    const key = Object.keys(rolesEnum)[index];
    searchedFilteredList.value = filterStore.filterUserListByRole(searchedFilteredList.value, key)
  }
  if (!value) {
    searchedFilteredList.value = userList.value
  }
}
let sortByName = function (value) {
  sortBool.value = value
  userList.value = filterStore.sortByName(userList.value, sortBool.value)
  searchedFilteredList.value = filterStore.sortByName(searchedFilteredList.value, sortBool.value)
}
let search = function (value) {
  searchText.value = value
  if (value.length > 0) {
    searchedFilteredList.value = userList.value.filter(p => {
      return p.name.toLowerCase().includes(searchText.value) ||
          p.surname.toLowerCase().includes(searchText.value) ||
          p.email.toLowerCase().includes(searchText.value)
    })
  } else {
    searchedFilteredList.value = userList.value
  }
}
let update = async function () {
  await store.updateUserList()
  searchedFilteredList.value = userList.value
  search(searchText.value)
  sortByName(sortBool.value)
  filterByRole(roleFilter.value)
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
  <admin-panel-list-filters :update="update" @sortByName="sortByName" @roleFilter="filterByRole" @searchData="search"
                            :filter-type="FilterTypeEnum.USER"></admin-panel-list-filters>
  <v-card @scroll="scroll" class="listBox" style=" justify-content: center; height: 65vh; overflow-y: auto;">
    <v-col style="text-align: center" v-if="searchedFilteredList.length == 0">
      <v-card-text>Brak użytkowników.</v-card-text>
    </v-col>
    <v-col style="padding-bottom: 0;" v-for="(us,index) in searchedFilteredList">
      <v-card v-if="index<=helper" style="padding-bottom: 15px;padding-top: 15px">
        <user-list-item :update="update" :user="us"></user-list-item>
      </v-card>
    </v-col>
  </v-card>
</template>

<style scoped>
.listBox {
}
</style>