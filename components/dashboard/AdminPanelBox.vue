<script setup lang="ts">

import ReportList from "~/components/dashboard/report/ReportList.vue";
import useAuthStore from "~/stores/auth";
import {storeToRefs} from "pinia";
import ReportListFilters from "~/components/dashboard/report/ReportListFilters.vue";
import LocationList from "~/components/dashboard/location/LocationList.vue";
import ClientList from "~/components/dashboard/client/ClientList.vue";
import useReportStore from "~/stores/reportStore";
import UserList from "~/components/dashboard/user/UserList.vue";


const authStore = useAuthStore();

const {user, token} = storeToRefs(authStore);

const tab = ref('users')
</script>
<template>
    <v-card>
      <v-tabs
          v-model="tab"
          color="deep-purple-accent-4"
          align-tabs="center"
      >
        <v-tab value="users">Users</v-tab>
        <v-tab value="locations">Locations</v-tab>
        <v-tab value="clients">Clients</v-tab>
      </v-tabs>

      <v-card>
        <v-window v-model="tab">
          <v-window-item  value="users">
            <user-list></user-list>
          </v-window-item>

          <v-window-item value="locations">
            <location-list></location-list>
          </v-window-item>

          <v-window-item value="clients">
            <client-list></client-list>
          </v-window-item>
        </v-window>
      </v-card>
    </v-card>
</template>

<style scoped>

</style>