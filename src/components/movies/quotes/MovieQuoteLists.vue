<template>
    <div class="space-y-5 w-full">
        <MovieQuoteItem v-for="quote in quotes" :key="quote.id" :quote="quote" />
    </div>
</template>
<script>
import MovieQuoteItem from '@/components/movies/quotes/MovieQuoteItem.vue';

export default {
    name: 'MovieQuoteLists',
    components: { MovieQuoteItem },

    props: {
        quotes: {
            type: Array,
            required: true,
        },
    },
};
</script>
