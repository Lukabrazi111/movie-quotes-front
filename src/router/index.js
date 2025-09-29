import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import SignUpModal from '@/components/modals/auth/SignUpModal.vue';
import LoginModal from '@/components/modals/auth/LoginModal.vue';
import ForgotPasswordModal from '@/components/modals/auth/ForgotPasswordModal.vue';
import NotFound from '@/views/NotFound.vue';
import EmailVerifiedModal from '@/components/modals/success-info/EmailVerifiedModal.vue';
import HomePage from '@/views/HomePage.vue';
import { useAuthStore } from '@/stores/user/auth.js';
import NewsFeed from '@/components/pages/NewsFeed.vue';
import UserProfile from '@/components/pages/UserProfile.vue';
import MovieList from '@/components/pages/MovieList.vue';
import ResetPasswordModal from '@/components/modals/auth/ResetPasswordModal.vue';

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
                    path: '/forgot-password',
                    name: 'forgot-password',
                    component: ForgotPasswordModal,
                },
                {
                    path: '/reset-password',
                    name: 'reset-password',
                    component: ResetPasswordModal,
                    beforeEnter: [resetPasswordParams],
                },
                {
                    path: '/verify',
                    name: 'verify-email',
                    component: EmailVerifiedModal,
                    beforeEnter: [verifyEmailParams],
                },
            ],
        },
        {
            path: '/news-feed',
            component: HomePage,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'news-feed',
                    component: NewsFeed,
                },
                {
                    path: '/profile',
                    name: 'profile',
                    component: UserProfile,
                },
                {
                    path: '/movies',
                    name: 'movies',
                    component: MovieList,
                },
            ],
        },
    ],
});

function resetPasswordParams(to) {
    if (!to.query.signature || !to.query.expires || !to.query.user) {
        return { name: 'landing' };
    }
}

function verifyEmailParams(to) {
    const hasQueryParams = to.query.expires && to.query.user && to.query.signature;

    if (!hasQueryParams) {
        return { name: 'landing' };
    }
}

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

    next();
});

export default router;
