import './assets/main.css';
import '@/configs/vee-validate/rules.js';

import App from './App.vue';
import router from './router';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import clickOutsideDirective from '@/helpers/click-outside-directive.js';

// Packages
import PrimeVue from 'primevue/config';

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

// Use apps
app.use(createPinia());
app.use(router);
// Directives
app.directive('click-outside', clickOutsideDirective);

app.mount('#app');
