<template>
    <ModalLayout @click="closeModal">
        <SuccessMessageInfo
            @switchModal="switchModal"
            title="Thank you!"
            description="Please check your email and follow the instructions to activate your account."
            :link="{ name: 'login' }"
            button-text="Login"
        >
            <SendEmailIcon />
        </SuccessMessageInfo>
    </ModalLayout>
</template>

<script>
import ModalLayout from '@/components/layouts/ModalLayout.vue';
import SendEmailIcon from '@/components/icons/modal/SendEmailIcon.vue';
import SuccessMessageInfo from '@/components/ui/SuccessMessageInfo.vue';

export default {
    name: 'EmailSentModal',

    components: { SuccessMessageInfo, SendEmailIcon, ModalLayout },

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
