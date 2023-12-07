<script setup lang="ts">
import FilterTypeEnum from "~/enums/modules/FilterTypeEnum";

const props = defineProps({
  filterType: { required: true },
  filteredList: { },
})
</script>

<template>
  <v-card>
    <v-toolbar>
      <v-text-field >
szukaj
      </v-text-field>
    </v-toolbar>
    <v-btn>alfabetycznie</v-btn>
    <v-btn v-if="props.filterType == 'user'">role</v-btn>
    <v-btn v-if="props.filterType == 'user'">
      new user
    </v-btn>
    <v-btn v-if="props.filterType == 'location'">
      new location
    </v-btn>
    <v-btn v-if="props.filterType == 'client'">
      new client
    </v-btn>
  </v-card>
</template>

<style scoped>

</style>