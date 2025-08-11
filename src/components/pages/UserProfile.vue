<template>
    <AuthContentLayout>
        <h1 class="text-white font-semibold! text-lg mb-14">Profile</h1>

        <section class="text-white my-20 relative">
            <!-- Form -->
            <UserProfileForm
                :currentUser="this.currentUser"
                :editableUsername="editableUsername"
                :editablePassword="editablePassword"
                @toggleEditableUsername="toggleEditableUsername"
                @toggleEditablePassword="toggleEditablePassword"
                @cancelUpdate="cancelUpdate"
            />
        </section>
    </AuthContentLayout>
</template>
<script>
import AuthContentLayout from '@/components/layouts/AuthContentLayout.vue';
import UserProfileForm from '@/components/user-profile/UserProfileForm.vue';
import { useAuthStore } from '@/stores/user/auth.js';
import { mapState } from 'pinia';

export default {
    name: 'UserProfile',
    components: { AuthContentLayout, UserProfileForm },

    data() {
        return {
            editableUsername: false,
            editablePassword: false,
        };
    },

    computed: {
        ...mapState(useAuthStore, ['currentUser']),
    },

    methods: {
        toggleEditableUsername() {
            this.editableUsername = !this.editableUsername;
        },

        toggleEditablePassword() {
            this.editablePassword = !this.editablePassword;
        },

        cancelUpdate() {
            this.editableUsername = false;
            this.editablePassword = false;
        },
    },
};
</script>
