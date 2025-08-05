<template>
    <section class="bg-gradient-primary py-6 h-[100vh]">
        <BaseContainer>
            <div class="flex">
                <aside
                    class="text-white flex flex-col items-start justify-start w-full max-w-sm"
                >
                    <router-link
                        :to="{name: 'profile'}"
                        class="flex items-center space-x-4 w-full py-1"
                        :class="{
                            'text-red-500': $route.matched.some(({ name }) => name === 'profile'),
                        }"
                    >
                        <img
                            class="w-full max-w-16 h-16 object-cover rounded-full"
                            src="/src/assets/images/person.jpg"
                            alt="profile-image"
                        />
                        <div class="flex flex-col">
                            <h3 class="text-lg">Luka Khangoshvili</h3>
                            <span class="text-gray-400">Edit your profile</span>
                        </div>
                    </router-link>
                    <router-link
                        :to="{name: 'news-feed'}"
                        class="pl-4 flex items-center space-x-8 w-full py-5 pt-7"
                        :class="{
                            'text-red-500': $route.matched.some(({ name }) => name === 'news-feed'),
                        }"
                    >
                        <HomeIcon />
                        <span>News Feed</span>
                    </router-link>
                    <router-link
                        :to="{name: 'movies'}"
                        class="pl-4 flex items-center space-x-8 w-full py-5"
                        :class="{
                            'text-red-500': $route.matched.some(
                                ({ name }) => name === 'movies',
                            ),
                        }"
                    >
                        <CameraIcon />
                        <span>List of movies</span>
                    </router-link>
                </aside>

                <slot />
            </div>
        </BaseContainer>
    </section>
</template>
<script>
import BaseContainer from '@/components/BaseContainer.vue';
import CameraIcon from '@/components/icons/sidebar/CameraIcon.vue';
import HomeIcon from '@/components/icons/sidebar/HomeIcon.vue';

export default {
    name: 'AppLayout',
    components: { HomeIcon, CameraIcon, BaseContainer },
};
</script>
