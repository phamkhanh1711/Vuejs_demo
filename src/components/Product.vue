<template>
  <div class="food-table-container">
    <h1>Product Page</h1>
    <table class="custom-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên</th>
          <th>Hình Ảnh</th>
          <th>Giá</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="food in paginatedFoodItems" :key="food.foodId">
          <td>{{ food.foodId }}</td>
          <td>{{ food.foodName }}</td>
          <td>
            <img v-if="food.foodImage" :src="food.foodImage" class="food-img" />
          </td>
          <td>{{ food.foodPrice }}</td>
          <td>
            <button
              @click="goToEditPage(food.foodId)"
              class="btn btn-primary btn-sm"
            >
              Edit
            </button>
            <button
              @click="deleteFoodItem(food.foodId)"
              class="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <button
      @click="goToAddPage"
      class="btn btn-primary"
      style="margin-bottom: 1%"
    >
      Thêm sản phẩm
    </button>

    <b-pagination
      v-model="currentPage"
      :total-rows="totalItems"
      :per-page="itemsPerPage"
      aria-controls="food-table"
      @change="fetchFoodItems"
    ></b-pagination>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { BPagination } from 'bootstrap-vue-3';

const foodItems = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalItems = ref(0);

const router = useRouter();

const fetchFoodItems = async () => {
  try {
    const response = await axios.get("http://localhost:4000/food/all-Food");
    foodItems.value = response.data;
    totalItems.value = foodItems.value.length;
    console.log("Food items:", foodItems);
  } catch (error) {
    console.error("Error fetching food items:", error);
  }
};

onMounted(() => {
  fetchFoodItems();
});

const paginatedFoodItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return foodItems.value.slice(start, end);
});

const goToAddPage = () => {
  router.push({ path: `/addfood` });
};

const deleteFoodItem = (foodId) => {
  console.log("Delete food item with ID:", foodId);
  const deleteUrl = `http://localhost:4000/food/delete/${foodId}`;
  console.log("Delete URL:", deleteUrl);
  axios
    .delete(deleteUrl)
    .then((response) => {
      console.log("Response:", response);
      fetchFoodItems();
    })
    .catch((error) => {
      console.error("Error deleting food item:", error);
    });
};

const goToEditPage = (foodId) => {
  console.log("Edit food item with ID:", foodId);
  router.push({ path: `/editfood/${foodId}` });
};
</script>

<style scoped>
.food-table-container {
  margin: 20px;
}

.food-table-container h1 {
  margin-bottom: 20px;
  font-family: "Arial", sans-serif;
}

.food-img {
  max-width: 100px;
  max-height: 100px;
}

.custom-table {
  width: 100%;
  border: 1px solid #dee2e6;
  border-collapse: collapse;
  background-color: #f8f9fa;
}

.custom-table th,
.custom-table td {
  border: 1px solid #dee2e6;
  padding: 8px;
  text-align: left;
}

.custom-table th {
  background-color: #343a40;
  color: #fff;
}

button {
  margin-right: 5px;
}
</style>
