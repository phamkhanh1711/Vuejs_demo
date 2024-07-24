/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import BootstrapVue3 from "bootstrap-vue-3";
// Composables
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import { createApp } from "vue";
import router from "@/router";
const app = createApp(App);

registerPlugins(app);
app.use(vuetify);
app.use(BootstrapVue3);
app.use(router);
app.mount("#app");
