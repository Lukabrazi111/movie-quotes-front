<template>
    <HeaderLayout
        class="bg-secondary-dark"
        :class="{
            'bg-gradient-primary h-[80vh]': !this.authStore.isAuthenticated,
        }"
        ref="headerRef"
    >
        <template v-slot:nav-content>
            <div class="relative" v-if="this.authStore.isAuthenticated">
                <div
                    class="bg-red-500 text-white text-center rounded-full absolute -top-2.5 -right-2 w-6 h-6"
                >
                    3
                </div>
                <BellNotificationIcon v-if="this.authStore.isAuthenticated" />
            </div>

            <div class="space-x-6" v-if="!this.authStore.isAuthenticated">
                <BaseButton @click="toggleModal('visibleSignUpModal')">Sign up</BaseButton>
                <SecondaryButton
                    @click="toggleModal('visibleLoginModal', 'visibleResetPasswordModal')"
                >
                    Log in
                </SecondaryButton>
            </div>

            <div v-else class="space-x-6 order-3">
                <SecondaryButton @click="logout">Logout</SecondaryButton>
            </div>
        </template>

        <template v-slot:header-content v-if="!this.authStore.isAuthenticated">
            <div class="flex flex-col items-center justify-center space-y-5 text-center h-[50vh]">
                <h1
                    class="text-5xl w-full max-w-xl text-cream leading-18 font-montserrat! font-bold!"
                >
                    Find any quote in millions of movie lines
                </h1>
                <BaseButton @click="scrollToSpecificSection">Get started</BaseButton>
            </div>
        </template>
    </HeaderLayout>

    <!-- Modals -->
    <SignUpModal
        @switchModal="handleSwitchModal"
        @emailSentModal="toggleModal('visibleEmailSentModal')"
        v-show="visibleSignUpModal"
        v-model="visibleSignUpModal"
    />
    <LoginModal
        @switchModal="handleSwitchModal"
        @switchResetPasswordModal="toggleModal('visibleResetPasswordModal', 'visibleLoginModal')"
        v-show="visibleLoginModal"
        v-model="visibleLoginModal"
    />
    <ResetPasswordModal
        @switchLoginModal="toggleModal('visibleLoginModal', 'visibleResetPasswordModal')"
        @emailSentModal="toggleModal('visibleEmailPasswordRecoveryModal')"
        v-show="visibleResetPasswordModal"
        v-model="visibleResetPasswordModal"
    />
    <!-- Success Modals -->
    <EmailSentModal
        @switchModal="handleSwitchModal"
        v-show="visibleEmailSentModal"
        v-model="visibleEmailSentModal"
    />
    <EmailVerifiedModal
        @switchModal="handleSwitchModal"
        @switchLinkExpiredModal="
            toggleModal('visibleLinkExpiredModal', 'visibleEmailVerifiedModal')
        "
        v-show="visibleEmailVerifiedModal"
        v-model="visibleEmailVerifiedModal"
    />
    <!-- Need to finish this modal part -->
    <EmailPasswordRecoveryModal
        @switchModal="handleSwitchModal"
        @switchLoginModal="toggleModal('visibleLoginModal', 'visibleEmailPasswordRecoveryModal')"
        v-show="visibleEmailPasswordRecoveryModal"
        v-model="visibleEmailPasswordRecoveryModal"
    />
    <!-- Error Modals -->
    <LinkExpiredModal
        @switchEmailSentModal="toggleModal('visibleEmailSentModal')"
        v-show="visibleLinkExpiredModal"
        v-model="visibleLinkExpiredModal"
    />
</template>

