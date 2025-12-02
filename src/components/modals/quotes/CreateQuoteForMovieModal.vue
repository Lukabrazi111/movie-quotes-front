<template>
    <ModalLayout @click="closeModal">
        <FormHeader @closeDropdown="closeModal" title="Add Quote" />

        <FormSection @submit="createQuote" novalidate class="w-full text-white">
            <div class="px-5 space-y-5 mt-5">
                <div class="flex items-center space-x-3">
                    <img
                        class="w-10 rounded-full bg-center bg-cover"
                        :src="this.user.avatar || '/public/images/profile/no-profile-picture.jpg'"
                        alt="profile picture"
                    />
                    <h3>{{ this.user.username }}</h3>
                </div>
                <!-- Movie details -->
                <div class="flex items-center space-x-6">
                    <img
                        :src="movie.thumbnail || '/public/images/movie-detail.jpg'"
                        alt="movie-image"
                        class="w-full max-w-32 object-cover object-center rounded"
                    />
                    <div class="flex flex-col space-y-4">
                        <span class="flex items-center space-x-2">
                            <p class="text-xl font-bold text-cream">
                                {{ movie.title?.charAt(0).toUpperCase() + movie.title?.slice(1) }}
                            </p>
                            <p class="text-xl font-bold text-cream">({{ movie.release_year }})</p>
                        </span>
                        <GenreTags :genres="movie.genres || []" />
                        <p>Director: {{ movie.director }}</p>
                    </div>
                </div>
                <!-- Quote description -->
                <div class="flex flex-col items-center">
                    <div class="w-full relative">
                        <textarea
                            name="quote_description"
                            id="quote_description"
                            v-model="description"
                            cols="30"
                            rows="2"
                            class="w-full border-[#6C757D] border px-2 py-1 outline-none placeholder:italic"
                            placeholder="Start create new quote..."
                        />
                    </div>
                    <FieldError
                        class="flex justify-start items-start w-full"
                        v-if="errors.description"
                        :message="errors.description"
                    />
                </div>
                <!-- Handle quote image upload -->
                <HandleQuoteImageUpload v-model:image="image" />
                <div class="flex justify-start items-start w-full">
                    <FieldError v-if="errors.image" :message="errors.image" />
                </div>
                <BaseButton type="submit" class="text-center w-full"> Add quote </BaseButton>
            </div>
        </FormSection>
    </ModalLayout>
</template>

<script>
import BaseButton from '@/components/ui/buttons/BaseButton.vue';
import ModalLayout from '@/components/layouts/ModalLayout.vue';
import FormHeader from '@/components/modals/dashboard-form/FormHeader.vue';
import GenreTags from '@/components/ui/GenreTags.vue';
import { Form as FormSection } from 'vee-validate';
import { mapState } from 'pinia';
import { useAuthStore } from '@/stores/user/auth.js';
import { axios } from '@/configs/axios';
import FieldError from '@/components/ui/form/FieldError.vue';
import HandleQuoteImageUpload from '@/components/modals/quotes/HandleQuoteImageUpload.vue';

export default {
    name: 'CreateQuoteForMovieModal',
    components: {
        FormHeader,
        ModalLayout,
        BaseButton,
        FormSection,
        GenreTags,
        FieldError,
        HandleQuoteImageUpload,
    },

    data() {
        return {
            description: '',
            image: null,
            errors: {},
        };
    },

    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
        movie: {
            type: Object,
            required: true,
        },
    },

    computed: {
        ...mapState(useAuthStore, ['user']),
    },

    watch: {
        modelValue(newVal) {
            if (newVal === true) {
                document.body.classList.add('overflow-hidden');
            } else {
                document.body.classList.remove('overflow-hidden');
            }
        },
    },

    mounted() {
        if (this.modelValue === true) {
            document.body.classList.add('overflow-hidden');
        }
    },

    beforeUnmount() {
        document.body.classList.remove('overflow-hidden');
    },

    methods: {
        closeModal() {
            this.$emit('update:modelValue', false);
        },

        async createQuote() {
            try {
                let formData = new FormData();
                formData.append('description', this.description);
                formData.append('image', this.image);

                const response = await axios.post(`/movies/${this.movie.id}/quotes`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200) {
                    this.clearAllFields();
                    this.$emit('quote-created');
                    this.closeModal();
                }
            } catch (error) {
                const response = error.response;

                if (response.status === 422) {
                    this.errors.description = response.data?.errors?.description[0];
                    this.errors.image = response.data?.errors?.image?.[0];
                }
            }
        },

        clearAllFields() {
            this.description = '';
            this.image = null;
            this.errors = {};
        },
    },
};
</script>
