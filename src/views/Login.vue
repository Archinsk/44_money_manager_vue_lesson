<template>
  <form @submit.prevent="submitHandler" class="card auth-card">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              (v$.email.$dirty && v$.email.required.$invalid) ||
              (v$.email.$dirty && v$.email.email.$invalid),
          }"
        />
        <label for="email">Email</label>
        <small
          v-if="v$.email.$dirty && v$.email.required.$invalid"
          class="helper-text invalid"
          >Введите e-mail</small
        >
        <small
          v-else-if="v$.email.$dirty && v$.email.email.$invalid"
          class="helper-text invalid"
          >Введите корректный e-mail</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              (v$.password.$dirty && v$.password.required.$invalid) ||
              (v$.password.$dirty && v$.password.minLength.$invalid),
          }"
        />
        <label for="password">Пароль</label>
        <small
          v-if="v$.password.$dirty && v$.password.required.$invalid"
          class="helper-text invalid"
          >Введите пароль</small
        >
        <small
          v-else-if="v$.password.$dirty && v$.password.minLength.$invalid"
          class="helper-text invalid"
          >Пароль должен быть более
          {{ v$.password.minLength.$params.min }} символов. Сейчас он
          {{ password.length }}</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { email, required, minLength } from "@vuelidate/validators";
import messages from "@/utils/messages";

export default {
  name: "Login",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.$store.dispatch("login", formData);
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      console.log(this.$route);
      this.$message(messages[this.$route.query.message]);
    }
  },
};
</script>

<style scoped></style>
