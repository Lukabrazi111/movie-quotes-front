<template>
    <ModalFormLayout @click="toggleModal">
        <FormTitleModal title="Create an account" description="Start your journey!" />

        <div class="space-y-5">
            <CustomInput
                name="name"
                labelName="name"
                type="text"
                placeholder="At least 3 & max.15 lower case characters"
            />

            <CustomInput
                name="signup_email"
                labelName="email"
                type="text"
                placeholder="Enter your email"
            />

            <CustomInput
                name="signup_password"
                labelName="password"
                type="password"
                placeholder="At least 8 & max.15 lower case characters"
            />

            <CustomInput
                name="password_confirmation"
                labelName="confirm password"
                type="password"
                placeholder="Confirm password"
            />
        </div>

        <div class="space-y-4 mt-7">
            <BaseButton class="w-full">Get started</BaseButton>
            <SecondaryButton
                class="flex items-center justify-center space-x-4 mx-auto w-full text-white"
            >
                <div>
                    <GoogleIcon />
                </div>
                <span>Sign up with Google</span>
            </SecondaryButton>
        </div>

        <!-- Need to change link -->
        <FormFooterModal linkText="Login" link="/" text="Already have an account?" />
    </ModalFormLayout>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';
import SecondaryButton from '@/components/ui/SecondaryButton.vue';
import GoogleIcon from '@/components/icons/GoogleIcon.vue';
import CustomInput from '@/components/ui/form/CustomInput.vue';
import FormTitleModal from '@/components/ui/form/FormTitleModal.vue';
import ModalFormLayout from '@/components/layouts/ModalFormLayout.vue';
import FormFooterModal from '@/components/ui/form/FormFooterModal.vue';

export default {
    name: 'SignUpModal',
    components: {
        FormFooterModal,
        ModalFormLayout,
        FormTitleModal,
        CustomInput,
        GoogleIcon,
        SecondaryButton,
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
