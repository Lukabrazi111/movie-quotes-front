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

                    <BaseButton @click="toggleSignUpModal"> Sign up</BaseButton>
                    <SecondaryButton @click="toggleSignInModal"> Log in</SecondaryButton>
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
        @switch-modal="handleModalSwitch"
        v-show="visibleSignUpModal"
        v-model="visibleSignUpModal"
    />
    <LoginModal
        @switch-modal="handleModalSwitch"
        v-show="visibleLoginModal"
        v-model="visibleLoginModal"
    />
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseContainer from '@/components/BaseContainer.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import SignUpModal from '@/components/modals/SignUpModal.vue';
import { useScrollToSectionStore } from '@/stores/scroll-to-section.js';
import LoginModal from '@/components/modals/LoginModal.vue';
import SecondaryButton from '@/components/ui/SecondaryButton.vue';

export default {
    name: 'HeaderGuest',
    components: { SecondaryButton, LoginModal, ArrowIcon, BaseContainer, BaseButton, SignUpModal },

    data() {
        return {
            selectedLanguage: 'Eng',
            isOpenLanguageDropdown: false,
            useScrollToSection: null,
            visibleSignUpModal: false,
            visibleLoginModal: false,
        };
    },

    created() {
        this.useScrollToSection = useScrollToSectionStore();
    },

    mounted() {
        const routeName = this.$route.name;

        if (routeName === 'login') this.visibleLoginModal = true;
        if (routeName === 'register') this.visibleSignUpModal = true;

        this.useScrollToSection.scrollTo(this.$refs.headerRef);
    },

    methods: {
        toggleLanguage() {
            const language = this.selectedLanguage;
            this.selectedLanguage = language === 'Eng' ? 'Geo' : 'Eng';
            this.isOpenLanguageDropdown = false;
        },

        toggleSignUpModal() {
            this.visibleSignUpModal = !this.visibleSignUpModal;
        },

        toggleSignInModal() {
            this.visibleLoginModal = !this.visibleLoginModal;
        },

        scrollToSection() {
            const sectionRef = this.useScrollToSection.specificRef;
            return this.useScrollToSection.scrollTo(sectionRef);
        },

        setOverflowHidden(value) {
            if (value) {
                document.body.classList.add('overflow-hidden');
            } else {
                this.$router.push({ name: 'landing' });
                document.body.classList.remove('overflow-hidden');
            }
        },

        handleModalSwitch(targetModal) {
            if (targetModal === 'login') {
                this.visibleSignUpModal = false;
                this.visibleLoginModal = true;
            } else if (targetModal === 'register') {
                this.visibleLoginModal = false;
                this.visibleSignUpModal = true;
            }
        },
    },

    watch: {
        visibleSignUpModal(value) {
            this.setOverflowHidden(value);
        },

        visibleLoginModal(value) {
            this.setOverflowHidden(value);
        },
    },

    computed: {
        nextLanguage() {
            return this.selectedLanguage === 'Eng' ? 'Geo' : 'Eng';
        },
    },
};
</script>
