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
        };
    },

    mounted() {
        this.fetchNews(1);
    },

    methods: {
        async fetchNews(page = 1) {
            this.isLoading = true;

            try {
                const response = await axios.get(`/quotes?page=${page}`);

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

        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
    },

    computed: {
        ...mapStores(useAuthStore),
    },
};
</script>
