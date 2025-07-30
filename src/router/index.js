import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import SignUpModal from '@/components/modals/auth/SignUpModal.vue';
import LoginModal from '@/components/modals/auth/LoginModal.vue';
import ResetPasswordModal from '@/components/modals/auth/ResetPasswordModal.vue';
import NotFound from '@/views/NotFound.vue';
import EmailVerifiedModal from '@/components/modals/success-info/EmailVerifiedModal.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:pregMatch(.*)*',
            name: 'not-found',
            component: NotFound,
        },
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
                {
                    path: '/reset-password',
                    name: 'reset-password',
                    component: ResetPasswordModal,
                },
                {
                    path: '/verify',
                    name: 'verify-email',
                    component: EmailVerifiedModal,
                },
            ],
        },
    ],
});

export default router;
