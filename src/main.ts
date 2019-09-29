import Vue from "vue";
import App from "./App.vue";
import Component from "vue-class-component";
import router from "@/router";
import store from "@/store";

import "normalize.css";
import ElementUI from "element-ui";
import SvgIcon from "vue-svgicon";
import "@/icons/components";
import "@/peimission";
import "@/styles/element-variables.scss";
import "@/styles/index.scss";

import * as filters from "@/filters";

Vue.use(ElementUI);
Vue.use(SvgIcon, {
  tagName: "svg-icon",
  defaultWidth: "1em",
  defaultHeight: "1em"
});

// Register global filter functions
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string]: Function })[key]);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
