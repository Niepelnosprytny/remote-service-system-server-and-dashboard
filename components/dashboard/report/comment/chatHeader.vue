<script setup lang="ts">

const props = defineProps({
  author: { required: true },
})


</script>

<template>
    <div>
      <p>{{props.author.email}}</p>
    </div>
</template>

<style scoped>

</style>