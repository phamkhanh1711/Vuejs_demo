<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const fullName = ref("");
const email = ref("");
const password = ref("");
const phoneNumber = ref("");
const errors = ref("");
const isValidEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

const router = useRouter();
const submitForm = () => {
  let errorsSubmit = {};
  let flag = true;
  if (!fullName.value) {
    errorsSubmit.fullName = "Please enter your full name.";
    flag = false;
  }
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
  if (!phoneNumber.value) {
    errorsSubmit.phoneNumber = "Please enter your phone number.";
    flag = false;
  }
  if (!flag) {
    errors.value = errorsSubmit;
    return;
  } else {
    errors.value = "";
  }

  const user = {
    fullName: fullName.value,
    email: email.value,
    password: password.value,
    phoneNumber: phoneNumber.value,
  };
  console.log(user);

  axios
    .post("http://localhost:4000/auth/signup", user)
    .then((response) => {
      console.log(response.data);
      alert("Form submitted successfully!");
      router.push("/login");
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>

<template>
  <v-sheet class="mx-auto" width="410" style="margin-top: 3%">
    <div class="text-center">
      <h2>Register</h2>
    </div>
    <v-form @submit.prevent="submitForm">
      <v-text-field v-model="fullName" label="Full name" />
      <span v-if="errors.fullName" class="text-danger">{{
        errors.fullName
      }}</span>
      <v-text-field v-model="email" label="Email" />
      <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
      <v-text-field v-model="password" label="Password" type="password" />
      <span v-if="errors.password" class="text-danger">{{
        errors.password
      }}</span>
      <v-text-field v-model="phoneNumber" label="Phone" type="tel" />

      <span v-if="errors.phoneNumber" class="text-danger">{{
        errors.phoneNumber
      }}</span>
      <v-btn class="mt-2" type="submit" color="success" block>Register</v-btn>
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
