<template>
    <header class="text-white mb-5">
        <h1 class="text-white font-bold! text-xl">Movie description</h1>
    </header>

    <section class="space-y-5">
        <div
            @mouseover="isOpenMovieActionOptions = true"
            @mouseleave="isOpenMovieActionOptions = false"
            class="relative flex items-start justify-between space-x-6"
        >
            <MovieActionOptions v-show="isOpenMovieActionOptions" />

            <div class="w-full max-w-4xl">
                <img
                    :src="movie.thumbnail ? movie.thumbnail : '/public/images/movie-detail.jpg'"
                    alt="movie-image"
                    class="rounded-lg w-full object-cover object-center"
                />
            </div>
            <div class="flex flex-col space-y-4 text-white w-full max-w-xl">
                <h1 class="text-xl text-cream">{{ movie.title }} ({{ movie.release_year }})</h1>
                <div>
                    <ul class="flex items-start space-x-2">
                        <li
                            v-for="genre in movie.genres"
                            :key="genre.id"
                            class="text-white bg-gray-400 rounded flex items-center space-x-1 px-1 text-nowrap"
                        >
                            <span>{{ genre.name }}</span>
                        </li>
                    </ul>
                </div>
                <div>Director: {{ movie.director }}</div>
                <p>
                    {{ movie.description }}
                </p>
            </div>
        </div>

        <div class="text-white space-x-4">
            <span>Quotes (total {{ movie.quotes_count }})</span>
            <span class="text-[#6C757D]">|</span>
            <BaseButton @click="isOpenCreateNewQuoteModal = true">Add quote</BaseButton>
        </div>

        <!-- Quote lists -->
        <MovieQuoteLists />

        <!-- Create quote form modal -->
        <CreateQuoteForMovieModal
            v-if="isOpenCreateNewQuoteModal"
            v-model="isOpenCreateNewQuoteModal"
        />
    </section>
</template>

<script>
import MovieQuoteLists from '@/components/movies/quotes/MovieQuoteLists.vue';
import MovieActionOptions from '@/components/movies/MovieActionOptions.vue';
import CreateQuoteForMovieModal from '@/components/modals/movies/CreateQuoteForMovieModal.vue';
import BaseButton from '@/components/ui/buttons/BaseButton.vue';
import { axios } from '@/configs/axios/index.js';

export default {
    name: 'MoviesView',
    components: {
        BaseButton,
        CreateQuoteForMovieModal,
        MovieActionOptions,
        MovieQuoteLists,
    },

    data() {
        return {
            isOpenMovieActionOptions: false,
            isOpenCreateNewQuoteModal: false,
            movie: {},
        };
    },

    mounted() {
        this.fetchMovie();
    },

    methods: {
        async fetchMovie() {
            try {
                const response = await axios.get(`/movies/${this.$route.params.id}`);

                if (response.status === 200) {
                    this.movie = response.data.movie;
                }
            } catch (error) {
                const response = error.response;

                console.log(response);
            }
        },
    },
};
</script>

<style>
#bgOpacity {
    background: rgba(0, 0, 0, 0.4);
}
</style>
