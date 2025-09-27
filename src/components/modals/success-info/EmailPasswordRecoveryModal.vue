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
import ModalLayout from '@/components/layouts/ModalLayout.vue';
import SuccessMessageInfo from '@/components/ui/modal/SuccessMessageInfo.vue';
import EmailSentIcon from '@/components/icons/modal/EmailSentIcon.vue';

export default {
    name: 'EmailPasswordRecoveryModal',
    components: { EmailSentIcon, SuccessMessageInfo, ModalLayout },

    props: {
        modelValue: Boolean,
    },

    methods: {
        closeModal() {
            this.$emit('update:modelValue', !this.modelValue);
        },

        switchModal(route) {
            this.$emit('update:modelValue', false);
            this.$emit('switchModal', route.name);
        },
    },
};
</script>
