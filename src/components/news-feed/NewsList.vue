<template>
    <div class="mt-5 space-y-10 text-white">
        <LoadingIcon v-show="isLoading" />
        <NewsItem v-show="!isLoading" v-for="quote in quotes" :key="quote.id" :quote="quote" />
    </div>
</template>
<script>
import NewsItem from '@/components/news-feed/NewsItem.vue';
import LoadingIcon from '@/components/icons/LoadingIcon.vue';
import { axios } from '@/configs/axios/index.js';
import { mapStores } from 'pinia';
import { useAuthStore } from '@/stores/user/auth.js';

export default {
    name: 'NewsList',
    components: { NewsItem, LoadingIcon },

    data() {
        return {
            quotes: [],
            isLoading: false,
        };
    },

    mounted() {
        this.fetchNews();
    },

    methods: {
        async fetchNews() {
            this.isLoading = true;

            try {
                const response = await axios.get('/quotes');

                if (response.status === 200) {
                    this.quotes = response.data.quotes;
                }
            } catch (error) {
                const response = error.response;
                if (response.status === 401) {
                    this.authStore.logout();
                    this.$router.push({ name: 'login' });
                }
            } finally {
                this.isLoading = false;
            }
        },
    },

    computed: {
        ...mapStores(useAuthStore),
    },
};
</script>
