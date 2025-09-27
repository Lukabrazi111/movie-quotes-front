<template>
    <ModalLayout>
        <FormSection @submit="resetPassword" novalidate class="w-full px-10 md:px-20">
            <FormTitleModal
                title="Create new password"
                description="Your new password must be different from previous used passwords"
            />

            <div class="space-y-5">
                <div class="space-y-0.5">
                    <PasswordInput
                        v-model="data.password"
                        rules="required"
                        name="reset_password"
                        labelName="password"
                        type="password"
                        placeholder="Confirm password"
                    />
                    <ErrorMessage class="text-red-400" name="reset_password" />
                </div>
                <FieldError v-if="this.errors?.password" :message="this.errors?.password" />

                <div class="space-y-0.5">
                    <PasswordInput
                        v-model="data.password_confirmation"
                        rules="required|confirmed:@reset_password"
                        name="reset_password_confirmation"
                        labelName="password confirmation"
                        type="password"
                        placeholder="Confirm password"
                    />
                    <ErrorMessage class="text-red-400" name="reset_password_confirmation" />
                </div>
                <FieldError v-if="this.errors?.email" :message="this.errors?.email" />
            </div>

            <div class="space-y-4 mt-7 mb-7">
                <BaseButton class="w-full">Reset password</BaseButton>
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
import ModalLayout from '@/components/layouts/ModalLayout.vue';
import FormTitleModal from '@/components/ui/form/FormTitleModal.vue';
import BaseButton from '@/components/ui/buttons/BaseButton.vue';
import ArrowLeft from '@/components/icons/modal/ArrowLeftIcon.vue';
import FieldError from '@/components/ui/form/FieldError.vue';
import PasswordInput from '@/components/ui/form/PasswordInput.vue';
import { ErrorMessage, Form as FormSection } from 'vee-validate';
import { axios } from '@/configs/axios/index.js';

export default {
    name: 'ResetPasswordModal',
    components: {
        PasswordInput,
        FieldError,
        ArrowLeft,
        BaseButton,
        FormTitleModal,
        ModalLayout,
        FormSection,
        ErrorMessage,
    },

    props: {
        modelValue: Boolean,
    },

    data() {
        return {
            data: {
                password: '',
                password_confirmation: '',
            },
            queryParams: {},
            errors: {},
        };
    },

    mounted() {
        if (this.$route.path === '/reset-password') {
            this.queryParams = {
                expires: this.$route.query.expires,
                user: this.$route.query.user,
                signature: this.$route.query.signature,
                token: this.$route.query.token,
            };
        }
    },

    methods: {
        closeModal() {
            return this.$emit('update:modelValue', false);
        },

        async resetPassword() {
            try {
                const response = await axios.post('/reset-password', this.data, {
                    params: this.queryParams,
                });

                console.log(response);
            } catch (error) {
                const response = error.response;
                console.log(response);
            }
        },
    },
};
</script>
