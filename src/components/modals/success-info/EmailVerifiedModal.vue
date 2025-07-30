<template>
    <ModalLayout @click="closeModal">
        <SuccessMessageInfo
            @switchModal="switchModal"
            title="Thank you!"
            description="Please check your email and follow the instructions to activate your account."
            :link="{ value: 'https://mail.google.com' }"
            buttonText="Go to my email"
        >
            <SendEmailIcon />
        </SuccessMessageInfo>
    </ModalLayout>
</template>

<script>
import SendEmailIcon from '@/components/icons/modal/SendEmailIcon.vue';
import SuccessMessageInfo from '@/components/ui/SuccessMessageInfo.vue';
import ModalLayout from '@/components/layouts/ModalLayout.vue';

export default {
    name: 'EmailVerifiedModal',
    components: { ModalLayout, SuccessMessageInfo, SendEmailIcon },

    props: {
        modelValue: Boolean,
    },

    methods: {
        closeModal() {
            this.$emit('update:modelValue', !this.modelValue);
        },

        switchModal(route) {
            this.$emit('switchModal', route.name);
        },
    },
};
</script>
