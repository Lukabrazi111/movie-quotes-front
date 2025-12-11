<template>
    <div class="bg-content-dark rounded-lg px-5 py-4 space-y-4">
        <div class="flex items-center space-x-4 w-full py-1">
            <img
                class="w-full max-w-12 h-12 object-cover rounded-full"
                :src="quote.user.avatar ? quote.user.avatar : '/src/assets/images/person.jpg'"
                alt="profile-image"
            />
            <h3 class="text-lg">{{ quote.user.username }}</h3>
        </div>

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

        <div
            class="flex items-center space-x-6"
            :class="{
                'border-b border-border-gray pb-3': comments.length > 0,
            }"
        >
            <div class="flex items-center space-x-2">
                <span>{{ quote.comments_count }}</span>
                <button>
                    <CommentIcon />
                </button>
            </div>
            <div class="flex items-center space-x-2">
                <span>{{ displayLikesCount }}</span>
                <button @click="handleToggleLike">
                    <LikeIcon :is-liked="isLikedQuote" />
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
import { axios } from '@/configs/axios/index.js';

export default {
    name: 'NewsItem',
    components: { CommentPostForm, LikeIcon, CommentIcon, CommentList },

    data() {
        return {
            localLikesCount: null,
            localLikes: null,
        };
    },

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
        currentLikes() {
            return this.localLikes !== null ? this.localLikes : this.quote.likes || [];
        },
        isLikedQuote() {
            return this.currentLikes.some((like) => like.user_id === this.currentUser.id);
        },
        displayLikesCount() {
            return this.localLikesCount !== null ? this.localLikesCount : this.quote.likes_count;
        },
    },

    methods: {
        async handleToggleLike() {
            const wasLiked = this.isLikedQuote;
            const currentCount = this.displayLikesCount;
            const currentLikes = [...this.currentLikes];

            if (wasLiked) {
                this.localLikesCount = Math.max(0, currentCount - 1);
                this.localLikes = currentLikes.filter(
                    (like) => like.user_id !== this.currentUser.id,
                );
            } else {
                this.localLikesCount = currentCount + 1;
                this.localLikes = [
                    ...currentLikes,
                    {
                        user_id: this.currentUser.id,
                        quote_id: this.quote.id,
                    },
                ];
            }

            const payload = {
                user_id: this.currentUser.id,
                quote_id: this.quote.id,
                like: !wasLiked,
            };

            try {
                const response = await axios.post(`/quotes/${this.quote.id}/likes`, payload);

                if (response.status === 200) {
                    const serverLikesCount = response.data?.likes_count ?? this.localLikesCount;
                    const serverLikes = response.data?.likes ?? this.localLikes;

                    this.localLikesCount = serverLikesCount;
                    this.localLikes = serverLikes;
                }
            } catch (error) {
                this.localLikesCount = null;
                this.localLikes = null;

                console.error(error);
            }
        },
    },
};
</script>
