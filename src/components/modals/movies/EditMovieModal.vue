<template>
    <ModalLayout @click="closeModal">
        <FormHeader @closeDropdown="closeModal" title="Edit Movie" />

        <FormSection novalidate class="w-full text-white">
            <div class="px-5 space-y-5 mt-5">
                <!-- Movie title -->
                <div class="flex flex-col items-center py-1.5">
                    <div class="w-full relative">
                        <input
                            type="text"
                            id="movie_title"
                            v-model="title"
                            class="w-full border-[#6C757D] border px-2 py-1 outline-none placeholder:italic"
                            placeholder="Movie title"
                        />
                    </div>
                    <FieldError
                        class="flex justify-start items-start w-full"
                        v-if="errors.title"
                        :message="errors.title"
                    />
                </div>

                <!-- Genres tags -->
                <div class="border border-[#6C757D] flex items-center py-1.5 relative">
                    <ul v-if="this.tags.length > 0" class="flex items-start px-2 space-x-2">
                        <li
                            v-for="tag in tags"
                            :key="tag"
                            class="text-white bg-gray-400 rounded flex items-center space-x-1 px-1 text-nowrap"
                        >
                            <span>{{ tag }}</span>
                            <TagCloseIcon class="cursor-pointer" @click="removeTag(tag)" />
                        </li>
                    </ul>
                    <input
                        class="border-none outline-none w-full px-2"
                        type="text"
                        name="tag"
                        id="tag"
                        v-model="tagName"
                        @focusin="toggleGenresDropdown"
                        placeholder="Enter tag name..."
                        @keydown.enter.prevent="addTag"
                        autocomplete="off"
                    />
                    <div
                        v-if="isOpenGenresDropdown"
                        class="absolute top-10 left-0 bg-content-dark rounded z-20"
                    >
                        <ul
                            class="flex flex-col max-h-60 overflow-auto"
                            style="scrollbar-width: none"
                        >
                            <li
                                v-for="(genre, index) in genres"
                                :key="genre.id || index"
                                class="px-20 py-2 cursor-pointer rounded hover:bg-gray-800"
                                @click="selectGenre(genre)"
                            >
                                {{ genre.name }}
                            </li>
                        </ul>
                    </div>
                </div>
                <FieldError
                    class="flex justify-start items-start w-full"
                    v-if="errors.genres"
                    :message="errors.genres"
                />

                <!-- Release year -->
                <div>
                    <input
                        type="text"
                        id="release_year"
                        v-model="releaseYear"
                        class="border border-[#6C757D] py-1.5 px-2 outline-none w-full text-white placeholder:italic"
                        placeholder="Year"
                    />
                    <FieldError
                        class="flex justify-start items-start w-full"
                        v-if="errors.release_year"
                        :message="errors.release_year"
                    />
                </div>

                <!-- Director -->
                <div class="flex flex-col items-center">
                    <div class="w-full relative">
                        <input
                            type="text"
                            id="director"
                            v-model="director"
                            class="border border-[#6C757D] py-1.5 px-2 outline-none w-full text-white placeholder:italic"
                            placeholder="Director"
                        />
                    </div>
                    <FieldError
                        class="flex justify-start items-start w-full"
                        v-if="errors.director"
                        :message="errors.director"
                    />
                </div>

                <!-- Description -->
                <div class="flex flex-col items-center">
                    <div class="w-full relative">
                        <textarea
                            name="description"
                            id="description"
                            v-model="description"
                            cols="30"
                            rows="2"
                            class="w-full border-[#6C757D] border px-2 py-1 outline-none placeholder:italic"
                            placeholder="Movie description"
                        />
                    </div>
                    <FieldError
                        class="flex justify-start items-start w-full"
                        v-if="errors.description"
                        :message="errors.description"
                    />
                </div>

                <!-- Image upload with preview -->
                <div class="border px-3 py-4 border-[#6C757D]">
                    <div
                        v-show="!thumbnail && !imagePreview"
                        class="flex justify-start items-center space-x-4"
                    >
                        <CameraIcon />
                        <span>Drag & drop your image here or</span>
                        <label
                            for="movie_image"
                            type="button"
                            class="bg-[#9747FF66] px-2 py-1 rounded cursor-pointer"
                        >
                            <input
                                type="file"
                                id="movie_image"
                                class="hidden"
                                accept="image/*"
                                @change="handleImageUpload"
                            />
                            Choose file
                        </label>
                    </div>

                    <div
                        v-show="thumbnail || imagePreview"
                        class="flex justify-start items-start space-x-4"
                    >
                        <div class="object-cover object-center rounded flex-1">
                            <img
                                :src="imagePreview || thumbnail"
                                alt="movie-image-preview"
                                class="w-full max-w-52 object-cover object-center rounded"
                            />
                        </div>
                        <div
                            class="flex flex-col items-center justify-center my-auto flex-1 space-y-3"
                        >
                            <h1 class="text-cream font-bold text-lg uppercase">Replace image</h1>
                            <div class="flex items-center space-x-2">
                                <CameraIcon />
                                <span>Drag & drop your image here or</span>
                            </div>
                            <label
                                for="movie_image_replace"
                                type="button"
                                class="bg-[#9747FF66] px-2 py-1 rounded cursor-pointer"
                            >
                                <input
                                    type="file"
                                    id="movie_image_replace"
                                    class="hidden"
                                    accept="image/jpeg, image/png, image/jpg"
                                    @change="handleImageUpload"
                                />
                                Choose file
                            </label>
                        </div>
                    </div>
                </div>
                <FieldError
                    class="flex justify-start items-start w-full"
                    v-if="errors.thumbnail"
                    :message="errors.thumbnail"
                />

                <BaseButton type="button" class="text-center w-full" @click="updateMovie">
                    Update movie
                </BaseButton>
            </div>
        </FormSection>
    </ModalLayout>
