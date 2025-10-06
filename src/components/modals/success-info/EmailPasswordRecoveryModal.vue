<template>
    <ModalLayout @click="closeModal">
        <SuccessMessageInfo
            @switchModal="switchModal"
            @closeModal="closeModal"
            title="Check your email"
            description="We have sent a password recover instructions to your email"
            :link="{ name: 'login' }"
            button-text="Go to login modal"
            :skip-button="true"
        >
            <EmailSentIcon />
        </SuccessMessageInfo>
    </ModalLayout>
</template>

<script>
import AuthModalLayout from '@/components/layouts/AuthModalLayout.vue';
import SuccessMessageInfo from '@/components/ui/modal/SuccessMessageInfo.vue';
import EmailSentIcon from '@/components/icons/modal/EmailSentIcon.vue';

export default {
    name: 'EmailPasswordRecoveryModal',
    components: { EmailSentIcon, SuccessMessageInfo, ModalLayout: AuthModalLayout },

    methods: {
        closeModal() {
            this.$emit('update:modelValue', false);
        },

        switchModal(route) {
            this.closeModal();
            this.$emit('switchModal', route.name);
        },
    },
};
</script>
