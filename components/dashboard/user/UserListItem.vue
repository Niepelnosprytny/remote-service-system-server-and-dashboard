<script setup lang="ts">
const props = defineProps({
  user: { required: true },
})
</script>

<template>
  <div>
<p>{{props.user.name}}</p>
  </div>
</template>

<style scoped>

</style>