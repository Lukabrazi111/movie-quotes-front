<template>
    <ModalFormLayout @submit="login" @click="toggleModal">
        <FormTitleModal
            title="Log in to your account"
            description="Welcome back! Please enter your details."
        />

        <div class="space-y-5">
            <div class="space-y-0.5">
                <CustomInput
                    :required="false"
                    rules="required"
                    name="login_email"
                    labelName="email"
                    type="text"
                    placeholder="Enter your email or username"
                />
                <ErrorMessage class="text-red-400" name="login_email" />
            </div>

            <div class="space-y-0.5">
                <PasswordInput
                    :required="false"
                    rules="required"
                    name="login_password"
                    labelName="password"
                    type="password"
                    placeholder="Password"
                />
            </div>
        </div>

        <div class="mt-3 flex items-center justify-between">
            <div class="flex items-center space-x-3 text-white">
                <input type="checkbox" name="remember_me" id="remember_me" />
                <label for="remember_me">Remember me</label>
            </div>

            <button
                type="button"
                @click="$emit('switchResetPasswordModal')"
                class="text-blue-500 underline"
            >
                Forgot password
            </button>
        </div>

        <div class="space-y-4 mt-3">
            <BaseButton type="submit" class="w-full">Sign in</BaseButton>
            <SecondaryButton
                class="flex items-center justify-center space-x-4 mx-auto w-full text-white"
            >
                <div>
                    <GoogleIcon />
                </div>
                <span>Sign in with Google</span>
            </SecondaryButton>
        </div>

        <FormFooterModal
            @switchModal="switchModal"
            linkText="Sign up"
            :link="{ name: 'register' }"
            text="You don't have an account?"
        />
    </ModalFormLayout>
</template>

<script>
import ModalFormLayout from '@/components/layouts/ModalFormLayout.vue';
import FormTitleModal from '@/components/ui/form/FormTitleModal.vue';
import GoogleIcon from '@/components/icons/modalForms/GoogleIcon.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import CustomInput from '@/components/ui/form/CustomInput.vue';
import SecondaryButton from '@/components/ui/SecondaryButton.vue';
import FormFooterModal from '@/components/ui/form/FormFooterModal.vue';
import PasswordInput from '@/components/ui/form/PasswordInput.vue';
import { ErrorMessage } from 'vee-validate';

export default {
    name: 'LoginModal',

    components: {
        PasswordInput,
        FormFooterModal,
        SecondaryButton,
        CustomInput,
        BaseButton,
        GoogleIcon,
        ModalFormLayout,
        FormTitleModal,
        ErrorMessage,
    },

    props: {
        modelValue: Boolean,
        visibleResetPasswordModal: Boolean,
    },

    methods: {
        login() {
            console.log('login');
        },

        toggleModal() {
            this.$emit('update:modelValue', !this.modelValue);
        },
        switchModal(route) {
            this.$emit('switchModal', route.name);
        },
    },
};
</script>
