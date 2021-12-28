import M from "materialize-css/dist/js/materialize.min";
export default {
  install(Vue) {
    Vue.prototype.$message = function (text) {
      M.toast({ html: text });
    };

    Vue.prototype.$error = function (text) {
      M.toast({ html: `[Ошибка]: ${text}` });
    };
  },
};
