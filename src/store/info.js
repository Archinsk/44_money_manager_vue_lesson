import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, query } from "firebase/database";

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
const database = getDatabase(fireApp);

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const infoSnap = await get(query(ref(database, `/users/${uid}/info`)));
        const info = infoSnap.val();
        commit("setInfo", info);
      } catch (e) {
        console.log("Инфо ошибка: ");
      }
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
