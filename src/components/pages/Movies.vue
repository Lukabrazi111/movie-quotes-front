<template>
    <MoviesHeader />
    <MoviesList />
</template>

<script>
import MoviesHeader from '@/components/movies/MoviesHeader.vue';
import MoviesList from '@/components/movies/MoviesList.vue';

export default {
    name: 'MovieList',
    components: { MoviesList, MoviesHeader },

    data() {
        return {};
    },

    methods: {},
};
</script>
