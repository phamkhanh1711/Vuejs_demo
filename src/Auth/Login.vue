<script setup>
import { useRouter } from "vue-router";
import  { ref } from "vue";
import axios from "axios";
import Cookies from "js-cookie";
const email = ref("");
const password = ref("");
const errors = ref("");
const isValidEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};
const router = useRouter();

const submitForm = () => {
  let errorsSubmit = {};
  let flag = true;
  if (!email.value) {
    errorsSubmit.email = "Please enter your email.";
    flag = false;
  } else if (!isValidEmail(email.value)) {
    errorsSubmit.email = "Please enter a valid email.";
    flag = false;
  }
  if (!password.value) {
    errorsSubmit.password = "Please enter your password.";
    flag = false;
  }
  if (!flag) {
    errors.value = errorsSubmit;
    return;
  } else {
    errors.value = "";
  }

  const user = {
    email: email.value,
    password: password.value,
  };
  console.log(user);

  axios
    .post("http://localhost:4000/auth/login", user)
    .then((response) => {
      console.log(response.data);

      const Token = response.data.data.accessToken;
      console.log(Token);
      Cookies.set("Token", Token);
      alert("Form submitted successfully!");
      router.push("/");
    })
    .catch((error) => {
      console.log(error);
      alert("An error occurred. Please try again later.");
    });
};
</script>
<template>
  <v-sheet class="mx-auto" width="410" style="margin-top: 3%">
    <div class="text-center">
      <h2>Login</h2>
    </div>
    <v-form @submit.prevent="submitForm">
      <v-text-field v-model="email" label="Email" />
      <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
      <v-text-field v-model="password" label="Password" type="password" />
      <span v-if="errors.password" class="text-danger">{{
        errors.password 
      }}</span>
      <v-btn class="mt-2" type="submit" color="success" block>Login</v-btn>
      
    </v-form>
  </v-sheet>
</template>
<style scoped>
.v-text-field {
  margin-top: 10px;
}
.v-btn {
  margin-top: 10px;
}
.v-sheet {
  padding: 20px;
}
.text-center {
  text-align: center;
}
h2 {
  margin-bottom: 20px;
}
.text-danger {
  color: red;
}
</style>
