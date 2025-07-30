<template>
    <ModalLayout @click="toggleModal">
        <FormSection novalidate class="w-full px-10 md:px-20">
            <FormTitleModal
                title="Forgot password?"
                description="Enter the email and we’ll send an email with instructions to reset your password"
            />

            <div class="space-y-5">
                <CustomInput
                    :required="false"
                    name="reset_email"
                    labelName="email"
                    type="text"
                    placeholder="Enter your email"
                />
            </div>

            <div class="space-y-4 mt-7 mb-7">
                <BaseButton class="w-full">Send instruction</BaseButton>
            </div>

            <button class="flex items-center justify-center space-x-4 mx-auto">
                <ArrowLeft />
                <span class="text-gray-500" @click.prevent="this.$emit('switch-to-login-modal')">
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
import ModalLayout from '@/components/layouts/ModalLayout.vue';
import ArrowLeft from '@/components/icons/modal/ArrowLeftIcon.vue';
import { Form as FormSection } from 'vee-validate';

export default {
    name: 'ResetPasswordModal',
    components: {
        ArrowLeft,
        ModalLayout,
        FormTitleModal,
        CustomInput,
        BaseButton,
        FormSection,
    },

    props: {
        modelValue: Boolean,
    },

    methods: {
        toggleModal() {
            return this.$emit('update:modelValue', !this.modelValue);
        },
    },
};
</script>
