<template>
    <ModalFormLayout @click="toggleModal">
        <FormTitleModal
            title="Forgot password?"
            description="Enter the email and we’ll send an email with instructions to reset your password"
        />

        <div class="space-y-5">
            <CustomInput
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
            <span class="text-gray-600" @click.prevent="this.$emit('switch-to-login-modal')"
                >Back to login</span
            >
        </button>
    </ModalFormLayout>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';
import CustomInput from '@/components/ui/form/CustomInput.vue';
import FormTitleModal from '@/components/ui/form/FormTitleModal.vue';
import ModalFormLayout from '@/components/layouts/ModalFormLayout.vue';
import ArrowLeft from '@/components/icons/modalForms/ArrowLeftIcon.vue';

export default {
    name: 'ResetPasswordModal',
    components: {
        ArrowLeft,
        ModalFormLayout,
        FormTitleModal,
        CustomInput,
        BaseButton,
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
