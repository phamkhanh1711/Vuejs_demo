<template>
  <v-app>
    <AppHeader />
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="3">
            <Sidebar />
          </v-col>
          <v-col cols="9">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import Sidebar from '@/components/Sibebar.vue';
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