<script>
import BaseButton from '@/components/ui/buttons/BaseButton.vue';
import SignUpModal from '@/components/modals/auth/SignUpModal.vue';
import LoginModal from '@/components/modals/auth/LoginModal.vue';
import SecondaryButton from '@/components/ui/buttons/SecondaryButton.vue';
import ResetPasswordModal from '@/components/modals/auth/ResetPasswordModal.vue';
import EmailSentModal from '@/components/modals/success-info/EmailSentModal.vue';
import EmailVerifiedModal from '@/components/modals/success-info/EmailVerifiedModal.vue';
import LinkExpiredModal from '@/components/modals/error-info/LinkExpiredModal.vue';
import HeaderLayout from '@/components/layouts/HeaderLayout.vue';
import BellNotificationIcon from '@/components/icons/header/BellNotificationIcon.vue';
import { mapStores } from 'pinia';
import { useScrollToSectionStore } from '@/stores/scroll-to-section.js';
import { useAuthStore } from '@/stores/user/auth.js';
import { axios } from '@/configs/axios/index.js';
import EmailPasswordRecoveryModal from '@/components/modals/success-info/EmailPasswordRecoveryModal.vue';

export default {
    name: 'HeaderBase',
    components: {
        EmailPasswordRecoveryModal,
        BellNotificationIcon,
        LinkExpiredModal,
        EmailVerifiedModal,
        EmailSentModal,
        ResetPasswordModal,
        SecondaryButton,
        LoginModal,
        BaseButton,
        SignUpModal,
        HeaderLayout,
    },

    data() {
        return {
            visibleSignUpModal: false,
            visibleLoginModal: false,
            visibleResetPasswordModal: false,
            visibleEmailSentModal: false,
            visibleEmailVerifiedModal: false,
            visibleLinkExpiredModal: false,
            visibleEmailPasswordRecoveryModal: false,
        };
    },

    computed: {
        ...mapStores(useScrollToSectionStore, useAuthStore),
    },

    created() {
        this.handleRouteModalSwitch(this.$route.path);
    },

    mounted() {
        this.$nextTick(() => {
            const headerEl = this.$refs.headerRef?.$el || this.$refs.headerRef;

            if (headerEl && this.scrollToSectionStore?.scrollTo) {
                this.scrollToSectionStore.scrollTo(this.$refs.headerRef.$el);
            } else {
                console.warn('Missing scroll target or function');
            }
        });
    },

    methods: {
        async logout() {
            await axios.post('/logout');
            this.authStore.logout();
            this.$router.push({ name: 'landing' });
        },

        toggleModal(modal, parentModal = '') {
            if (parentModal.length !== 0) {
                this[parentModal] = false;
                this[modal] = !this[modal];
                return;
            }

            this[modal] = !this[modal];
        },

        handleRouteModalSwitch(path) {
            const segment = path.split('/');
            const name = segment[segment.length - 1];

            const mapModals = {
                login: 'visibleLoginModal',
                register: 'visibleSignUpModal',
                'reset-password': 'visibleResetPasswordModal',
            };

            const target = mapModals[name];

            this[target] = !!target;
        },

        scrollToSpecificSection() {
            const sectionRef = this.scrollToSectionStore.specificRef;
            return this.scrollToSectionStore.scrollTo(sectionRef);
        },

        handleModalRouting(value, routeName) {
            if (value) {
                this.$router.push({ name: routeName });
                document.body.classList.add('overflow-hidden');
            } else {
                this.$router.push({ name: 'landing' });
                document.body.classList.remove('overflow-hidden');
            }
        },

        handleSwitchModal(targetModal) {
            this.hideAllModals();

            const mapModals = {
                login: 'visibleLoginModal',
                register: 'visibleSignUpModal',
                'reset-password': 'visibleResetPasswordModal',
            };

            const target = mapModals[targetModal];

            if (target) {
                this[target] = true;
            }
        },

        hideAllModals() {
            this.visibleLoginModal = false;
            this.visibleSignUpModal = false;
            this.visibleResetPasswordModal = false;
            this.visibleEmailSentModal = false;
            this.visibleEmailVerifiedModal = false;
            this.visibleLinkExpiredModal = false;
        },
    },

    watch: {
        visibleSignUpModal(value) {
            this.handleModalRouting(value, 'register');
        },

        visibleLoginModal(value) {
            this.visibleEmailSentModal = false;
            this.handleModalRouting(value, 'login');
        },

        visibleResetPasswordModal(value) {
            this.handleModalRouting(value, 'reset-password');
        },
    },
};
</script>
