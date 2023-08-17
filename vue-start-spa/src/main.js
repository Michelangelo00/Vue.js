/**
 * js dove viene sviluppato tutto il processo di montaggio dei componenti
 */


import {createApp, VueElement} from 'vue';
import App from './App.vue'
import $bus from './utils/Events'
import router from './routes';
import $pages from './data'

const app = createApp(App);

app.use(router);

app.config.globalProperties.$bus = $bus;
app.config.globalProperties.$pages = $pages;

app.mount('#app');