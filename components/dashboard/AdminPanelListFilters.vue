<script setup lang="ts">
import FilterTypeEnum from "~/enums/modules/FilterTypeEnum";
import rolesEnum from "~/enums/modules/RolesEnum";
import filterTypeEnum from "~/enums/modules/FilterTypeEnum";
const roles = Object.keys(rolesEnum).map(key => rolesEnum[key]);
const props = defineProps({
  filterType: { required: true },
  filteredList: { },
})
const search = '';
</script>

<template>
  <v-card>
    <v-toolbar>
      <v-text-field v-model="search" placeholder="szukaj">
      </v-text-field>
    </v-toolbar>
    <v-btn>alfabetycznie</v-btn>
    <v-select :items="roles" label="roles" v-if="props.filterType == 'user'"></v-select>
    <v-btn v-if="props.filterType == filterTypeEnum.USER">
      new user
    </v-btn>
    <v-btn v-if="props.filterType == filterTypeEnum.LOCATION">
      new location
    </v-btn>
    <v-btn v-if="props.filterType == filterTypeEnum.CLIENT">
      new client
    </v-btn>
  </v-card>
</template>

<style scoped>

</style>