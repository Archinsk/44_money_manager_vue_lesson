import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

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
const database = getDatabase(fireApp);

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (e) {
        console.log(dispatch);
        console.log(e);
        commit("setError", e);
        throw e;
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const uid = await dispatch("getUid");
        await set(ref(database, `/users/${uid}/info`), {
          bill: 10000,
          name,
        });
      } catch (e) {
        console.log(e);
        commit("setError", e);
        throw e;
      }
    },
    getUid() {
      const user = auth.currentUser;
      console.log("Юзер ИД:");
      console.log(user.uid);
      return user ? user.uid : null;
    },
    async logout({ commit }) {
      await signOut(auth);
      commit("clearInfo");
    },
  },
};
