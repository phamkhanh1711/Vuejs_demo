<template>
  <div>
    <h1>Home</h1>
    <p>{{ fullName }}</p>
    <v-btn  @click="changeFullname">changeFullname</v-btn>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { ref } from "vue";
const firstName = ref("Vincenzo");
console.log(firstName);
const lastName = ref("Casano");
console.log(lastName);
const fullName = computed(() => `${firstName.value} ${lastName.value}`.split(","));
const changeFullname = () => {
  firstName.value = "Vincenzo";
  lastName.value = "Casano";
};
</script>
