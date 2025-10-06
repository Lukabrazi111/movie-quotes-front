<template>
    <AuthModalLayout @click="toggleModal">
        <FormSection @submit="login" novalidate class="w-full px-10 md:px-20">
            <FormTitleModal
                title="Log in to your account"
                description="Welcome back! Please enter your details."
            />

            <div class="space-y-5">
                <div class="space-y-0.5">
                    <CustomInput
                        v-model="email"
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
                        v-model="password"
                        :required="false"
                        rules="required"
                        name="login_password"
                        labelName="password"
                        type="password"
                        placeholder="Password"
                    />
                    <!-- Backend error -->
                    <FieldError v-if="errorMessage" :message="errorMessage" />
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
        </FormSection>
    </AuthModalLayout>
</template>

<script>
import AuthModalLayout from '@/components/layouts/AuthModalLayout.vue';
import FormTitleModal from '@/components/ui/form/FormTitleModal.vue';
import GoogleIcon from '@/components/icons/modal/form/GoogleIcon.vue';
import BaseButton from '@/components/ui/buttons/BaseButton.vue';
import CustomInput from '@/components/ui/form/CustomInput.vue';
import SecondaryButton from '@/components/ui/buttons/SecondaryButton.vue';
import FormFooterModal from '@/components/ui/form/FormFooterModal.vue';
import PasswordInput from '@/components/ui/form/PasswordInput.vue';
import { ErrorMessage, Form as FormSection } from 'vee-validate';
import { axios } from '@/configs/axios/index.js';
import { useAuthStore } from '@/stores/user/auth.js';
import { mapStores } from 'pinia';
import FieldError from '@/components/ui/form/FieldError.vue';

export default {
    name: 'LoginModal',

    components: {
        FieldError,
        PasswordInput,
        FormFooterModal,
        SecondaryButton,
        CustomInput,
        BaseButton,
        GoogleIcon,
        AuthModalLayout,
        FormTitleModal,
        ErrorMessage,
        FormSection,
    },

    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
        };
    },

    computed: {
        ...mapStores(useAuthStore),
    },

    props: {
        modelValue: Boolean,
        visibleForgotPasswordModal: Boolean,
    },

    methods: {
        async login() {
            try {
                const response = await axios.post('/login', {
                    email: this.email,
                    password: this.password,
                });

                if (response.status === 200) {
                    const token = response.data.token;
                    const user = response.data.user;

                    this.authStore.setUser(user);
                    this.authStore.setToken(token);

                    this.clearFields();

                    this.$router.push({ name: 'news-feed' });
                }
            } catch (error) {
                const response = error.response;

                if (response?.status === 401) {
                    this.errorMessage = response.data?.message;
                }
            }
        },

        clearFields() {
            this.email = '';
            this.password = '';
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
