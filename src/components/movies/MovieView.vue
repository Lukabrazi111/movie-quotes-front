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

            <div>
                <img
                    src="/public/images/movie-detail.jpg"
                    alt="movie-image"
                    class="rounded-lg w-full max-w-4xl"
                />
            </div>
            <div class="flex flex-col space-y-4 text-white w-full max-w-xl">
                <h1 class="text-xl text-cream">Commitment hasan (1999)</h1>
                <div>
                    <ul class="flex items-start space-x-2">
                        <li
                            class="text-white bg-gray-400 rounded flex items-center space-x-1 px-1 text-nowrap"
                        >
                            <span>Drama</span>
                        </li>
                        <li
                            class="text-white bg-gray-400 rounded flex items-center space-x-1 px-1 text-nowrap"
                        >
                            <span>Romance</span>
                        </li>
                    </ul>
                </div>
                <div>Director: Nick cassavetes</div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem deleniti earum
                    error ipsa laudantium nam nemo perferendis perspiciatis placeat sit. Alias iste
                    molestiae necessitatibus repellat soluta tempore vel. Culpa deleniti eius id
                    minus necessitatibus perferendis, provident qui ut. Ab ad at culpa fugiat
                    impedit nulla obcaecati sed. Adipisci delectus, sapiente?
                </p>
            </div>
        </div>

        <!-- Quote lists -->
        <MovieQuoteLists />
    </section>
</template>

<script>
import MovieQuoteLists from '@/components/movies/quotes/MovieQuoteLists.vue';
import MovieActionOptions from '@/components/movies/MovieActionOptions.vue';

export default {
    name: 'MoviesView',
    components: {
        MovieActionOptions,
        MovieQuoteLists,
    },

    data() {
        return {
            isOpenMovieActionOptions: false,
        };
    },
};
</script>

<style>
#bgOpacity {
    background: rgba(0, 0, 0, 0.4);
}
</style>
