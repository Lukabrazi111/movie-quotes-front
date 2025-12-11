<template>
    <ModalLayout @click="toggleModal">
        <FormHeader
            @closeDropdown="this.$emit('update:modelValue', false)"
            title="Write New Quote"
        />

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

                <!-- Quote description -->
                <div class="flex flex-col items-center">
                    <div class="w-full relative">
                        <textarea
                            name="quote_description"
                            id="quote_description"
                            v-model="quote"
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

                <!-- Image upload section -->
                <ImageUploadSection v-model:image="image" />

                <FieldError
                    class="flex justify-start items-start w-full"
                    v-if="errors.image"
                    :message="errors.image"
                />

                <!-- Movie selection section -->
                <div class="relative">
                    <div
                        @click="toggleDropdown"
                        class="px-3 py-4 cursor-pointer flex items-center justify-between bg-black"
                    >
                        <div class="flex items-center space-x-4">
                            <StudioCameraIcon color="white" />
                            <span>{{ selectedMovie ? selectedMovie.title : 'Choose movie' }}</span>
                        </div>
                        <ArrowIcon :isOpenDropdown="isOpenDropdown" />
                    </div>
                    <div
                        v-show="isOpenDropdown"
                        id="dropdown"
                        class="z-10 bg-black rounded-b-lg shadow-sm w-full absolute h-auto max-h-80 overflow-auto"
                    >
                        <ul>
                            <li
                                v-for="movie in movies"
                                :key="movie.id"
                                class="hover:bg-gray-600 px-4 py-2 cursor-pointer"
                                @click="selectMovie(movie)"
                            >
                                {{ movie.title }}
                            </li>
                        </ul>
                    </div>
                    <FieldError
                        class="flex justify-start items-start w-full mt-2"
                        v-if="errors.movie"
                        :message="errors.movie"
                    />
                </div>

                <BaseButton type="submit" class="text-center w-full">Post</BaseButton>
            </div>
        </FormSection>
    </ModalLayout>
</template>

<script>
import ModalLayout from '@/components/layouts/ModalLayout.vue';
import StudioCameraIcon from '@/components/icons/sidebar/StudioCameraIcon.vue';
import BaseButton from '@/components/ui/buttons/BaseButton.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import FormHeader from '@/components/modals/dashboard-form/FormHeader.vue';
import FieldError from '@/components/ui/form/FieldError.vue';
import ImageUploadSection from '@/components/ui/form/ImageUploadSection.vue';
import { Form as FormSection } from 'vee-validate';
import { mapState } from 'pinia';
import { useAuthStore } from '@/stores/user/auth.js';
import { axios } from '@/configs/axios/index.js';

export default {
    name: 'CreateNewQuoteFormModal',
    components: {
        ArrowIcon,
        StudioCameraIcon,
        FormSection,
        ModalLayout,
        BaseButton,
        FormHeader,
        FieldError,
        ImageUploadSection,
    },

    emits: ['update:modelValue', 'quote-created'],

    data() {
        return {
            isOpenDropdown: false,
            movies: [],
            selectedMovie: null,
            errors: {},
            quote: '',
            image: null,
        };
    },

    mounted() {
        this.fetchMovies();
    },

    computed: {
        ...mapState(useAuthStore, ['user']),
    },

    props: {
        modelValue: Boolean,
    },

    methods: {
        toggleModal() {
            this.$emit('update:modelValue', !this.modelValue);
        },

        toggleDropdown() {
            this.isOpenDropdown = !this.isOpenDropdown;
        },

        handleImageChange(event) {
            this.image = event.target.files[0] || null;
        },

        async createQuote() {
            this.errors = {};

            if (this.selectedMovie === null) {
                this.errors.movie = 'Please select a movie';
                return;
            }

            try {
                const formData = new FormData();
                formData.append('description', this.quote);
                formData.append('image', this.image);

                const response = await axios.post(
                    `/movies/${this.selectedMovie.id}/quotes`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                );

                if (response.status === 200) {
                    this.$emit('update:modelValue', false);
                    this.$emit('quote-created');
                    this.$router.push({ name: 'news-feed' });
                }
            } catch (error) {
                const response = error.response;

                if (response.status === 422) {
                    const errors = response.data.errors;

                    Object.keys(errors).forEach((key) => {
                        this.errors[key] = errors[key][0];
                    });
                }
            }
        },

        selectMovie(movie) {
            if (this.selectedMovie === movie) {
                this.selectedMovie = null;
                this.isOpenDropdown = false;
            } else {
                this.selectedMovie = movie;
                this.isOpenDropdown = false;
            }
        },

        async fetchMovies() {
            try {
                const response = await axios.get('/movies/all');

                if (response.status === 200) {
                    this.movies = response.data.movies || [];
                }
            } catch (error) {
                const response = error.response;

                if (response.status === 401) {
                    alert(response.data.message);
                    this.$router.push({ name: 'login' });
                } else {
                    alert(response.data.message);
                    this.$router.push({ name: 'news-feed' });
                }
            }
        },
    },

    watch: {
        modelValue(newVal) {
            if (newVal) {
                document.body.classList.add('overflow-hidden');
            } else {
                document.body.classList.remove('overflow-hidden');
            }
        },
    },
};
</script>
