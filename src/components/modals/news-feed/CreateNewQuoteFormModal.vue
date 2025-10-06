<template>
    <ModalLayout @click="toggleModal">
        <header class="text-center border-b border-gray-600 pb-3 relative px-5">
            <h1 class="text-white font-bold! text-lg">Write New Quote</h1>
            <CloseFormIcon class="text-right absolute -top-1.5 right-3 cursor-pointer" />
        </header>
        <FormSection @submit="createQuote" novalidate class="w-full text-white">
            <div class="px-5 space-y-5 mt-5">
                <div class="flex items-center space-x-3">
                    <img
                        class="w-10 rounded-full bg-center bg-cover"
                        src="/public/images/profile/no-profile-picture.jpg"
                        alt="profile picture"
                    />
                    <h3>Luka Khangoshvili</h3>
                </div>
                <div class="flex flex-col items-center">
                    <div class="w-full relative">
                        <textarea
                            name="quote"
                            id="quote"
                            cols="30"
                            rows="2"
                            class="w-full border-[#6C757D] border px-2 py-1 outline-none placeholder:italic"
                            placeholder="Start create new quote..."
                        />
                        <span class="absolute top-2.5 right-4">Eng</span>
                    </div>
                    <div class="w-full relative">
                        <textarea
                            name="quote"
                            id="quote"
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

                <div class="px-3 py-4 cursor-pointer flex items-center justify-between bg-black">
                    <div class="flex items-center space-x-4">
                        <StudioCameraIcon color="white" />
                        <span>Choose movie</span>
                    </div>
                    <ArrowIcon :isOpenDropdown="isOpenDropdown" />
                </div>

                <BaseButton class="text-center w-full">Post</BaseButton>
            </div>
        </FormSection>
    </ModalLayout>
</template>

<script>
import ModalLayout from '@/components/layouts/ModalLayout.vue';
import { Form as FormSection } from 'vee-validate';
import CloseFormIcon from '@/components/icons/news-feed/CloseFormIcon.vue';
import CameraIcon from '@/components/icons/news-feed/CameraIcon.vue';
import StudioCameraIcon from '@/components/icons/sidebar/StudioCameraIcon.vue';
import BaseButton from '@/components/ui/buttons/BaseButton.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';

export default {
    name: 'CreateNewQuoteFormModal',
    components: {
        ArrowIcon,
        StudioCameraIcon,
        CameraIcon,
        CloseFormIcon,
        FormSection,
        ModalLayout,
        BaseButton,
    },

    data() {
        return {
            isOpenDropdown: false,
        };
    },

    props: {
        modelValue: Boolean,
    },

    methods: {
        toggleModal() {
            return this.$emit('update:modelValue', !this.modelValue);
        },

        createQuote() {
            console.log('Create quote');
        },
    },
};
</script>
