<script setup lang="ts">
import ApiTest from "~/components/test/ApiTest.vue";

const { body: values } = await useApi('/api', {
  method: "POST",
  body: JSON.stringify("SHOW TABLES;")
});
</script>

<template>
  <ApiTest/>
  <img src="https://i.ytimg.com/vi/Y7MI_vvRYvk/maxresdefault.jpg" alt="Hello there">
  <pre v-if="values">{{ values }}</pre>
</template>