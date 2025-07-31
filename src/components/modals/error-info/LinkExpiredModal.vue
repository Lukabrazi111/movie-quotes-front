<template>
    <ModalLayout @click="closeModal">
        <ErrorMessageInfo
            @sendVerificationLink="sendVerificationLink"
            @openEmailSentModal="openEmailSentModal"
            title="Link Expired!"
            description="Verification link has expired, because you haven't used it"
            :link="{ name: 'landing' }"
            buttonText="Request another link"
        >
            <LinkExpiredIcon />
        </ErrorMessageInfo>
    </ModalLayout>
</template>

<script>
import ModalLayout from '@/components/layouts/ModalLayout.vue';
import LinkExpiredIcon from '@/components/icons/modal/LinkExpiredIcon.vue';
import ErrorMessageInfo from '@/components/ui/modal/ErrorMessageInfo.vue';

export default {
    name: 'LinkExpiredModal',
    components: { ErrorMessageInfo, LinkExpiredIcon, ModalLayout },

    props: {
        modelValue: Boolean,
    },

    methods: {
        sendVerificationLink() {
            console.log('sending verification link...');
        },

        closeModal() {
            this.$emit('update:modelValue', !this.modelValue);
        },

        openEmailSentModal() {
            this.closeModal();
            this.$emit('switchEmailSentModal');
        }
    },
};
</script>
