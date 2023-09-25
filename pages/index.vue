<script setup lang="ts">
const { $mysql } = useNuxtApp();
</script>

<template>
  <p>{{ $mysql.toString() }}</p>
<img src="https://i.ytimg.com/vi/Y7MI_vvRYvk/maxresdefault.jpg" alt="Hello there">
</template>
