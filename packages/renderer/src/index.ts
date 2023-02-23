import {createApp} from 'vue';
import router from '/@/router';
import ElementPlus from 'element-plus';

import App from '/@/App.vue';
import 'element-plus/dist/index.css';
import '/@/assets/css/main.css';

const app = createApp(App);

app.use(router);
app.use(ElementPlus);
app.mount('#app');
