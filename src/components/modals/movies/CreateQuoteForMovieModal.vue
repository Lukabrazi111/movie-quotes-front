<template>
    <ModalLayout @click="toggleModal">
        <FormHeader @closeDropdown="this.$emit('update:modelValue', false)" title="Add Quote" />

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

                <!-- Need to add spacific movie details -->
                <div>
                    <h1>MOVIE DETAILS</h1>
                </div>

                <div class="flex flex-col items-center">
                    <div class="w-full relative">
                        <textarea
                            name="quote_eng"
                            id="quote_eng"
                            cols="30"
                            rows="2"
                            class="w-full border-[#6C757D] border px-2 py-1 outline-none placeholder:italic"
                            placeholder="Start create new quote..."
                        />
                        <span class="absolute top-2.5 right-4">Eng</span>
                    </div>
                    <div class="w-full relative">
                        <textarea
                            name="quote_geo"
                            id="quote_geo"
                            cols="30"
                            rows="2"
                            class="w-full border-[#6C757D] border px-2 py-1 outline-none placeholder:italic"
                            placeholder="Start create new quote..."
                        />
                        <span class="absolute top-2.5 right-4">ქარ</span>
                    </div>
                </div>
                <div class="border px-3 py-4 border-[#6C757D]">
                    <div class="flex justify-start items-center space-x-4">
                        <CameraIcon />
                        <span>Drag & drop your image here or</span>
                        <label
                            for="quote_image"
                            type="button"
                            class="bg-[#9747FF66] px-2 py-1 rounded cursor-pointer"
                        >
                            <input type="file" id="quote_image" class="hidden" />
                            Choose file
                        </label>
                    </div>
                </div>
                <BaseButton type="submit" class="text-center w-full">Add quote</BaseButton>
            </div>
        </FormSection>
    </ModalLayout>
</template>

<script>
import BaseButton from '@/components/ui/buttons/BaseButton.vue';
import CameraIcon from '@/components/icons/news-feed/CameraIcon.vue';
import ModalLayout from '@/components/layouts/ModalLayout.vue';
import FormHeader from '@/components/modals/dashboard-form/FormHeader.vue';
import { Form as FormSection } from 'vee-validate';
import { mapState } from 'pinia';
import { useAuthStore } from '@/stores/user/auth.js';

export default {
    name: 'CreateQuoteForMovieModal',
    components: { FormHeader, ModalLayout, CameraIcon, BaseButton, FormSection },

    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
    },

    computed: {
        ...mapState(useAuthStore, ['user']),
    },

    methods: {
        toggleModal() {
            return this.$emit('update:modelValue', !this.modelValue);
        },

        createQuote() {
            console.log('creating...');
        },
    },
};
</script>
