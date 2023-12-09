<script setup lang="ts">
const props = defineProps({
  location: { required: true },
})
</script>

<template>
  <div>
<p>{{props.location}}</p>
  </div>
</template>

<style scoped>

</style>