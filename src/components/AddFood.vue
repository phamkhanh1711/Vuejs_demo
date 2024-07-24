<template>
  <v-container>
    <h1>Add Food</h1>
    <form @submit.prevent="submitFood">
      <v-row>
        <v-col cols="4" sm="4">
          <v-text-field
            v-model="foodName"
            label="Food Name"
            @input="handleChange('foodName')"
            outlined
          ></v-text-field>
          <span v-if="errors.foodName" class="error">{{ errors.foodName }}</span>
        </v-col>
        <v-col cols="4" sm="4">
          <v-text-field
            v-model="foodPrice"
            label="Food Price"
            @input="handleChange('foodPrice')"
            outlined
          ></v-text-field>
          <span v-if="errors.foodPrice" class="error">{{ errors.foodPrice }}</span>
        </v-col>
        <v-col cols="4" sm="4">
          <input type="file" @change="handleImageChange" accept="image/*" />
          <span v-if="errors.foodImage" class="error">{{ errors.foodImage }}</span>
        </v-col>
      </v-row>
      <v-btn color="primary" type="submit">Submit</v-btn>
    </form>
  </v-container>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { handleUploadFile } from "../config/uploadImage";
const foodName = ref("");
const foodImage = ref(null);
const foodPrice = ref("");
const errors = ref({});

const handleChange = (field) => {
  // Reset the error message for the field when user starts typing
  errors.value[field] = "";
};

const handleImageChange = (event) => {
  const imageFile = event.target.files[0];
  foodImage.value = imageFile;
  // Reset the error message for foodImage when a new image is selected
  errors.value.foodImage = "";
};

const submitFood = async (e) => {
  e.preventDefault();
  let errorsSubmit = {};
  let flag = true;

  if (!foodName.value) {
    errorsSubmit.foodName = "Please enter food name.";
    flag = false;
  }

  if (!foodPrice.value) {
    errorsSubmit.foodPrice = "Please enter food price.";
    flag = false;
  }

  if (!foodImage.value) {
    errorsSubmit.foodImage = "Please upload food image.";
    flag = false;
  }

  if (!flag) {
    errors.value = errorsSubmit;
    return;
  } else {
    errors.value = {};
  }

  let urlImage;
  if (foodImage.value) {
    urlImage = await handleUploadFile(foodImage.value);
  }

  const formData = {
    foodName: foodName.value,
    foodPrice: foodPrice.value,
    foodImage: urlImage,
  };
  console.log("Form data:", formData);
  axios
    .post("http://localhost:4000/food/add-Food", formData)
    .then((response) => {
      console.log("Response:", response);
      // Reset the form fields
      foodName.value = "";
      foodPrice.value = "";
      foodImage.value = null;
      // Redirect to the product list page
      router.push({ path: "/food" });
    })
    .catch((error) => {
      console.error("Error adding food:", error);
    });
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
