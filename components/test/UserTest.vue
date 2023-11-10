<template>
  <div>
    <h1>User API Tests</h1>
    <button @click="getUsers">Users</button>
    <button @click="getUser">Get User</button>
    <button @click="createUser">Create User</button>
    <button @click="updateUser">Update User</button>
    <button @click="deleteUser">Delete User</button>

    <div v-if="users">
      <h2>Users</h2>
      <pre>{{ users }}</pre>
    </div>

    <div v-if="userData">
      <h2>User Data</h2>
      <pre>{{ userData }}</pre>
    </div>

    <div v-if="createUserData">
      <h2>Created User Data</h2>
      <pre>{{ createUserData }}</pre>
    </div>

    <div v-if="updateUserData">
      <h2>Updated User Data</h2>
      <pre>{{ updateUserData }}</pre>
    </div>

    <div v-if="deleteUserData">
      <h2>Deleted User Data</h2>
      <pre>{{ deleteUserData }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const users = ref(null);
const userData = ref(null);
const createUserData = ref(null);
const updateUserData = ref(null);
const deleteUserData = ref(null);

const getUsers = async () => {
  users.value = await $fetch('/api/user').catch((error) => error.data);
};

const getUser = async () => {
  const id = 1;
  userData.value = await $fetch(`/api/user/${id}`).catch((error) => error.data);
};

const createUser = async () => {
  const newUser = {
    email: "tomasz.giewont@gmail.com",
    password: "giewont69",
    name: "Tomasz",
    surname: "Giewont",
    role: "ROLE_OFFICE",
    employer: null
  };
  createUserData.value = await $fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({ user: newUser }),
  }).catch((error) => error.data);
};

const updateUser = async () => {
  const id = 9;
  const updatedUser = {
    role: "ROLE_USER",
    employer: 1
  };
  updateUserData.value = await $fetch(`/api/user/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ user: updatedUser }),
  }).catch((error) => error.data);
};

const deleteUser = async () => {
  const id = 9;
  deleteUserData.value = await $fetch(`/api/user/${id}`, {
    method: 'DELETE',
  }).catch((error) => error.data);
};
</script>