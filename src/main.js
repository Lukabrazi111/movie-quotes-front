import './assets/main.css';
import '@/configs/vee-validate/rules.js';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Packages
import PrimeVue from 'primevue/config';

import App from './App.vue';
import router from './router';

// PrimeVue
import Aura from '@primeuix/themes/aura';

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false,
        },
    },
});

app.use(createPinia());
app.use(router);

app.mount('#app');
