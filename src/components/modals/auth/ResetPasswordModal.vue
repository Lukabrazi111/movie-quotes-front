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
                        rules="required|lowercase|min:3|max:15"
                        name="reset_password"
                        labelName="password"
                        type="password"
                        placeholder="Confirm password"
                    />
                    <ErrorMessage class="text-red-400" name="reset_password" />
                    <FieldError v-if="this.errors?.password" :message="this.errors?.password" />
                </div>

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

    data() {
        return {
            data: {
                password: '',
                password_confirmation: '',
            },
            token: '',
            errors: {},
        };
    },

    mounted() {
        const urlToken = this.$route.params.token;
        if (urlToken) {
            axios
                .get(`/reset-password/${urlToken}`)
                .then((response) => {
                    if (response.status === 200) {
                        this.token = urlToken;
                        this.$emit('update:modelValue', true);
                    }
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        this.closeModal();
                        alert(error.response.data.message);
                        return this.$router.push({ name: 'landing' });
                    }
                });
        }
    },

    methods: {
        closeModal() {
            return this.$emit('update:modelValue', false);
        },

        async resetPassword() {
            try {
                const response = await axios.post(`/reset-password/${this.token}`, this.data);

                if (response.status === 200) {
                    this.closeModal();
                    this.$emit('passwordChangedModal', true);
                }
            } catch (error) {
                const response = error.response;

                if(response.status === 422 || response.status === 400) {
                    this.errors.password = response.data.message;
                }
            }
        },
    },
};
</script>
