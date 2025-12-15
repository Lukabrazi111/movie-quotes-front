<template>
    <Transition name="modal" appear>
        <div
            v-if="modelValue"
            @click="handleBackgroundClick"
            id="bgTransparent"
            class="fixed top-0 left-0 h-full w-full flex items-center justify-center z-50"
        >
            <div
                @click.stop
                class="bg-content-dark w-full sm:max-w-3xl md:mx-0 mx-10 rounded-md fixed top-26 flex flex-col pt-5 max-h-[calc(100vh-12rem)]"
            >
                <FormHeader
                    @closeDropdown="closeModal"
                    title="View Quote"
                    class="bg-content-dark flex-shrink-0"
                />

                <div
                    class="bg-content-dark rounded-lg px-5 py-4 space-y-4 overflow-y-auto flex-1 min-h-0"
                >
                    <div class="flex items-center space-x-4 w-full py-1">
                        <img
                            class="w-full max-w-12 h-12 object-cover rounded-full"
                            :src="
                                quote.user?.avatar
                                    ? quote.user.avatar
                                    : '/src/assets/images/person.jpg'
                            "
                            alt="profile-image"
                        />
                        <h3 class="text-lg">{{ quote.user?.username }}</h3>
                    </div>

                    <div>
                        <textarea
                            disabled
                            name="quote_description_view"
                            id="quote_description_view"
                            :value="'“' + quote.description + '”'"
                            cols="30"
                            rows="1"
                            class="w-full border-[#6C757D] border px-2 py-1 outline-none placeholder:italic rounded"
                            placeholder="Quote description..."
                        />
                    </div>

                    <div class="flex justify-center">
                        <img
                            :src="quote.image ? quote.image : '/src/assets/images/person.jpg'"
                            alt="quote-image"
                            class="rounded-lg w-full max-w-lg object-cover object-center"
                        />
                    </div>

                    <div
                        class="flex items-center space-x-6"
                        :class="{
                            'border-b border-border-gray pb-3':
                                comments.length > 0 && isCommentsOpen,
                        }"
                    >
                        <div class="flex items-center space-x-2">
                            <span>{{ displayCommentsCount }}</span>
                            <button
                                @click="isCommentsOpen = !isCommentsOpen"
                                tabindex="0"
                                aria-label="Toggle comments"
                            >
                                <CommentIcon />
                            </button>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span>{{ quote.likes_count || 0 }}</span>
                            <div>
                                <LikeIcon />
                            </div>
                        </div>
                    </div>

                    <!-- Comments -->
                    <div v-show="isCommentsOpen" data-comments-section>
                        <CommentList
                            :comments="comments || []"
                            :error-message="errors?.comment ?? ''"
                        />
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
            </div>
        </div>
    </Transition>
</template>

<script>
import CommentIcon from '@/components/icons/news-feed/CommentIcon.vue';
import LikeIcon from '@/components/icons/news-feed/LikeIcon.vue';
import CommentList from '@/components/news-feed/CommentList.vue';
import FormHeader from '@/components/modals/dashboard-form/FormHeader.vue';
import FieldError from '@/components/ui/form/FieldError.vue';
import BasePagination from '@/components/ui/BasePagination.vue';
import CommentPostForm from '@/components/news-feed/CommentPostForm.vue';
import { useAuthStore } from '@/stores/user/auth.js';
import { mapState } from 'pinia';
import { axios } from '@/configs/axios/index.js';

export default {
    components: {
        CommentIcon,
        LikeIcon,
        CommentList,
        FormHeader,
        FieldError,
        BasePagination,
        CommentPostForm,
    },
    name: 'QuoteView',

    data() {
        return {
            pagination: null,
            isCommentsOpen: false,
            errors: {},
            comments: [],
        };
    },

    computed: {
        ...mapState(useAuthStore, ['currentUser']),
        displayCommentsCount() {
            return this.pagination?.total ?? this.quote.comments_count ?? 0;
        },
    },

    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        quote: {
            type: Object,
            required: true,
        },
    },

    watch: {
        modelValue(newVal) {
            if (newVal) {
                document.body.classList.add('overflow-hidden');
                this.getPaginatedComments();
            } else {
                document.body.classList.remove('overflow-hidden');
                this.isCommentsOpen = false;
                this.comments = [];
                this.pagination = null;
                this.errors = {};
            }
        },
    },

    methods: {
        handleBackgroundClick(event) {
            if (event.target.id === 'bgTransparent') {
                this.closeModal();
            }
        },

        closeModal() {
            this.$emit('update:modelValue', false);
        },

        async getPaginatedComments(page = 1) {
            try {
                const { data } = await axios.get(`/quotes/${this.quote.id}/comments?page=${page}`);
                this.pagination = data?.meta ?? null;
                this.comments = data?.data ?? [];
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        },

        handlePageChange(page) {
            if (page === '...' || !this.pagination) return;
            if (page < 1 || page > this.pagination.last_page) return;

            this.getPaginatedComments(page);
        },

        async createComment(commentBody) {
            try {
                const payload = {
                    user_id: this.currentUser.id,
                    quote_id: this.quote.id,
                    body: commentBody,
                };

                const response = await axios.post(`/quotes/${this.quote.id}/comments`, payload);

                if (response.status === 200) {
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
                    const authStore = useAuthStore();
                    authStore.logout();
                    this.$router.push({ name: 'login' });
                }
            }
        },
    },
};
</script>
