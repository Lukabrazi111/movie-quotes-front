<template>
    <ModalLayout @click="closeModal">
        <SuccessMessageInfo
            @switchModal="switchModal"
            title="Thank you!"
            description="You account has beed activated."
            :link="{ name: 'login' }"
            buttonText="Login"
        >
            <EmailVerifiedIcon />
        </SuccessMessageInfo>
    </ModalLayout>
</template>

<script>
import SuccessMessageInfo from '@/components/ui/SuccessMessageInfo.vue';
import ModalLayout from '@/components/layouts/ModalLayout.vue';
import EmailVerifiedIcon from '@/components/icons/modal/EmailVerifiedIcon.vue';

export default {
    name: 'EmailVerifiedModal',
    components: { EmailVerifiedIcon, ModalLayout, SuccessMessageInfo },

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
