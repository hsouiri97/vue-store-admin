import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import "popper.js";
import "bootstrap";
import "./assets/app.scss";
import { fb } from "./firebase";
import VueFirestore from "vue-firestore";
import Swal from "sweetalert2";
import VueTelInput from "vue-tel-input";

window.Swal = Swal;

Vue.config.productionTip = false;
Vue.use(VueFirestore, {
  key: "id", // the name of the property. Default is '.key'.
  enumerable: true //  whether it is enumerable or not. Default is true.
});
Vue.use(VueTelInput);

import vueCountryRegionSelect from "vue-country-region-select";
Vue.use(vueCountryRegionSelect);

Vue.component("Navbar", require("./components/Navbar.vue").default);
Vue.component("Footer", require("./components/Footer.vue").default);
//Vue.component('GetStared', require('./components/GetStarted.vue').default);

import store from "./store";

let app = "";

fb.auth().onAuthStateChanged(user => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
