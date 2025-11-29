<template>
    <ModalLayout @click="toggleModal">
        <FormHeader @closeDropdown="this.$emit('update:modelValue', false)" title="Add Movie" />

        <FormSection novalidate class="w-full text-white">
            <div class="px-5 space-y-5 mt-5">
                <div class="flex flex-col items-center py-1.5">
                    <div class="w-full relative">
                        <textarea name="quote_eng" id="quote_eng" cols="30" rows="2"
                            class="w-full border-[#6C757D] border px-2 py-1 outline-none placeholder:italic"
                            placeholder="Start create new quote..." />
                    </div>
                </div>

                <div class="border border-[#6C757D] flex items-center py-1.5">
                    <ul v-if="this.tags.length > 0" class="flex items-start px-2 space-x-2">
                        <li v-for="tag in tags" :key="tag"
                            class="text-white bg-gray-400 rounded flex items-center space-x-1 px-1 text-nowrap">
                            <span>{{ tag }}</span>
                            <TagCloseIcon class="cursor-pointer" @click="removeTag(tag)" />
                        </li>
                    </ul>
                    <input class="border-none outline-none w-full px-2" type="text" name="tag" id="tag"
                        v-model="tagName" placeholder="Enter tag name..." @keydown.enter.prevent="addTag" />
                </div>

                <div>
                    <input type="text"
                        class="border border-[#6C757D] py-1.5 px-2 outline-none w-full text-white placeholder:italic"
                        placeholder="Year" />
                </div>

                <div class="flex flex-col items-center">
                    <div class="w-full relative">
                        <input type="text"
                            class="border border-[#6C757D] py-1.5 px-2 outline-none w-full text-white placeholder:italic"
                            placeholder="Director" />
                    </div>
                </div>

                <div class="flex flex-col items-center">
                    <div class="w-full relative">
                        <textarea name="description_eng" id="description_eng" cols="30" rows="2"
                            class="w-full border-[#6C757D] border px-2 py-1 outline-none placeholder:italic"
                            placeholder="Movie description" />
                    </div>
                </div>

                <div class="border px-3 py-4 border-[#6C757D]">
                    <div class="flex justify-start items-center space-x-4">
                        <CameraIcon />
                        <span>Drag & drop your image here or</span>
                        <label for="quote_image" type="button" class="bg-[#9747FF66] px-2 py-1 rounded cursor-pointer">
                            <input type="file" id="quote_image" class="hidden" />
                            Choose file
                        </label>
                    </div>
                </div>

                <BaseButton type="button" class="text-center w-full" @click="createMovie">Add movie
                </BaseButton>
            </div>
        </FormSection>
    </ModalLayout>
</template>

<script>
import FormHeader from '@/components/modals/dashboard-form/FormHeader.vue';
import ModalLayout from '@/components/layouts/ModalLayout.vue';
import BaseButton from '@/components/ui/buttons/BaseButton.vue';
import { Form as FormSection } from 'vee-validate';
import TagCloseIcon from '@/components/icons/modal/form/TagCloseIcon.vue';
import CameraIcon from '@/components/icons/news-feed/CameraIcon.vue';

export default {
    name: 'CreateMovieModal',
    components: { CameraIcon, BaseButton, ModalLayout, FormHeader, FormSection, TagCloseIcon },

    data() {
        return {
            tagName: '',
            tags: [],
        };
    },

    props: {
        modelValue: Boolean,
    },

    methods: {
        addTag() {
            if (this.tagName.trim() === '') return;

            if (this.tagName.length >= 15) {
                alert('tag name is too long, max 15 characters');
                return;
            }

            if (this.tags.length >= 5) {
                this.tagName = '';
                alert('you can not add more tag');
                return;
            }

            if (this.tags.includes(this.tagName)) {
                this.tagName = '';
                alert('tag already exists');
                return;
            }

            this.tags.push(this.tagName);
            this.tagName = '';
        },

        removeTag(tag) {
            this.tags = this.tags.filter(t => t !== tag);
        },

        createMovie() {
            console.log('create movie action');
        },

        toggleModal() {
            return this.$emit('update:modelValue', !this.modelValue);
        },
    },

    watch: {
        tagName(newVal) {
            if (newVal.includes(',')) {
                this.tagName = newVal.replace(',', '');
                this.addTag();
            }
        }
    }
};
</script>
