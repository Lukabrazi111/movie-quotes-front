<template>
    <ModalLayout @click="toggleModal">
        <FormSection @submit="register" novalidate class="w-full px-10 md:px-20">
            <FormTitleModal title="Create an account" description="Start your journey!" />

            <div class="space-y-5">
                <div class="space-y-0.5">
                    <CustomInput
                        v-model="data.name"
                        rules="required|lowercase|min:3|max:15"
                        name="signup_name"
                        labelName="name"
                        type="text"
                        placeholder="At least 3 & max.15 lower case characters"
                    />
                    <ErrorMessage class="text-red-400" name="signup_name" />
                    <!-- Backend error -->
                    <FieldError
                        v-if="this.errors?.signup_name"
                        :message="this.errors?.signup_name"
                    />
                </div>

                <div class="space-y-0.5">
                    <CustomInput
                        v-model="data.email"
                        rules="required|email"
                        name="signup_email"
                        labelName="email"
                        type="text"
                        placeholder="Enter your email"
                    />
                    <ErrorMessage class="text-red-400" name="signup_email" />
                    <!-- Backend error -->
                    <FieldError
                        v-if="this.errors?.signup_name"
                        :message="this.errors?.signup_email"
                    />
                </div>

                <div class="space-y-0.5">
                    <PasswordInput
                        v-model="data.password"
                        rules="required|lowercase|alpha_num|min:8|max:15"
                        name="signup_password"
                        labelName="password"
                        type="password"
                        placeholder="At least 8 & max.15 lower case characters"
                    />
                    <ErrorMessage class="text-red-400" name="signup_password" />
                </div>

                <div class="space-y-0.5">
                    <PasswordInput
                        v-model="data.password_confirmation"
                        rules="confirmed:@signup_password"
                        name="password_confirmation"
                        labelName="password confirmation"
                        type="password"
                        placeholder="Confirm password"
                    />
                    <ErrorMessage class="text-red-400" name="password_confirmation" />
                </div>
            </div>

            <div class="space-y-4 mt-7">
                <BaseButton type="submit" class="w-full">Get started</BaseButton>
                <SecondaryButton
                    class="flex items-center justify-center space-x-4 mx-auto w-full text-white"
                >
                    <div>
                        <GoogleIcon />
                    </div>
                    <span>Sign up with Google</span>
                </SecondaryButton>
            </div>

            <FormFooterModal
                @switchModal="switchModal"
                :link="{ name: 'login' }"
                linkText="Login"
                text="Already have an account?"
            />
        </FormSection>
    </ModalLayout>
</template>

<script>
import BaseButton from '@/components/ui/buttons/BaseButton.vue';
import SecondaryButton from '@/components/ui/buttons/SecondaryButton.vue';
import GoogleIcon from '@/components/icons/modal/form/GoogleIcon.vue';
import CustomInput from '@/components/ui/form/CustomInput.vue';
import FormTitleModal from '@/components/ui/form/FormTitleModal.vue';
import ModalLayout from '@/components/layouts/ModalLayout.vue';
import FormFooterModal from '@/components/ui/form/FormFooterModal.vue';
import PasswordInput from '@/components/ui/form/PasswordInput.vue';
import FieldError from '@/components/ui/form/FieldError.vue';
import { axios } from '@/configs/axios/index.js';
import { ErrorMessage, Form as FormSection } from 'vee-validate';

export default {
    name: 'SignUpModal',

    components: {
        FieldError,
        PasswordInput,
        FormFooterModal,
        ModalLayout,
        FormTitleModal,
        CustomInput,
        GoogleIcon,
        SecondaryButton,
        BaseButton,
        ErrorMessage,
        FormSection,
    },

    data() {
        return {
            data: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
            errors: {},
        };
    },

    props: {
        modelValue: Boolean,
    },

    methods: {
        async register() {
            try {
                const response = await axios.post('/register', this.data);

                if (response.status === 200) {
                    this.clearAllFields();
                    this.closeModalWithSuccess();
                }
            } catch (error) {
                const response = error.response;

                if (response.status === 422) {
                    const fieldMap = {
                        name: 'signup_name',
                        email: 'signup_email',
                    };

                    const errors = response.data?.errors;

                    for (const [backendField, messages] of Object.entries(errors || {})) {
                        const field = fieldMap[backendField];

                        if (field) {
                            this.errors[field] = messages[0];
                        }
                    }
                }
            }
        },

        toggleModal() {
            return this.$emit('update:modelValue', !this.modelValue);
        },

        clearAllFields() {
            for (const key in this.data) {
                this.data[key] = '';
            }
        },

        switchModal(route) {
            this.$emit('switchModal', route.name);
        },

        closeModalWithSuccess() {
            this.$emit('update:modelValue', false);
            this.$emit('emailSentModal', true);
        },
    },
};
</script>
