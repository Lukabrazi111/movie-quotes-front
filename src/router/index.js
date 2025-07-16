import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import SignUpModal from '@/components/modals/SignUpModal.vue';
import LoginModal from '@/components/modals/LoginModal.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'landing',
            meta: { isGuest: true },
            component: LandingPage,
            children: [
                {
                    path: '/register',
                    name: 'register',
                    component: SignUpModal,
                },
                {
                    path: '/login',
                    name: 'login',
                    component: LoginModal,
                },
            ],
        },
    ],
});

export default router;
