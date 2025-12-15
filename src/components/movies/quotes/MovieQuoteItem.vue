<template>
    <div id="bgOpacity" class="relative text-white rounded-lg px-5 py-4 space-y-4 w-full max-w-2xl">
        <MovieQuoteOptionsMenu
            @toggleQuoteOptions="toggleQuoteOptions"
            @closeQuoteOptions="closeQuoteOptions"
            v-model="isQuoteOptionsOpen"
            :quote="quote || {}"
        />

        <div class="flex items-center text-center">
            <img
                :src="quote.image ? quote.image : '/public/images/movie-detail.jpg'"
                alt="movie-image"
                class="rounded-md w-full max-w-40 object-cover object-center"
            />

            <p class="mx-auto px-5">
                {{ quote.description }}
            </p>
        </div>
        <div class="flex items-center space-x-6 border-t border-border-gray pt-4">
            <div class="flex items-center space-x-2">
                <span>{{ quote.comments_count }}</span>
                <div>
                    <CommentIcon />
                </div>
            </div>
            <div class="flex items-center space-x-2">
                <span>{{ quote.likes_count }}</span>
                <div>
                    <LikeIcon />
                </div>
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

    props: {
        quote: {
            type: Object,
            required: true,
        },
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
