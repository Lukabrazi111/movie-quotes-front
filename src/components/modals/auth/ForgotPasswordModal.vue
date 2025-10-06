<template>
    <ModalLayout @click="closeModal">
        <FormSection @submit="forgotPasswordEmailSend" novalidate class="w-full px-10 md:px-20">
            <FormTitleModal
                title="Forgot password?"
                description="Enter the email and we’ll send an email with instructions to reset your password"
            />

            <div class="space-y-0.5">
                <CustomInput
                    v-model="email"
                    :required="false"
                    rules="required|email"
                    name="forgot_password_email"
                    labelName="email"
                    type="text"
                    placeholder="Enter your email"
                />
                <ErrorMessage class="text-red-400" name="forgot_password_email" />
                <FieldError v-if="this.errors?.email" :message="this.errors?.email" />
            </div>

            <div class="space-y-4 mt-7 mb-7">
                <BaseButton class="w-full">Send instruction</BaseButton>
            </div>

            <button class="flex items-center justify-center space-x-4 mx-auto">
                <ArrowLeft />
                <span class="text-gray-500" @click.prevent="this.$emit('switchLoginModal')">
                    Back to login
                </span>
            </button>
        </FormSection>
    </ModalLayout>
</template>

<script>
import BaseButton from '@/components/ui/buttons/BaseButton.vue';
import CustomInput from '@/components/ui/form/CustomInput.vue';
import FormTitleModal from '@/components/ui/form/FormTitleModal.vue';
import AuthModalLayout from '@/components/layouts/AuthModalLayout.vue';
import ArrowLeft from '@/components/icons/modal/ArrowLeftIcon.vue';
import FieldError from '@/components/ui/form/FieldError.vue';
import { axios } from '@/configs/axios/index.js';
import { ErrorMessage, Form as FormSection } from 'vee-validate';

export default {
    name: 'ResetPasswordModal',
    components: {
        FieldError,
        ErrorMessage,
        ArrowLeft,
        ModalLayout: AuthModalLayout,
        FormTitleModal,
        CustomInput,
        BaseButton,
        FormSection,
    },

    data() {
        return {
            email: '',
            errors: {},
        };
    },

    methods: {
        closeModal() {
            return this.$emit('update:modelValue', false);
        },

        closeModalWithSuccess() {
            this.closeModal();
            this.$emit('emailSentModal', true);
        },

        async forgotPasswordEmailSend() {
            try {
                const response = await axios.post('/forgot-password', {
                    email: this.email,
                });

                if (response.status === 200) {
                    this.email = '';
                    this.closeModalWithSuccess();
                }
            } catch (error) {
                const response = error.response;

                if (response.status === 404) {
                    this.errors.email = response.data?.message;
                }
            }
        },
    },

    watch: {
        email(value, oldValue) {
            if (value === '' || value !== oldValue) {
                this.errors = {};
            }
        },
    },
};
</script>
