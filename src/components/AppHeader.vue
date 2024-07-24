<template>
  <v-app-bar app color="primary">
    <v-container>
      <v-row align="center" justify="space-between">
        <v-col cols="auto">
          <v-toolbar-title>My App</v-toolbar-title>
        </v-col>
        <v-col cols="auto">
          <v-row justify="center">
            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/product" class="nav-link">Product</router-link>
            <router-link to="/blog" class="nav-link">Blog</router-link>
            <router-link v-if="!isLoggedIn" to="/login" class="nav-link">Login</router-link>
            <a v-else @click="logout" class="nav-link">Logout</a>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';

const router = useRouter();

const isLoggedIn = computed(() => !!Cookies.get('Token'));

const logout = () => {
  Cookies.remove('Token');
  Cookies.remove('Auth');
  router.push('/login');
};
</script>

<style scoped>
.nav-link {
  color: white;
  text-decoration: none;
  margin: 0 8px;
  cursor: pointer;
}
</style>
