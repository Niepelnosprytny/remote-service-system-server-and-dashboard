<script setup lang="ts">

import ReportList from "~/components/dashboard/report/ReportList.vue";
import useAuthStore from "~/stores/authStore";
import {storeToRefs} from "pinia";
import ReportListFilters from "~/components/dashboard/report/ReportListFilters.vue";
import LocationList from "~/components/dashboard/location/LocationList.vue";
import ClientList from "~/components/dashboard/client/ClientList.vue";
import useReportStore from "~/stores/reportStore";
import UserList from "~/components/dashboard/user/UserList.vue";


const authStore = useAuthStore();

const {user, token} = storeToRefs(authStore);
const tab = ref('0')
const tabs = [
  {id: 1, name: 'użytkownicy'},
  {id: 2, name: 'lokacje'},
  {id: 3, name: 'klienci'}
]
</script>
<template>
  <div style="height: 85vh;">
  <v-card style="border-bottom-right-radius: 0;margin-left: 25px; margin-right: 25px; border-bottom-left-radius: 0">
    <v-tabs
        v-model="tab"
        color="#a82e3f"
        align-tabs="center"
    >
      <v-tab style="width: 34%" v-for="tab of tabs" :key="tab.id">{{ tab.name }}</v-tab>
    </v-tabs>
  </v-card>

  <v-window v-model="tab">
    <v-window-item value="0" eager>
      <user-list></user-list>
    </v-window-item>

    <v-window-item value="1" eager>
      <location-list></location-list>
    </v-window-item>

    <v-window-item value="2" eager>
      <client-list></client-list>
    </v-window-item>
  </v-window>
  </div>
</template>

<style>
.listBox {

}
</style>