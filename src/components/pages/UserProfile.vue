<template>
    <AuthContentLayout>
        <h1 class="text-white font-semibold! text-lg mb-14">Profile</h1>

        <section class="text-white bg-content-dark">
            <!-- Image -->
            <div class="flex flex-col items-center justify-center">
                <img
                    src="/src/assets/images/person.jpg"
                    alt="user-profile"
                    class="w-full max-w-44 h-44 rounded-full object-cover -translate-y-5/12"
                />
                <span class="-translate-y-5/12">Upload new photo</span>
            </div>

            <!-- Form -->
            <UserProfileForm />
        </section>

        <div class="flex items-center space-x-8 justify-end mt-10">
            <button class="text-gray-main hover:text-white transition-colors">Cancel</button>
            <BaseButton>Save Changes</BaseButton>
        </div>
    </AuthContentLayout>
</template>
<script>
import AuthContentLayout from '@/components/layouts/AuthContentLayout.vue';
import UserProfileForm from '@/components/user-profile/UserProfileForm.vue';
import BaseButton from '@/components/ui/buttons/BaseButton.vue';

export default {
    name: 'UserProfile',
    components: { BaseButton, AuthContentLayout, UserProfileForm },
};
</script>
