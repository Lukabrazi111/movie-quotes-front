<template>
    <ModalFormLayout @click="toggleModal">
        <FormTitleModal
            title="Log in to your account"
            description="Welcome back! Please enter your details."
        />

        <div class="space-y-5">
            <CustomInput
                :required="false"
                name="login_email"
                labelName="email"
                type="text"
                placeholder="Enter your email"
            />

            <PasswordInput
                :required="false"
                name="login_password"
                labelName="password"
                type="password"
                placeholder="Password"
            />
        </div>

        <div class="mt-3 flex items-center justify-between">
            <div class="flex items-center space-x-3 text-white">
                <input type="checkbox" name="remember_me" id="remember_me" />
                <label for="remember_me">Remember me</label>
            </div>

            <router-link to="/" class="text-blue-500 underline">Forgot password</router-link>
        </div>

        <div class="space-y-4 mt-3">
            <BaseButton class="w-full">Sign in</BaseButton>
            <SecondaryButton
                class="flex items-center justify-center space-x-4 mx-auto w-full text-white"
            >
                <div>
                    <GoogleIcon />
                </div>
                <span>Sign in with Google</span>
            </SecondaryButton>
        </div>

        <!--  Need to change link -->
        <FormFooterModal linkText="Sign up" link="/register" text="You don't have an account?" />
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
    },

    props: {
        modelValue: Boolean,
    },

    methods: {
        toggleModal() {
            if (this.modelValue) {
                this.$router.push({ name: 'register' });
            }

            return this.$emit('update:modelValue', !this.modelValue);
        },
    },
};
</script>
