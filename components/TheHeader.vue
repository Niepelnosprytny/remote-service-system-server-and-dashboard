<script setup lang="ts">
import useAuthStore from "~/stores/auth";
import {storeToRefs} from "pinia";
import useNotificationStore from "~/stores/notificationsStore";
const route = useRoute()
const store = useAuthStore();
const {user, token} = storeToRefs(store);

const notificationStore = useNotificationStore()
notificationStore.getNotificationList(store.getId())
const {notificationList} = storeToRefs(notificationStore)
const logout = async () => {
  store.logout();
  await navigateTo('/login');
}

const notificationRedirect = async (notification) => {
  await notificationStore.deleteNotification(notification,store.getId())
  await navigateTo(`/report/${notification.report_id}`);
}
</script>

<template>
  <v-toolbar style="padding-right: 15px;">
    <v-spacer></v-spacer>
    <v-card v-if="store.isAdmin()" style="margin-right: 25px">
      <NuxtLink v-if="route.path!=='/'" to="/">
        <v-btn style="padding-right: 15px">Dashboard</v-btn>
      </NuxtLink>
      <NuxtLink v-else to="/admin">
        <v-btn>Admin panel</v-btn>
      </NuxtLink>
    </v-card>
    <v-card style="margin-right: 15px">
      <v-btn>
        <v-icon v-if="notificationList.length==0" disabled="true">mdi-bell</v-icon>
        <v-icon v-else>mdi-bell-badge</v-icon>
        <v-menu activator="parent">
          <v-list>
            <v-list-item v-for="notification in notificationList" @click="notificationRedirect(notification)">
              <p>
                {{ notification.content }}
              </p>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </v-card>
    <v-card>
    <v-btn
        color="primary"
    >
      <p>
      <v-icon style="padding-right: 5px">mdi-account</v-icon>
      {{ `${user.name} ${user.surname}` }}
      </p>
      <v-menu activator="parent">
        <v-list>
          <v-list-item @click="logout">
            <p>
              <v-icon style="padding-right: 5px">mdi-logout</v-icon>
              Logout
            </p>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
    </v-card>

  </v-toolbar>
  <div >

  </div>

</template>