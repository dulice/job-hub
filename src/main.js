import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from '../routes';
import { VueQueryPlugin } from '@tanstack/vue-query';
import Vue3Toastify from 'vue3-toastify';

const app = createApp(App);
app.use(router);
app.use(VueQueryPlugin);
app.use(Vue3Toastify, { autoClose: 2000})
app.mount('#app');

