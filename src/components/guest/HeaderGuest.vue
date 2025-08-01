<template>
    <header class="bg-dark h-[80vh]" ref="headerRef">
        <BaseContainer>
            <nav class="flex items-center justify-between px-4 py-8">
                <div>
                    <h1 class="text-cream uppercase text-md font-helvetica font-normal">
                        Movie quotes
                    </h1>
                </div>

                <div class="flex items-center space-x-6 text-white">
                    <div class="relative">
                        <div
                            @click="isOpenLanguageDropdown = !isOpenLanguageDropdown"
                            class="hover:bg-gray-700 transition-colors flex items-center space-x-5 px-4 py-1.5 cursor-pointer font-light"
                            :class="{
                                'rounded-t': isOpenLanguageDropdown,
                                rounded: !isOpenLanguageDropdown,
                            }"
                        >
                            <span>{{ selectedLanguage }}</span>
                            <ArrowIcon :isOpenLanguageDropdown="isOpenLanguageDropdown" />
                        </div>
                        <div
                            v-show="isOpenLanguageDropdown"
                            @click="toggleLanguage"
                            class="absolute right-0 hover:bg-gray-700 rounded-b text-white w-full text-center py-1.5 cursor-pointer transition-colors font-light"
                        >
                            {{ nextLanguage }}
                        </div>
                    </div>

                    <BaseButton @click="toggleModal('visibleSignUpModal', 'Sexa Lama')">
                        Sign up
                    </BaseButton>
                    <SecondaryButton
                        @click="toggleModal('visibleLoginModal', 'visibleResetPasswordModal')"
                    >
                        Log in
                    </SecondaryButton>
                </div>
            </nav>

            <div class="flex flex-col items-center justify-center space-y-5 text-center h-[50vh]">
                <h1
                    class="text-5xl w-full max-w-xl text-cream leading-18 font-montserrat! font-bold!"
                >
                    Find any quote in millions of movie lines
                </h1>
                <BaseButton @click="scrollToSection">Get started</BaseButton>
            </div>
        </BaseContainer>
    </header>

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
    <!-- TODO: Need to check here also handleSwitchModal FIX SWITCHTOMODAL NAME -->
    <ResetPasswordModal
        @switchToLoginModal="toggleModal('visibleLoginModal', 'visibleResetPasswordModal')"
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
        @switchLinkExpiredModal="toggleModal('visibleLinkExpiredModal', 'visibleEmailVerifiedModal')"
        v-show="visibleEmailVerifiedModal"
        v-model="visibleEmailVerifiedModal"
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
import BaseContainer from '@/components/BaseContainer.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import SignUpModal from '@/components/modals/auth/SignUpModal.vue';
import LoginModal from '@/components/modals/auth/LoginModal.vue';
import SecondaryButton from '@/components/ui/buttons/SecondaryButton.vue';
import ResetPasswordModal from '@/components/modals/auth/ResetPasswordModal.vue';
import { useScrollToSectionStore } from '@/stores/scroll-to-section.js';
import EmailSentModal from '@/components/modals/success-info/EmailSentModal.vue';
import EmailVerifiedModal from '@/components/modals/success-info/EmailVerifiedModal.vue';
import LinkExpiredModal from '@/components/modals/error-info/LinkExpiredModal.vue';

export default {
    name: 'HeaderGuest',
    components: {
        LinkExpiredModal,
        EmailVerifiedModal,
        EmailSentModal,
        ResetPasswordModal,
        SecondaryButton,
        LoginModal,
        ArrowIcon,
        BaseContainer,
        BaseButton,
        SignUpModal,
    },

    data() {
        return {
            selectedLanguage: 'Eng',
            isOpenLanguageDropdown: false,
            useScrollToSection: null,
            visibleSignUpModal: false,
            visibleLoginModal: false,
            visibleResetPasswordModal: false,
            visibleEmailSentModal: false,
            visibleEmailVerifiedModal: false,
            visibleLinkExpiredModal: false,
            // visibleResetSuccessSentModal
        };
    },

    created() {
        this.useScrollToSection = useScrollToSectionStore();
        this.handleRouteModalSwitch(this.$route.path);
    },

    mounted() {
        this.useScrollToSection.scrollTo(this.$refs.headerRef);
    },

    methods: {
        toggleLanguage() {
            const language = this.selectedLanguage;
            this.selectedLanguage = language === 'Eng' ? 'Geo' : 'Eng';
            this.isOpenLanguageDropdown = false;
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

        scrollToSection() {
            const sectionRef = this.useScrollToSection.specificRef;
            return this.useScrollToSection.scrollTo(sectionRef);
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

    computed: {
        nextLanguage() {
            return this.selectedLanguage === 'Eng' ? 'Geo' : 'Eng';
        },
    },
};
</script>
