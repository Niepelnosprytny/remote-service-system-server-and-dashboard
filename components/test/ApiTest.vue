<script setup lang="ts">
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
  allItems.value = await useApi(`/api/${activeTable.value}`).catch((error) => error.data);
};

const getItem = async () => {
  itemData.value = await useApi(`/api/${activeTable.value}/${id.value}`).catch((error) => error.data);
};

const createItem = async () => {
  createItemData.value = await useApi(`/api/${activeTable.value}`, {
    method: 'POST',
    body: json.value,
  }).catch((error) => error.data);
};

const updateItem = async () => {
  updateItemData.value = await useApi(`/api/${activeTable.value}/${id.value}`, {
    method: 'PATCH',
    body: json.value,
  }).catch((error) => error.data);
};

const deleteItem = async () => {
  deleteItemData.value = await useApi(`/api/${activeTable.value}/${id.value}`, {
    method: 'DELETE',
  }).catch((error) => error.data);
};

const showGeneralQuery = () => {
  toggleGeneralQuery = true;
  json.value = 'SELECT * FROM user, report WHERE user.id = report.created_by AND user.id = 5;';
};

const sendGeneralQuery = async () => {
  generalQuery.value = await useApi('/api', {
    method: 'POST',
    body: JSON.stringify(json.value),
  }).catch((error) => error.data);
};
</script>

<template>
  <div>
    <h1>API Tests</h1>
    <v-btn v-for="table in tables" :key="table" @click="setActiveTable(table)">
      {{ table }}
    </v-btn>
    <v-btn @click="showGeneralQuery">General query</v-btn>

    <v-expansion-panel title="General query" v-if="toggleGeneralQuery">
      <v-textarea v-model="json" placeholder="SQL query" rows="20" cols="100" />
      <br />
      <v-btn @click="sendGeneralQuery">Send</v-btn>
      <pre v-if="generalQuery">{{ generalQuery }}</pre>
    </v-expansion-panel>

    <div v-if="activeTable && !toggleGeneralQuery">
      <h3>{{ activeTable }}</h3>
      <details>
        <summary>Get all {{ activeTable }}</summary>
        <v-btn @click="getAllItems">Get all {{ activeTable }}</v-btn>
        <pre v-if="allItems">{{ allItems }}</pre>
      </details>

      <details>
        <summary>Get {{ activeTable }}</summary>
        <v-text-field v-model="id" type="number" placeholder="ID" />
        <br />
        <v-btn @click="getItem">Get {{ activeTable }}</v-btn>
        <pre v-if="itemData">{{ itemData }}</pre>
      </details>

      <details>
        <summary>Create {{ activeTable }}</summary>
        <v-textarea v-model="json" placeholder="object" rows="10" cols="50" />
        <br />
        <v-btn @click="createItem">Create {{ activeTable }}</v-btn>
        <pre v-if="createItemData">{{ createItemData }}</pre>
      </details>

      <details>
        <summary>Update {{ activeTable }}</summary>
        <v-text-field v-model="id" type="number" placeholder="ID" />
        <br />
        <v-textarea v-model="json" placeholder="object" rows="10" cols="50" />
        <br />
        <v-btn @click="updateItem">Update {{ activeTable }}</v-btn>
        <pre v-if="updateItemData">{{ updateItemData }}</pre>
      </details>

      <details>
        <summary>Delete {{ activeTable }}</summary>
        <v-text-field v-model="id" type="number" placeholder="ID" />
        <br />
        <v-btn @click="deleteItem">Delete {{ activeTable }}</v-btn>
        <pre v-if="deleteItemData">{{ deleteItemData }}</pre>
      </details>
    </div>
  </div>
</template>