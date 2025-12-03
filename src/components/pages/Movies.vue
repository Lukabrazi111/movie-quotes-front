<template>
    <LoadingIcon v-show="isLoading" />

    <div v-show="!isLoading">
        <MoviesHeader :countMovies="count" v-model:search="queries['filter[title]']" />
        <MoviesList v-if="movies.length > 0" :movies="movies" />
        <NotFoundMovie v-else-if="!isLoading && movies.length <= 0" />
    </div>
</template>

<script>
import MoviesHeader from '@/components/movies/MoviesHeader.vue';
import MoviesList from '@/components/movies/MoviesList.vue';
import LoadingIcon from '@/components/icons/LoadingIcon.vue';
import NotFoundMovie from '@/components/movies/NotFoundMovie.vue';
import { axios } from '@/configs/axios/index.js';

export default {
    name: 'MovieList',
    components: { LoadingIcon, MoviesList, MoviesHeader, NotFoundMovie },

    data() {
        return {
            movies: [],
            count: 0,
            isLoading: false,
            queries: {
                // TODO: need to add pagination part
                'filter[title]': '',
                ...this.$route.query,
            },
        };
    },

    methods: {
        async fetchMovies() {
            this.isLoading = true;

            const qs = new URLSearchParams(this.queries).toString();

            try {
                const response = await axios.get(`movies?${qs}`);

                if (response.status === 200) {
                    this.movies = response.data.movies;
                    this.count = response.data.count || 0;
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                this.isLoading = false;
            }
        },
    },

    mounted() {
        this.fetchMovies();
    },

    watch: {
        queries: {
            handler(value) {
                this.fetchMovies();
                this.$router.push({ query: value });
            },
            deep: true,
        },
    },
};
</script>
