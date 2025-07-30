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
import { axios } from '@/configs/axios/index.js';

export default {
    name: 'EmailVerifiedModal',
    components: { EmailVerifiedIcon, ModalLayout, SuccessMessageInfo },

    props: {
        modelValue: Boolean,
    },

    mounted() {
        if (this.$route.path === '/verify') {
            const expires = this.$route.query.expires;
            const userId = this.$route.query.user;
            const signature = this.$route.query.signature;

            this.verifyUser(expires, userId, signature);
        }
    },

    methods: {
        async verifyUser(expires, userId, signature) {
            console.log(expires, userId, signature);
            try {
                const response = await axios.get('/verify', {
                    params: {
                        expires: expires,
                        user: userId,
                        signature: signature,
                    },
                });

                if (response.status === 200) {
                    this.$emit('update:modelValue', true);
                }
            } catch (error) {
                // TODO: Open linked expired modal
                console.log(error);
            }
        },

        closeModal() {
            this.$emit('update:modelValue', !this.modelValue);
        },

        switchModal(route) {
            this.$emit('switchModal', route.name);
        },
    },
};
</script>
