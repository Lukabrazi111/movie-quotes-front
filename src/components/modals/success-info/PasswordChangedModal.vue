<template>
    <ModalLayout @click="closeModal">
        <SuccessMessageInfo
            @switchModal="switchModal"
            title="Success!"
            description="Your Password changed successfully"
            :link="{ value: 'login' }"
            buttonText="Log in"
        >
            <SuccessIcon />
        </SuccessMessageInfo>
    </ModalLayout>
</template>

<script>
import ModalLayout from '@/components/layouts/ModalLayout.vue';
import SuccessMessageInfo from '@/components/ui/modal/SuccessMessageInfo.vue';
import SuccessIcon from '@/components/icons/modal/SuccessIcon.vue';

export default {
    name: 'PasswordChangedModal',

    components: { SuccessIcon, SuccessMessageInfo, ModalLayout },

    methods: {
        closeModal() {
            this.$emit('update:modelValue', false);
        },

        switchModal(route) {
            this.$emit('switchModal', route.name);
        },
    },
};
</script>
