import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import Vue2Editor from 'vue2-editor';
Vue.use(Vue2Editor);

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import store from "./store";
import router from "./router";

Vue.filter("currency", (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value
  )
);

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount("#app");
