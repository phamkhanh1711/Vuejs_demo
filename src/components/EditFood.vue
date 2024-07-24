<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router"; // Combine imports
import Cookies from "js-cookie";

const foodName = ref("");
const foodPrice = ref("");
const foodImage = ref(null);
const errors = ref({});
const route = useRoute();
const router = useRouter();
const foodId = ref(route.params.foodId);

console.log("Food ID:", foodId.value);

const handleChange = (field) => {
  errors.value[field] = "";
};

onMounted(() => {
  axios
    .get(`http://localhost:4000/food/print-detailFood/${foodId.value}`)
    .then((response) => {
      console.log("Response:", response);
      foodName.value = response.data.foodName;
      foodPrice.value = response.data.foodPrice;
    })
    .catch((error) => {
      console.error("Error fetching food item:", error);
    });
});

const handleSubmit = async (e) => {
  e.preventDefault();

  const config = {
    headers: { Authorization: `Bearer ${Cookies.get("Token")}` },
  };

  const data = {
    foodId: foodId.value,
    foodName: foodName.value,
    foodPrice: foodPrice.value,
  };

  console.log("Data:", data);

  try {
    const response = await axios.put(
      `http://localhost:4000/food/update/${foodId.value}`,
      data,
      config
    );
    console.log("Response:", response);
    alert("Food item updated successfully!");
    router.push({ path: `/iphone` });
  } catch (error) {
    console.error("Error editing food item:", error);
  }
};
</script>

<template>
  <v-container>
    <h1>Edit Food</h1>
    <v-row>
      <v-col cols="4" sm="4">
        <v-text-field
          v-model="foodName"
          label="Food Name"
          outlined
          @input="handleChange('foodName')"
        ></v-text-field>
      </v-col>
      <v-col cols="4" sm="4">
        <v-text-field
          v-model="foodPrice"
          label="Food Price"
          outlined
          @input="handleChange('foodPrice')"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn color="primary" @click="handleSubmit">Submit</v-btn>
  </v-container>
</template>

<style scoped>
.food-table-container {
  margin: 20px;
}

.food-table-container h1 {
  margin-bottom: 20px;
  font-family: "Arial", sans-serif;
}
</style>
