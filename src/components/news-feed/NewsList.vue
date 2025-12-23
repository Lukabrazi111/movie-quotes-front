<template>
    <div class="mt-5 space-y-10 text-white">
        <LoadingIcon v-show="isLoading" />
        <NewsItem v-show="!isLoading" v-for="quote in quotes" :key="quote.id" :quote="quote" />
        <BasePagination :pagination="pagination" @page-change="fetchNews" :show-pagination="true" />
    </div>
</template>
<script>
import NewsItem from '@/components/news-feed/NewsItem.vue';
import LoadingIcon from '@/components/icons/LoadingIcon.vue';
import BasePagination from '@/components/ui/BasePagination.vue';
import { axios } from '@/configs/axios/index.js';
import { mapStores } from 'pinia';
import { useAuthStore } from '@/stores/user/auth.js';

export default {
    name: 'NewsList',
    components: { NewsItem, LoadingIcon, BasePagination },

    data() {
        return {
            quotes: [],
            isLoading: false,
            pagination: null,
            queries: {
                'filter[movie.title]': '',
                'filter[description]': '',
                ...this.$route.query,
            },
        };
    },

    mounted() {
        this.fetchNews(1);
    },

    methods: {
        async fetchNews(page = 1, query = '') {
            this.isLoading = true;

            this.applyQueryFilters(query);

            try {
                const qs = new URLSearchParams({
                    ...this.queries,
                }).toString();

                const response = await axios.get(`/quotes?page=${page}&${qs}`);

                if (response.status === 200) {
                    this.quotes = response.data?.data ?? [];
                    this.pagination = response.data?.meta ?? null;

                    // Scroll to top after data is loaded and DOM is updated
                    this.$nextTick(() => {
                        this.scrollToTop();
                    });
                }
            } catch (error) {
                const response = error.response;
                if (response?.status === 401) {
                    this.authStore.logout();
                    this.$router.push({ name: 'login' });
                }
            } finally {
                this.isLoading = false;
            }
        },

        applyQueryFilters(query) {
            this.queries['filter[movie.title]'] = '';
            this.queries['filter[description]'] = '';

            if (!query || typeof query !== 'string') return;

            const trimmedQuery = query.trim();

            if (trimmedQuery.startsWith('@')) {
                this.queries['filter[movie.title]'] = trimmedQuery.slice(1);
            } else if (trimmedQuery.startsWith('#')) {
                this.queries['filter[description]'] = trimmedQuery.slice(1);
            }
        },

        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
    },

    computed: {
        ...mapStores(useAuthStore),
    },
};
</script>
