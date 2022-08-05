 /* eslint-disable */
// import Vue from "vue";
// import App from "./App.vue";
// import router from "./router";
// import store from "./store";

// Vue.config.productionTip = false;

// new Vue({
//   router,
//   store,
//   render: (h) => h(App),
// }).$mount("#app");

import './public-path';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './axios'
// import VueAxios from 'vue-axios'

Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.config.productionTip = false;
console.log("routes:", routes)
let router = null;
let instance = null;
function render(props = {}) {
//   const { container } = props;
  const { container, store} = props;
  Vue.prototype.$store = store;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/app2/' : '/',
    mode: 'history',
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
  Vue.observable(store)
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('app2 [vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('app2 [vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}