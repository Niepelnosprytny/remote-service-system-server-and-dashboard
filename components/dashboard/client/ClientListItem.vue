<script setup lang="ts">
const props = defineProps({
 client: { required: true },
})
</script>

<template>
  <div>
<p>{{props.client}}</p>
  </div>
</template>

<style scoped>

</style>