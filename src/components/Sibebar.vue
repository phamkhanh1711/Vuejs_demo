<template>
  <aside class="sidebar">
    <h2>Sidebar</h2>
    <ul>
      <li @click="toggleSubItems">
        <a href="#">IPhone & Ipad <span :class="{'arrow-down': showSubItems, 'arrow-right': !showSubItems}"></span></a>
        <transition name="slide-fade">
          <ul v-if="showSubItems">
            <li><router-link to="/iphone">iPhone</router-link></li>
            <li><router-link to="/ipad">iPad</router-link></li>
          </ul>
        </transition>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { ref } from 'vue';

const showSubItems = ref(false);

const toggleSubItems = (event) => {
  event.stopPropagation();
  showSubItems.value = !showSubItems.value;
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  padding: 30px;
}

.sidebar h2 {
  font-size: 24px;
  font-family: 'space-grotesk', sans-serif;
  margin-bottom: 20px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin: 10px 0;
}

.sidebar ul li a {
  text-decoration: none;
  color: #232323;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar ul li a:hover {
  color: #f50963; /* Custom hover color */
}

.sidebar ul li ul {
  padding-left: 20px;
  margin-top: 10px;
}

.arrow-right::before {
  content: '▶';
  margin-left: 10px;
}

.arrow-down::before {
  content: '▼';
  margin-left: 10px;
}

/* Transition styles */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(-10px);

  opacity: 0;
}
</style>
