<!-- src/layouts/default.vue -->
<template>
  <v-app>
    <Header />
    <v-main
      class="d-flex align-center justify-center"
      style="background-color: #f5f5f5; min-height: 100vh"
    >
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup>
import Header from '../components/Header.vue'
</script>

<style></style>
