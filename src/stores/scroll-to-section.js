import { defineStore } from 'pinia';

export const useScrollToSectionStore = defineStore('scrollToSection', {
    state: () => ({
        specificRef: '',
    }),

    actions: {
        scrollToSection(view) {
            view.scrollIntoView({ behavior: 'smooth' });
        },
    },
});
