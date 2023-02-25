import {createApp} from 'vue';
import {createPinia} from 'pinia';
import router from '/@/router';
import ElementPlus from 'element-plus';

import App from '/@/App.vue';
import '/@/assets/css/main.css';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.mount('#app');
