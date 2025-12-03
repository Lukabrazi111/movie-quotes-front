<template>
    <header class="flex items-center justify-between w-full mb-2">
        <h1 class="text-white font-bold! text-xl">My list of movies (Total {{ countMovies }})</h1>
        <div class="flex items-center space-x-5">
            <div
                v-click-outside="() => (isOpenSearchInput = false)"
                class="flex items-center"
                :class="{
                    'w-full': isOpenSearchInput,
                }"
            >
                <button
                    @click="toggleSearchInput"
                    v-show="!isOpenSearchInput"
                    class="text-gray-300 flex items-center text-nowrap px-4 py-3 space-x-4"
                >
                    <SearchIcon />
                    <span>Search by</span>
                </button>

                <div
                    v-show="isOpenSearchInput"
                    class="flex items-center border-b border-gray-600 w-full max-w-2xl space-x-3"
                >
                    <SearchIcon />
                    <input
                        @blur="$emit('update:search', $event.target.value)"
                        @keyup.enter="$event.target.blur()"
                        type="text"
                        name="search"
                        placeholder="Search movies"
                        class="text-gray-main py-3 focus:outline-0 w-full"
                    />
                </div>
            </div>
            <BaseButton class="text-nowrap" @click="isOpenMovieModal = true">Add movie</BaseButton>
        </div>
    </header>

    <!-- Create movie modal -->
    <CreateMovieModal
        v-show="isOpenMovieModal"
        v-model="isOpenMovieModal"
        @fetch-movies="fetchMovies"
    />
</template>

<script>
import SearchIcon from '@/components/icons/news-feed/SearchIcon.vue';
import BaseButton from '@/components/ui/buttons/BaseButton.vue';
import CreateMovieModal from '@/components/modals/movies/CreateMovieModal.vue';

export default {
    name: 'MoviesHeader',
    components: { BaseButton, SearchIcon, CreateMovieModal },

    data() {
        return {
            isOpenSearchInput: false,
            isOpenMovieModal: false,
        };
    },

    props: {
        countMovies: {
            type: Number,
            required: true,
        },
        search: {
            type: String,
            required: false,
        },
        fetchMovies: {
            type: Function,
            required: true,
        },
    },

    methods: {
        toggleSearchInput() {
            this.isOpenSearchInput = !this.isOpenSearchInput;
        },
    },
};
</script>
