<template>
    <div class="mt-5 space-y-10 text-white">
        <NewsItem />
    </div>
</template>
<script>
import NewsItem from '@/components/news-feed/NewsItem.vue';

export default {
    name: 'NewsList',
    components: { NewsItem },
};
</script>
