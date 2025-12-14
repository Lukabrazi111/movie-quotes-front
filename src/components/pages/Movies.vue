<template>
    <LoadingIcon v-show="isLoading" />

    <section class="flex flex-col justify-between h-[calc(100vh-75px)] space-y-5">
        <div v-show="!isLoading">
            <MoviesHeader
                :countMovies="count"
                v-model:search="queries['filter[title]']"
                :fetch-movies="fetchMovies"
            />
            <MoviesList v-if="movies.length > 0" :movies="movies" />
            <NotFoundMovie v-else-if="!isLoading && movies.length <= 0" />
        </div>

        <div>
            <BasePagination
                :pagination="pagination"
                @page-change="fetchMovies"
                :show-pagination="true"
            />
        </div>
    </section>
</template>

<script>
import MoviesHeader from '@/components/movies/MoviesHeader.vue';
import MoviesList from '@/components/movies/MoviesList.vue';
import LoadingIcon from '@/components/icons/LoadingIcon.vue';
import NotFoundMovie from '@/components/movies/NotFoundMovie.vue';
import BasePagination from '@/components/ui/BasePagination.vue';
import { axios } from '@/configs/axios/index.js';

export default {
    name: 'MovieList',
    components: { LoadingIcon, MoviesList, MoviesHeader, NotFoundMovie, BasePagination },

    data() {
        return {
            movies: [],
            count: 0,
            isLoading: false,
            pagination: null,
            queries: {
                'filter[title]': '',
                ...this.$route.query,
            },
        };
    },

    methods: {
        async fetchMovies(page = 1) {
            this.isLoading = true;

            const qs = new URLSearchParams(this.queries).toString();

            try {
                const response = await axios.get(`movies?page=${page}&${qs}`);

                if (response.status === 200) {
                    console.log(response);
                    this.movies = response?.data?.data ?? [];
                    this.pagination = response?.data?.meta ?? null;
                    this.count = response?.data?.count || 0;
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                this.isLoading = false;
            }
        },
    },

    mounted() {
        this.fetchMovies(1);
    },

    watch: {
        queries: {
            handler(value) {
                this.fetchMovies(1);
                this.$router.push({ query: value });
            },
            deep: true,
        },
    },
};
</script>
