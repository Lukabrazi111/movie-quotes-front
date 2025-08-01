import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import SignUpModal from '@/components/modals/auth/SignUpModal.vue';
import LoginModal from '@/components/modals/auth/LoginModal.vue';
import ResetPasswordModal from '@/components/modals/auth/ResetPasswordModal.vue';
import NotFound from '@/views/NotFound.vue';
import EmailVerifiedModal from '@/components/modals/success-info/EmailVerifiedModal.vue';
import NewsFeed from '@/views/NewsFeed.vue';
import { useAuthStore } from '@/stores/user/auth.js';

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
        {
            path: '/news-feed',
            name: 'news-feed',
            component: NewsFeed,
            meta: { requiresAuth: true },
            children: [],
        },
    ],
});

router.beforeEach(async (to, _, next) => {
    const authUser = useAuthStore();

    if (authUser.isAuthenticated) {
        await authUser.fetchUser(); // fetch user on each request
    }

    if (to.meta.isGuest && authUser.isAuthenticated) {
        return next({ name: 'news-feed' });
    }

    if (to.meta.requiresAuth && !authUser.isAuthenticated) {
        return next({ name: 'login' });
    }

    if (to.path === '/verify') {
        const hasQueryParams = to.query.expires && to.query.user && to.query.signature;

        if (!hasQueryParams) {
            return next({ name: 'landing' });
        }
    }

    next();
});

export default router;
