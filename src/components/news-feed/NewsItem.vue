<template>
    <div class="bg-content-dark rounded-lg px-5 py-4 space-y-4">
        <router-link :to="{ name: 'profile' }" class="flex items-center space-x-4 w-full py-1">
            <img
                class="w-full max-w-12 h-12 object-cover rounded-full"
                :src="quote.user.avatar ? quote.user.avatar : '/src/assets/images/person.jpg'"
                alt="profile-image"
            />
            <h3 class="text-lg">{{ quote.user.username }}</h3>
        </router-link>

        <div>
            <p>
                “{{ quote.description }}” movie -
                <span class="text-cream font-bold">{{ quote.movie.title }}&nbsp;</span>
                <span>({{ quote.movie.release_year }})</span>
            </p>
        </div>

        <div>
            <img
                :src="quote.image ? quote.image : '/src/assets/images/person.jpg'"
                alt="image"
                class="rounded-lg w-full object-cover object-center"
            />
        </div>

        <div class="flex items-center space-x-6 border-b border-border-gray pb-3">
            <div class="flex items-center space-x-2">
                <span>{{ quote.comments_count }}</span>
                <button>
                    <CommentIcon />
                </button>
            </div>
            <div class="flex items-center space-x-2">
                <span>{{ quote.likes_count }}</span>
                <button>
                    <LikeIcon />
                </button>
            </div>
        </div>

        <!-- Comments -->
        <CommentList :comments="comments || []" />

        <!-- Comment post -->
        <CommentPostForm :user="currentUser" />
    </div>
</template>
<script>
import CommentIcon from '@/components/icons/news-feed/CommentIcon.vue';
import LikeIcon from '@/components/icons/news-feed/LikeIcon.vue';
import CommentPostForm from '@/components/news-feed/CommentPostForm.vue';
import CommentList from '@/components/news-feed/CommentList.vue';
import { mapState } from 'pinia';
import { useAuthStore } from '@/stores/user/auth.js';

export default {
    name: 'NewsItem',
    components: { CommentPostForm, LikeIcon, CommentIcon, CommentList },

    props: {
        quote: {
            type: Object,
            required: true,
        },
        comments: {
            type: Array,
            required: true,
        },
    },

    computed: {
        ...mapState(useAuthStore, ['currentUser']),
    },
};
</script>
