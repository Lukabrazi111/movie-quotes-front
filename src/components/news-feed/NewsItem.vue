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
                'border-b border-border-gray pb-3': comments.length > 0 && isCommentsOpen,
            }"
        >
            <div class="flex items-center space-x-2">
                <span>{{ displayCommentsCount }}</span>
                <button @click="isCommentsOpen = !isCommentsOpen">
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
        <div v-show="isCommentsOpen" data-comments-section>
            <CommentList :comments="comments" :error-message="errors?.comment ?? ''" />
        </div>

        <!-- Pagination -->
        <BasePagination
            :pagination="pagination"
            @page-change="handlePageChange"
            :show-pagination="isCommentsOpen"
        />

        <!-- Comment post -->
        <CommentPostForm :user="currentUser" @create-comment="createComment" />

        <!-- Comment error -->
        <FieldError v-show="errors?.comment" :message="errors?.comment" />
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
import FieldError from '@/components/ui/form/FieldError.vue';
import BasePagination from '@/components/ui/BasePagination.vue';

export default {
    name: 'NewsItem',
    components: { CommentPostForm, LikeIcon, CommentIcon, CommentList, FieldError, BasePagination },

    data() {
        return {
            localLikesCount: null,
            localLikes: null,
            isCommentsOpen: false,
            comments: [],
            errors: {},
            pagination: null,
        };
    },

    props: {
        quote: {
            type: Object,
            required: true,
        },
    },

    mounted() {
        this.getPaginatedComments();
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
        displayCommentsCount() {
            return this.pagination?.total ?? 0;
        },
    },

    methods: {
        // Create comment request
        async createComment(commentBody) {
            try {
                const payload = {
                    user_id: this.currentUser.id,
                    quote_id: this.quote.id,
                    body: commentBody,
                };

                const response = await axios.post(`/quotes/${this.quote.id}/comments`, payload);

                if (response.status === 200) {
                    // Refresh comments - go to page 1 to show the new comment
                    await this.getPaginatedComments(1);
                    this.isCommentsOpen = true;
                    this.errors.comment = '';
                }
            } catch (error) {
                const response = error.response;

                if (response?.status === 422) {
                    this.errors.comment = response.data?.message;
                }

                if (response?.status === 401) {
                    this.authStore.logout();
                    this.$router.push({ name: 'login' });
                }
            } finally {
                this.comment = '';
            }
        },

        handlePageChange(page) {
            if (page === '...' || !this.pagination) return;
            if (page < 1 || page > this.pagination.last_page) return;

            this.getPaginatedComments(page);
        },

        // Get paginated comments request
        async getPaginatedComments(page = 1) {
            try {
                const { data } = await axios.get(`/quotes/${this.quote.id}/comments?page=${page}`);
                this.pagination = data?.meta ?? null;
                this.comments = data?.data ?? [];
            } catch (error) {
                console.error(error);
            }
        },

        // Toggle like request
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
