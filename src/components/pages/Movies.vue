<template>
    <LoadingIcon v-show="isLoading" />

    <div v-show="!isLoading">
        <MoviesHeader :countMovies="count" />
        <MoviesList :movies="movies" />
    </div>
</template>

<script>
import MoviesHeader from '@/components/movies/MoviesHeader.vue';
import MoviesList from '@/components/movies/MoviesList.vue';
import { axios } from '@/configs/axios/index.js';
import LoadingIcon from '@/components/icons/LoadingIcon.vue';

export default {
    name: 'MovieList',
    components: { LoadingIcon, MoviesList, MoviesHeader },

    data() {
        return {
            movies: [],
            count: 0,
            isLoading: false,
        };
    },

    methods: {},

    async mounted() {
        this.isLoading = true;

        try {
            const response = await axios.get('movies');

            if (response.status === 200) {
                this.movies = response.data.movies;
                this.count = response.data.count || 0;
            }
        } catch (error) {
            console.error('Error fetching movies: ', error);
        } finally {
            this.isLoading = false;
        }
    },
};
</script>
