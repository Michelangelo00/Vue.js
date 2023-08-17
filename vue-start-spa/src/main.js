/**
 * js dove viene sviluppato tutto il processo di montaggio dei componenti
 */


import {createApp, VueElement} from 'vue';
import App from './App.vue'
import $bus from './utils/Events'

const app = createApp(App);

app.config.globalProperties.$bus = $bus;

app.mount('#app');