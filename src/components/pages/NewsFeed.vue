<template>
    <AuthContentLayout>
        <NewsHeader @quote-created="handleQuoteCreated" />
        <NewsList ref="newsListRef" />
    </AuthContentLayout>
</template>
<script>
import NewsHeader from '@/components/news-feed/NewsHeader.vue';
import NewsList from '@/components/news-feed/NewsList.vue';
import AuthContentLayout from '@/components/layouts/AuthContentLayout.vue';

export default {
    name: 'NewsFeed',
    components: { NewsList, NewsHeader, AuthContentLayout },

    methods: {
        handleQuoteCreated() {
            this.$refs.newsListRef?.fetchNews();
        },
    },
};
</script>
