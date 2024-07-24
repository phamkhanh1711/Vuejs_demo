// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import Register from "@/Auth/Register.vue";
import Login from "@/Auth/Login.vue";
import Product from "@/components/Product.vue";
import AddFood from "@/components/AddFood.vue";
import EditFood from "@/components/EditFood.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/iphone", component: Product },
  { path: "/addfood", component: AddFood },
  { path: "/editfood/:foodId", component: EditFood },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
