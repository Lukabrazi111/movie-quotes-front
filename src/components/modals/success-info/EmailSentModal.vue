<template>
    <ModalLayout @click="closeModal">
        <SuccessMessageInfo
            @switchModal="switchModal"
            title="Thank you!"
            description="Please check your email and follow the instructions to activate your account."
            :link="{ value: 'https://mail.google.com' }"
            buttonText="Go to my email"
        >
            <EmailSentIcon />
        </SuccessMessageInfo>
    </ModalLayout>
</template>

<script>
import AuthModalLayout from '@/components/layouts/AuthModalLayout.vue';
import EmailSentIcon from '@/components/icons/modal/EmailSentIcon.vue';
import SuccessMessageInfo from '@/components/ui/modal/SuccessMessageInfo.vue';

export default {
    name: 'EmailSentModal',

    components: { SuccessMessageInfo, EmailSentIcon, ModalLayout: AuthModalLayout },

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
