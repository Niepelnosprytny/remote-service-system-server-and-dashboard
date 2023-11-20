<script setup lang="ts">
import { ref } from 'vue';

let id = ref(1);
const json = ref(`{
  "field": "value"
}`);

const tables = ref([
  'user',
  'client',
  'location',
  'report',
  'notification',
  'comment',
  'file',
  'userNotification',
  'reportHandledBy',
]);

const activeTable = ref('user');
const allItems = ref();
const itemData = ref();
const createItemData = ref();
const updateItemData = ref();
const deleteItemData = ref();
const generalQuery = ref();
let toggleGeneralQuery = false;

const setActiveTable = (table) => {
  toggleGeneralQuery = false;
  activeTable.value = table;
  allItems.value = null;
  itemData.value = null;
  createItemData.value = null;
  updateItemData.value = null;
  deleteItemData.value = null;

  json.value = JSON.stringify(
      {
        field: 'value',
      },
      null,
      2
  );
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

const showGeneralQuery = () => {
  toggleGeneralQuery = true;
  json.value = 'SELECT * FROM user, report WHERE user.id = report.created_by AND user.id = 5;';
};

const sendGeneralQuery = async () => {
  generalQuery.value = await $fetch('/api', {
    method: 'POST',
    body: json.value,
  }).catch((error) => error.data);
};
</script>

<template>
  <div>
    <h1>API Tests</h1>
    <button v-for="table in tables" :key="table" @click="setActiveTable(table)">
      {{ table }}
    </button>
    <button @click="showGeneralQuery">General query</button>

    <details v-if="toggleGeneralQuery">
      <summary>General query</summary>
      <textarea v-model="json" placeholder="SQL query" rows="20" cols="100" />
      <br />
      <button @click="sendGeneralQuery">Send</button>
      <pre v-if="generalQuery">{{ generalQuery }}</pre>
    </details>

    <details v-if="activeTable && !toggleGeneralQuery">
      <summary>{{ activeTable }}</summary>
      <details>
        <summary>Get all {{ activeTable }}</summary>
        <button @click="getAllItems">Get all {{ activeTable }}</button>
        <pre v-if="allItems">{{ allItems }}</pre>
      </details>

      <details>
        <summary>Get {{ activeTable }}</summary>
        <input v-model="id" type="number" placeholder="ID" />
        <br />
        <button @click="getItem">Get {{ activeTable }}</button>
        <pre v-if="itemData">{{ itemData }}</pre>
      </details>

      <details>
        <summary>Create {{ activeTable }}</summary>
        <textarea v-model="json" placeholder="object" rows="10" cols="50" />
        <br />
        <button @click="createItem">Create {{ activeTable }}</button>
        <pre v-if="createItemData">{{ createItemData }}</pre>
      </details>

      <details>
        <summary>Update {{ activeTable }}</summary>
        <input v-model="id" type="number" placeholder="ID" />
        <br />
        <textarea v-model="json" placeholder="object" rows="10" cols="50" />
        <br />
        <button @click="updateItem">Update {{ activeTable }}</button>
        <pre v-if="updateItemData">{{ updateItemData }}</pre>
      </details>

      <details>
        <summary>Delete {{ activeTable }}</summary>
        <input v-model="id" type="number" placeholder="ID" />
        <br />
        <button @click="deleteItem">Delete {{ activeTable }}</button>
        <pre v-if="deleteItemData">{{ deleteItemData }}</pre>
      </details>
    </details>
  </div>
</template>