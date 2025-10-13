<template>
    <div id="bgOpacity" class="relative text-white rounded-lg px-5 py-4 space-y-4 max-w-xl">
        <MovieQuoteOptionsMenu
            @toggleQuoteOptions="toggleQuoteOptions"
            @closeQuoteOptions="closeQuoteOptions"
            v-model="isQuoteOptionsOpen"
        />

        <div class="flex items-center text-center">
            <img
                src="/images/movie-detail.jpg"
                alt="movie-image"
                class="rounded-md w-full max-w-40"
            />

            <p class="mx-auto px-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, odio?
            </p>
        </div>
        <div class="flex items-center space-x-6 border-t border-border-gray pt-4">
            <div class="flex items-center space-x-2">
                <span>3</span>
                <button>
                    <CommentIcon />
                </button>
            </div>
            <div class="flex items-center space-x-2">
                <span>3</span>
                <button>
                    <LikeIcon />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import CommentIcon from '@/components/icons/news-feed/CommentIcon.vue';
import LikeIcon from '@/components/icons/news-feed/LikeIcon.vue';
import MovieQuoteOptionsMenu from '@/components/movies/quotes/MovieQuoteOptionsMenu.vue';

export default {
    name: 'MovieQuoteItem',
    components: {
        MovieQuoteOptionsMenu,
        LikeIcon,
        CommentIcon,
    },

    data() {
        return {
            isQuoteOptionsOpen: false,
        };
    },

    methods: {
        toggleQuoteOptions() {
            this.isQuoteOptionsOpen = !this.isQuoteOptionsOpen;
        },

        closeQuoteOptions() {
            this.isQuoteOptionsOpen = false;
        },
    },
};
</script>
