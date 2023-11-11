<template>
  <div>
    <h1>API Tests</h1>
    <button v-for="table in tables" :key="table" @click="setActiveTable(table)">
      {{ table }}
    </button>

    <details v-if="activeTable">
      <summary>{{ activeTable }}</summary>
      <details>
        <summary>Get all {{ activeTable }}</summary>
        <button @click="getAllItems">Get all {{ activeTable }}</button>
        <pre v-if="allItems">{{ allItems }}</pre>
      </details>

      <details>
        <summary>Get {{ activeTable }}</summary>
        <input v-model="id" type="number" placeholder="ID">
        <br>
        <button @click="getItem">Get {{ activeTable }}</button>
        <pre v-if="itemData">{{ itemData }}</pre>
      </details>

      <details>
        <summary>Create {{ activeTable }}</summary>
        <textarea v-model="json" placeholder="object" rows="10" cols="50"/>
        <br>
        <button @click="createItem">Create {{ activeTable }}</button>
        <pre v-if="createItemData">{{ createItemData }}</pre>
      </details>

      <details>
        <summary>Update {{ activeTable }}</summary>
        <input v-model="id" type="number" placeholder="ID">
        <br>
        <textarea v-model="json" placeholder="object" rows="10" cols="50"/>
        <br>
        <button @click="updateItem">Update {{ activeTable }}</button>
        <pre v-if="updateItemData">{{ updateItemData }}</pre>
      </details>

      <details>
        <summary>Delete {{ activeTable }}</summary>
        <input v-model="id" type="number" placeholder="ID">
        <br>
        <button @click="deleteItem">Delete {{ activeTable }}</button>
        <pre v-if="deleteItemData">{{ deleteItemData }}</pre>
      </details>
    </details>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

let id = ref();
const json = ref(``);

const tables = ref(['user', 'client', 'location', 'report', 'notification', 'comment', 'file', 'userNotification', 'reportHandledBy']);

const activeTable = ref('user');
const allItems = ref();
const itemData = ref();
const createItemData = ref();
const updateItemData = ref();
const deleteItemData = ref();

const setActiveTable = (table) => {
  activeTable.value = table;
  allItems.value = null;
  itemData.value = null;
  createItemData.value = null;
  updateItemData.value = null;
  deleteItemData.value = null;


  json.value = JSON.stringify({
    [activeTable.value]: {
      field: "value"
    }
  }, null, 2);
};

const getAllItems = async () => {
  allItems.value = await $fetch(`/api/${activeTable.value}`).catch((error) => error.data);
};

const getItem = async () => {
  itemData.value = await $fetch(`/api/${activeTable.value}/${id.value}`).catch((error) => error.data);
};

const createItem = async () => {
  createItemData.value = await $fetch(`/api/${activeTable.value}`, {
    method: 'POST',
    body: json.value,
  }).catch((error) => error.data);
};

const updateItem = async () => {
  updateItemData.value = await $fetch(`/api/${activeTable.value}/${id.value}`, {
    method: 'PATCH',
    body: json.value,
  }).catch((error) => error.data);
};

const deleteItem = async () => {
  deleteItemData.value = await $fetch(`/api/${activeTable.value}/${id.value}`, {
    method: 'DELETE',
  }).catch((error) => error.data);
};
</script>