</template>

<script>
import FormHeader from '@/components/modals/dashboard-form/FormHeader.vue';
import ModalLayout from '@/components/layouts/ModalLayout.vue';
import BaseButton from '@/components/ui/buttons/BaseButton.vue';
import FieldError from '@/components/ui/form/FieldError.vue';
import { Form as FormSection } from 'vee-validate';
import TagCloseIcon from '@/components/icons/modal/form/TagCloseIcon.vue';
import CameraIcon from '@/components/icons/news-feed/CameraIcon.vue';
import { axios } from '@/configs/axios/index.js';

export default {
    name: 'EditMovieModal',
    components: {
        CameraIcon,
        BaseButton,
        ModalLayout,
        FormHeader,
        FormSection,
        TagCloseIcon,
        FieldError,
    },

    data() {
        return {
            title: '',
            tagName: '',
            tags: [],
            genres: [],
            isOpenGenresDropdown: false,
            releaseYear: '',
            director: '',
            description: '',
            thumbnail: null,
            image: null,
            imagePreview: null,
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
            default: () => ({}),
        },
    },

    watch: {
        modelValue(newVal) {
            if (newVal === true) {
                document.body.classList.add('overflow-hidden');
                this.initializeFormData();
            } else {
                document.body.classList.remove('overflow-hidden');
            }
        },
        movie: {
            handler() {
                if (this.modelValue) {
                    this.initializeFormData();
                }
            },
            deep: true,
        },
        tagName(newVal) {
            if (newVal.includes(',')) {
                this.tagName = newVal.replace(',', '');
                this.addTag();
            }
        },
        image(newImage) {
            this.updateImagePreview(newImage);
        },
    },

    async created() {
        await this.fetchGenres();
    },

    mounted() {
        if (this.modelValue === true) {
            document.body.classList.add('overflow-hidden');
            this.initializeFormData();
        }
    },

    beforeUnmount() {
        document.body.classList.remove('overflow-hidden');
        this.cleanupImagePreview();
    },

    methods: {
        closeModal() {
            this.$emit('update:modelValue', false);
        },

        initializeFormData() {
            if (this.movie && Object.keys(this.movie).length > 0) {
                this.title = this.movie.title || '';
                this.releaseYear = this.movie.release_year?.toString() || '';
                this.director = this.movie.director || '';
                this.description = this.movie.description || '';
                this.thumbnail = this.movie.thumbnail || null;
                this.tags = this.movie.genres?.map((genre) => genre.name) || [];
                this.image = null;
                this.imagePreview = null;
                this.errors = {};
            }
        },

        addTag() {
            const trimmedTagName = this.tagName.trim();
            if (trimmedTagName === '') return;

            const validationResult = this.validateTagName(trimmedTagName);
            if (!validationResult.isValid) {
                this.tagName = '';
                alert(validationResult.errorMessage);
                return;
            }

            if (this.checkTagsLength()) {
                this.tagName = '';
                alert('you can not add more tag');
                return;
            }

            if (this.isTagExists(trimmedTagName)) {
                this.tagName = '';
                alert('tag already exists');
                return;
            }

            const genre = this.findGenreByName(trimmedTagName);
            if (!genre) {
                this.tagName = '';
                alert('genre not found');
                return;
            }

            this.tags.push(genre.name);
            this.tagName = '';
        },

        async toggleGenresDropdown() {
            if (!this.isOpenGenresDropdown && this.genres.length === 0) {
                await this.fetchGenres();
            }
            this.isOpenGenresDropdown = !this.isOpenGenresDropdown;
        },

        selectGenre(genre) {
            this.isOpenGenresDropdown = false;

            if (this.checkTagsLength()) {
                alert('you can not add more tag');
                return;
            }

            if (this.isTagExists(genre.name)) {
                alert('tag already exists');
                return;
            }

            this.tags.push(genre.name);
        },

        async fetchGenres() {
            try {
                const response = await axios.get('/genres');

                if (response.status === 200) {
                    this.genres = response.data.genres;
                }
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        },

        validateTagName(tagName) {
            if (tagName.length > 15) {
                return {
                    isValid: false,
                    errorMessage: 'tag name is too long, max 15 characters',
                };
            }

            return { isValid: true };
        },

        isTagExists(tagName) {
            return this.tags.some((tag) => tag.toLowerCase() === tagName.toLowerCase());
        },

        findGenreByName(tagName) {
            return this.genres.find((genre) => genre.name.toLowerCase() === tagName.toLowerCase());
        },

        checkTagsLength() {
            return this.tags.length >= 5;
        },

        removeTag(tag) {
            this.tags = this.tags.filter((t) => t !== tag);
        },

        handleImageUpload(event) {
            const file = event.target.files[0] || null;
            this.image = file;
        },

        updateImagePreview(imageFile) {
            this.cleanupImagePreview();

            if (imageFile && imageFile instanceof File) {
                this.imagePreview = URL.createObjectURL(imageFile);
            } else {
                this.imagePreview = null;
            }
        },

        cleanupImagePreview() {
            if (this.imagePreview) {
                URL.revokeObjectURL(this.imagePreview);
                this.imagePreview = null;
            }
        },

        async updateMovie() {
            this.errors = {};

            try {
                const formData = new FormData();
                formData.append('title', this.title);
                formData.append('release_year', this.releaseYear);
                formData.append('director', this.director);
                formData.append('description', this.description);

                if (this.tags.length > 0) {
                    this.tags.forEach((tag) => {
                        formData.append('genres[]', tag);
                    });
                }

                if (this.image) {
                    formData.append('thumbnail', this.image);
                }

                formData.append('_method', 'PUT');

                const response = await axios.post(`/movies/${this.movie.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200) {
                    this.$emit('movie-updated');
                    this.closeModal();
                    this.clearAllFields();
                }
            } catch (error) {
                const response = error.response;

                if (response?.status === 422) {
                    const errors = response.data?.errors || {};

                    Object.keys(errors).forEach((key) => {
                        this.errors[key] = Array.isArray(errors[key])
                            ? errors[key][0]
                            : errors[key];
                    });
                } else {
                    alert(response?.data?.message || 'Failed to update movie');
                }
            }
        },

        clearAllFields() {
            this.title = '';
            this.tagName = '';
            this.tags = [];
            this.releaseYear = '';
            this.director = '';
            this.description = '';
            this.thumbnail = null;
            this.image = null;
            this.imagePreview = null;
            this.errors = {};
        },
    },
};
</script>
