<template>
    <section class="space-y-10 text-white">
        <div class="grid grid-cols-3 gap-10 items-center">
            <MoviesItem
                v-for="movie in movies"
                :key="movie.id"
                :id="movie.id"
                :title="movie.title"
                :releaseYear="movie.release_year"
                :imageUrl="movie.thumbnail"
                :quotesCount="movie.quotes_count"
            />
        </div>
    </section>
</template>

<script>
import MoviesItem from '@/components/movies/MoviesItem.vue';

export default {
    name: 'MoviesList',
    components: { MoviesItem },

    data() {
        return {
            isLoading: false,
        };
    },

    props: {
        movies: {
            type: Array,
            required: true,
        },
    },
};
</script>
