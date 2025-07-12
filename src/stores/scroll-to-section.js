import { defineStore } from 'pinia';

export const useScrollToSectionStore = defineStore('scrollToSection', {
    state: () => ({
        specificRef: '',
    }),

    actions: {
        scrollTo(view, behavior = 'smooth') {
            view.scrollIntoView({ behavior: behavior });
        },
    },
});
