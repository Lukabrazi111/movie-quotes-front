<template>
    <header>
        <BaseContainer>
            <nav class="flex items-center justify-between px-4 py-6">
                <div>
                    <h1 class="text-cream uppercase text-md font-helvetica font-normal">
                        Movie quotes
                    </h1>
                </div>

                <div class="flex items-center space-x-6 text-white">
                    <div class="relative"
                        :class="{
                            'order-2': this.authStore.isAuthenticated,
                        }"
                    >
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

                    <!-- Slot: nav content -->
                    <slot name="nav-content" />
                </div>
            </nav>

            <!-- Slot: header content -->
            <slot name="header-content" />
        </BaseContainer>
    </header>
</template>

<script>
import BaseContainer from '@/components/BaseContainer.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import {useAuthStore} from '@/stores/user/auth.js';
import { mapStores } from 'pinia';

export default {
    name: 'HeaderLayout',
    components: { ArrowIcon, BaseContainer },

    data() {
        return {
            selectedLanguage: 'Eng',
            isOpenLanguageDropdown: false,
        };
    },

    computed: {
        ...mapStores(useAuthStore, ['isAuthenticated']),

        nextLanguage() {
            return this.selectedLanguage === 'Eng' ? 'Geo' : 'Eng';
        },
    },

    methods: {
        toggleLanguage() {
            const language = this.selectedLanguage;
            this.selectedLanguage = language === 'Eng' ? 'Geo' : 'Eng';
            this.isOpenLanguageDropdown = false;
        },
    },
};
</script>
