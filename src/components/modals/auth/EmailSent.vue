<template>
    <ModalLayout @click="closeModal">
        <div class="w-full px-10 md:px-20">
            <SendEmailIcon class="mx-auto mb-8" />

            <div class="mb-8 text-center space-y-8">
                <h1 class="text-white text-3xl font-bold!">Check your email</h1>
                <span class="text-white">
                    We have sent a password recover instructions to your email
                </span>
            </div>

            <div class="space-y-4 mt-7 mb-7">
                <a href="https://mail.google.com" target="_blank">
                    <BaseButton class="w-full">Go to my email</BaseButton>
                </a>
            </div>

            <button class="flex items-center justify-center mx-auto">
                <span
                    class="text-gray-500 hover:text-gray-400 transition-colors"
                    @click="closeModal"
                >
                    Skip, I'll confirm later
                </span>
            </button>
        </div>
    </ModalLayout>
</template>

<script>
import ModalLayout from '@/components/layouts/ModalLayout.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import SendEmailIcon from '@/components/icons/modal/SendEmailIcon.vue';

export default {
    name: 'EmailSent',

    components: { SendEmailIcon, BaseButton, ModalLayout },

    props: {
        modelValue: Boolean,
        successMessage: String,
    },

    methods: {
        closeModal() {
            this.$emit('update:modelValue', !this.modelValue);
        },
    },
};
</script>
