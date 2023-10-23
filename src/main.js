import { createApp } from "vue";
import App from "./App.vue";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).mount("#app");
