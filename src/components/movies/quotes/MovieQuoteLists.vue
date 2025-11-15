<template>
    <div class="space-y-5 w-full">
        <MovieQuoteItem />
    </div>
</template>
<script>
import MovieQuoteItem from '@/components/movies/quotes/MovieQuoteItem.vue';

export default {
    name: 'MovieQuoteLists',
    components: { MovieQuoteItem },
};
</script>
