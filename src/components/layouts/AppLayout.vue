<template>
    <section class="bg-gradient-primary py-6">
        <BaseContainer>
            <div class="flex min-h-screen">
                <aside class="text-white flex flex-col items-start justify-start w-full max-w-sm">
                    <!-- Profile -->
                    <router-link
                        :to="{ name: 'profile' }"
                        class="flex items-center space-x-4 w-full py-1"
                    >
                        <img
                            class="w-full max-w-16 h-16 object-cover rounded-full"
                            :class="{
                                'border-red-600 border-2': $route.name === 'profile',
                            }"
                            :src="
                                this.currentUser?.avatar
                                    ? this.currentUser.avatar
                                    : '/public/images/profile/no-profile-picture.jpg'
                            "
                            alt="profile-image"
                        />
                        <div class="flex flex-col">
                            <h3 class="text-lg">{{ this.currentUser.username }}</h3>
                            <span class="text-gray-400">Edit your profile</span>
                        </div>
                    </router-link>
                    <!-- News Feed -->
                    <router-link
                        :to="{ name: 'news-feed' }"
                        class="pl-4 flex items-center space-x-8 w-full py-5 pt-7"
                    >
                        <HomeIcon :color="homeIconColor" />
                        <span>News Feed</span>
                    </router-link>
                    <!-- Movies -->
                    <router-link
                        :to="{ name: 'movies' }"
                        class="pl-4 flex items-center space-x-8 w-full py-5"
                    >
                        <CameraIcon :color="cameraIconColor" />
                        <span>List of movies</span>
                    </router-link>
                </aside>

                <div class="w-full">
                    <slot />
                </div>
            </div>
        </BaseContainer>
    </section>
</template>
<script>
import BaseContainer from '@/components/BaseContainer.vue';
import StudioCameraIcon from '@/components/icons/sidebar/StudioCameraIcon.vue';
import HomeIcon from '@/components/icons/sidebar/HomeIcon.vue';
import { useAuthStore } from '@/stores/user/auth.js';
import { mapState } from 'pinia';

export default {
    name: 'AppLayout',
    components: { HomeIcon, CameraIcon: StudioCameraIcon, BaseContainer },

    data() {
        return {
            homeIconColor: 'white',
            cameraIconColor: 'white',
        };
    },

    computed: {
        ...mapState(useAuthStore, ['currentUser']),
    },

    methods: {
        setColorOnRoute(name) {
            this.homeIconColor = 'white';
            this.cameraIconColor = 'white';

            if (name === 'news-feed') {
                this.homeIconColor = 'red';
            } else if (name === 'movies') {
                this.cameraIconColor = 'red';
            } else if (name === 'movie') {
                this.cameraIconColor = 'red';
            }
        },
    },

    mounted() {
        this.setColorOnRoute(this.$route.name);
    },

    watch: {
        $route(to) {
            this.setColorOnRoute(to.name);
        },
    },
};
</script>
