import Vue from "vue";
import useVuelidate from "@vuelidate/core";
import VueCompositionAPI from "@vue/composition-api";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import dateFilter from "./filters/date.filter";
import "materialize-css/dist/js/materialize.min";
import messagePlugin from "@/utils/message.plugin";
import Loader from "./components/app/Loader";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import {} from "firebase/database";
// import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(useVuelidate);
Vue.use(VueCompositionAPI);
Vue.filter("date", dateFilter);
Vue.component("Loader", Loader);

const firebaseConfig = {
  apiKey: "AIzaSyAtNE5nChfivNKb6keTD8tMZx_Kc3VQJn8",
  authDomain: "money-manager-vue-lesson.firebaseapp.com",
  databaseURL:
    "https://money-manager-vue-lesson-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "money-manager-vue-lesson",
  storageBucket: "money-manager-vue-lesson.appspot.com",
  messagingSenderId: "207289498933",
  appId: "1:207289498933:web:8ce15f4777aee2205ee07c",
  measurementId: "G-ZE9C2NTPRF",
};

const fireApp = initializeApp(firebaseConfig);
const auth = getAuth(fireApp);

// firebase.initializeApp(firebaseConfig);

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
