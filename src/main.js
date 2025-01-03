import { createApp } from "vue";
// import STable from '@surely-vue/table';
// import '@surely-vue/table/dist/index.less';
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css';


// import 'v3-easyui/dist/themes/default/easyui.css';
// import 'v3-easyui/dist/themes/icon.css';
// import 'v3-easyui/dist/themes/vue.css';
// import EasyUI from 'v3-easyui';

import '@surely-vue/table/dist/index.less';
import STable from '@surely-vue/table';
// import 'jquery'
// import 'easyui/dist/css/easyui.css'
// import 'easyui/dist/css/icon.css'
// import 'easyui/dist/js/jquery.easyui.min.js'

import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import Axios from "@/utils/request.js";
import moment from "moment/moment";
import VueGridLayout from 'vue-grid-layout'; // 引入layout

import { createPinia } from 'pinia';

import "@/style/public.css";
import "@/style/theme.css";
const app = createApp(App);
moment.locale('zh-cn');
app.config.globalProperties.$moment = moment;
app.use(store);
app.use(router);
app.use(Axios);
// app.use(EasyUI);
app.use(Antd);
app.use(ElementPlus);
app.use(STable);
app.use(VueGridLayout);
app.use(createPinia());
app.mount("#app");
// createApp(App).use(store).use(router).use(Antd).use(ElementPlus).mount("#app");
