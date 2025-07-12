import { defineStore } from 'pinia';

export const useScrollToSectionStore = defineStore('scrollToSection', {
    state: () => ({
        specificRef: '',
    }),

    actions: {
        scrollTo(view) {
            view.scrollIntoView({ behavior: 'smooth' });
        },
    },
});
