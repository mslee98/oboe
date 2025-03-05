import { createApp } from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue-3";
// import { BootstrapVueNext } from "bootstrap-vue-next";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

import './assets/index.css'; 

// createApp(App).mount("#app");
const app = createApp(App);

// Make BootstrapVue available throughout your project
app.use(BootstrapVue);
// app.use(BootstrapVueNext);

// Route 사용 설정
app.use(router);




import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Vuetify 기본 스타일 추가

import { VList, VIcon, VListItem, VListGroup } from 'vuetify/components'; // 필요한 컴포넌트 추가

// vuetify  사용 설정
const vuetify = createVuetify({
  components: {
    VList,
    VIcon,
    VListItem,
    VListGroup, // v-list-group을 사용하려면 등록 필요!
  },
});

// import Vuetify from 'vuetify';

app.use(vuetify);




app.directive("stop-propagation", {
  beforeMount(el) {
    el.addEventListener("click", (event) => {
      // console.debug("main.js > app.directive() > click");
      event.stopPropagation();
    });
    /*
    el.addEventListener("mousedown", (event) => {
      console.debug("main.js > app.directive() > mousedown");
      event.stopPropagation();
    });
    */
    el.addEventListener("pointerdown", (event) => {
      // console.debug("main.js > app.directive() > pointerdown");
      event.stopPropagation();
    });
  },
});

app.mount("#app");
