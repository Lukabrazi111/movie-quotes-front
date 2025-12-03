<template>
    <ModalLayout @click="closeModal">
        <FormHeader @closeDropdown="closeModal" title="Add Movie" />

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
                <ImageUploadSection v-model:image="thumbnail" />
                <FieldError
                    class="flex justify-start items-start w-full"
                    v-if="errors.thumbnail"
                    :message="errors.thumbnail"
                />

                <BaseButton type="button" class="text-center w-full" @click="createMovie">
                    Create movie
                </BaseButton>
            </div>
        </FormSection>
    </ModalLayout>
</template>

<script>
import FormHeader from '@/components/modals/dashboard-form/FormHeader.vue';
import ModalLayout from '@/components/layouts/ModalLayout.vue';
import BaseButton from '@/components/ui/buttons/BaseButton.vue';
import TagCloseIcon from '@/components/icons/modal/form/TagCloseIcon.vue';
import ImageUploadSection from '@/components/movies/ImageUploadSection.vue';
import FieldError from '@/components/ui/form/FieldError.vue';
import { axios } from '@/configs/axios/index.js';
import { Form as FormSection } from 'vee-validate';

export default {
    name: 'CreateMovieModal',
    components: {
        ImageUploadSection,
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
            errors: {},
        };
    },

    props: {
        modelValue: Boolean,
    },

    async created() {
        await this.fetchGenres();
    },

    methods: {
        async createMovie() {
            this.errors = {};
            try {
                const formData = new FormData();
                formData.append('title', this.title);
                formData.append('release_year', this.releaseYear);
                formData.append('director', this.director);
                formData.append('description', this.description);
                formData.append('thumbnail', this.thumbnail);

                if (this.tags.length > 0) {
                    this.tags.forEach((tag) => {
                        formData.append('genres[]', tag);
                    });
                }

                if (this.thumbnail) {
                    formData.append('thumbnail', this.thumbnail);
                }

                const response = await axios.post('/movies', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200) {
                    this.closeModal();
                }
            } catch (error) {
                const response = error.response;

                if (response.status === 422) {
                    const errors = response.data?.errors || {};
                    Object.keys(errors).forEach((key) => {
                        this.errors[key] = Array.isArray(errors[key])
                            ? errors[key][0]
                            : errors[key];
                    });
                } else {
                    alert(response?.data?.message || 'An error occurred while creating the movie');
                }
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
                console.error('Error fetching tags:', error);
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

        closeModal() {
            return this.$emit('update:modelValue', false);
        },
    },

    watch: {
        modelValue(newVal) {
            if (newVal === true) {
                document.body.classList.add('overflow-hidden');
            } else {
                document.body.classList.remove('overflow-hidden');
            }
        },
        tagName(newVal) {
            if (newVal.includes(',')) {
                this.tagName = newVal.replace(',', '');
                this.addTag();
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
};
</script>
