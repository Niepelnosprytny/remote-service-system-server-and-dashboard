<script setup lang="ts">
import useAuthStore from "~/stores/authStore";
import {storeToRefs} from "pinia";
import useNotificationStore from "~/stores/notificationsStore";
import {useWebSocket} from "@vueuse/core";
const route = useRoute()
const store = useAuthStore();
const {user} = storeToRefs(store);
const {$notifWs} = useNuxtApp()

const notificationStore = useNotificationStore()
notificationStore.getNotificationList()
const {notificationList} = storeToRefs(notificationStore)

watch($notifWs.data, (newValue) => {
    notificationStore.getNotificationList()
})


const logout = async () => {
  store.logout();
  await navigateTo('/login');
}

const notificationRedirect = async (notification) => {
  await notificationStore.deleteNotification(notification, store.getId())
  await navigateTo(`/report/${notification.report_id}`);
}
</script>

<template>
  <v-toolbar class="header">
    <v-spacer></v-spacer>
    <v-card class="headerButtons"  style="margin-right: 25px">
      <NuxtLink v-if="route.path!=='/'" replace to="/">
        <v-btn color="black">Lista zgłoszeń</v-btn>
      </NuxtLink>
      <NuxtLink v-if="store.isAdmin() && route.path == '/'" to="/admin">
        <v-btn color="black">Panel administratora</v-btn>
      </NuxtLink>
    </v-card>
    <v-card class="headerButtons" style="margin-right: 15px">
      <v-btn disabled v-if="notificationList.length==0">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn v-else>
        <v-icon>mdi-bell-badge</v-icon>
        {{notificationList.length}}
        <v-menu activator="parent">
          <v-list style="background-color: #fffaf3; padding: 0; max-width: 350px;  max-height: 600px">
            <v-list-item style="margin-bottom: 5px" class="headerButtons" v-for="notification in notificationList" @click="notificationRedirect(notification)">
              <v-card-text>
                {{ notification.content }}
              </v-card-text>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </v-card>
    <v-card  class="headerButtons">
      <v-btn>
          <v-icon style="padding-right: 5px">mdi-account</v-icon>
          {{ `${user.name} ${user.surname}` }}
        <v-menu activator="parent">
          <v-list class="headerButtons" style="padding: 0">
            <v-list-item class="headerButtons" @click="logout">
                <v-icon style="padding-right: 5px">mdi-logout</v-icon>
                Wyloguj
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </v-card>

  </v-toolbar>


</template>
<style>
.header{
  box-shadow: 0 11px 27px -16px rgba(66, 68, 90, 1);
  z-index: 20;
  position: fixed;
  top: 0;
  background-color: #007a92;
  padding-right: 15px;
}
.headerButtons{
  background-color: #fffaf3
}
</style>