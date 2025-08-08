<template>
    <section class="w-full max-w-3xl">
        <NewsHeader />
        <NewsList />
    </section>
</template>
<script>
import NewsHeader from '@/components/news-feed/NewsHeader.vue';
import NewsList from '@/components/news-feed/NewsList.vue';

export default {
    name: 'NewsFeed',
    components: { NewsList, NewsHeader },

    data() {
        return {
            isOpenSearchInput: false,
        };
    },

    methods: {
        toggleSearchInput() {
            this.isOpenSearchInput = !this.isOpenSearchInput;
        },
    },
};
</script>
