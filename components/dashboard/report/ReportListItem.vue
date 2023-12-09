<script setup lang="ts">
import useAuthStore from "~/stores/authStore";

const props = defineProps({
  report: { required: true },
})
const store = useAuthStore();
</script>

<template>
  <nuxt-link :to='"/report/"+props.report.id'>
  <div>
<p>{{props.report.title}}</p>

    <v-btn v-if="store.isAdmin()" icon="mdi-trash-can"></v-btn>
  </div>
  </nuxt-link>
</template>

<style scoped>

</style>