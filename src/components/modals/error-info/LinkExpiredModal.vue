<template>
    <ModalLayout @click="closeModal">
        <ErrorMessageInfo
            @sendVerificationLink="sendVerificationLink"
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
import { axios } from '@/configs/axios/index.js';

export default {
    name: 'LinkExpiredModal',
    components: { ErrorMessageInfo, LinkExpiredIcon, ModalLayout },

    props: {
        modelValue: Boolean,
    },

    data() {
        return {
            userId: '',
        };
    },

    mounted() {
        if (this.$route.path === '/verify' && this.$route.query.user) {
            this.userId = this.$route.query.user;
        }
    },

    methods: {
        async sendVerificationLink() {
            try {
                const response = await axios.post(`/resend-link/${this.userId}`);

                if(response.status === 200) {
                    this.openEmailSentModal();
                }
            } catch (error) {
                const response = error.response;

                // TODO: need to change to dialog notifications
                if(response.status === 409) {
                    alert(response.data.message);
                }

                if (response.status === 404) {
                    alert(response.data.message);
                }
            }
        },

        closeModal() {
            this.$emit('update:modelValue', !this.modelValue);
        },

        openEmailSentModal() {
            this.closeModal();
            this.$emit('switchEmailSentModal');
        },
    },
};
</script>
