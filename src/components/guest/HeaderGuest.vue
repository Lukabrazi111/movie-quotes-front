<template>
    <header class="bg-dark h-[80vh]">
        <BaseContainer>
            <div class="flex items-center justify-between px-4 py-8">
                <div>
                    <h1 class="text-cream uppercase text-md font-helvetica font-normal">
                        Movie quotes
                    </h1>
                </div>

                <div class="flex items-center space-x-6 text-white">
                    <div class="relative">
                        <div
                            @click="open = !open"
                            class="hover:bg-gray-700 transition-colors flex items-center space-x-5 px-4 py-1.5 cursor-pointer"
                            :class="{
                                'rounded-t': open,
                                rounded: !open,
                            }"
                        >
                            <span>{{ selectedLanguage }}</span>
                            <ArrowIcon :open="open" />
                        </div>
                        <div
                            v-show="open"
                            @click="toggleLanguage"
                            class="absolute right-0 hover:bg-gray-700 rounded-b text-white w-full text-center py-1.5 cursor-pointer transition-colors"
                        >
                            {{ nextLanguage }}
                        </div>
                    </div>

                    <BaseButton>Sign up</BaseButton>
                    <button class="border px-5 py-1.5 rounded font-normal font-helvetica">
                        Log in
                    </button>
                </div>
            </div>

            <div class="flex flex-col items-center justify-center space-y-5 text-center h-[50vh]">
                <h1
                    class="text-5xl w-full max-w-xl text-cream leading-18 font-montserrat font-bold"
                >
                    Find any quote in millions of movie lines
                </h1>
                <BaseButton @scrollToContent="scrollToSection">Get started</BaseButton>
            </div>
        </BaseContainer>
    </header>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseContainer from '@/components/BaseContainer.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import { useScrollToSectionStore } from '@/stores/scroll-to-section.js';

export default {
    name: 'HeaderGuest',
    components: { ArrowIcon, BaseContainer, BaseButton },

    data() {
        return {
            selectedLanguage: 'Eng',
            open: false,
            useScrollToSection: null,
        };
    },

    created() {
        this.useScrollToSection = useScrollToSectionStore();
    },

    methods: {
        toggleLanguage() {
            const language = this.selectedLanguage;
            this.selectedLanguage = language === 'Eng' ? 'Geo' : 'Eng';
            this.open = false;
        },

        scrollToSection() {
            const sectionRef = this.useScrollToSection.specificRef;
            return this.useScrollToSection.scrollToSection(sectionRef);
        },
    },

    computed: {
        nextLanguage() {
            return this.selectedLanguage === 'Eng' ? 'Geo' : 'Eng';
        },
    },
};
</script>

<style></style>
