<template>
    <div
        class="flex flex-col items-center justify-center bg-dark text-white w-full h-screen space-y-7"
    >
        <div class="flex flex-col items-center justify-center space-y-6">
            <NotFoundIcon />
            <NotFoundShadowIcon />
        </div>

        <div class="flex flex-col items-center justify-center space-y-3.5">
            <h1 class="font-bold! text-4xl">Whoops!</h1>
            <p class="font-medium!">We can't see the page you are looking for</p>
        </div>

        <router-link :to="{ name: 'landing' }">
            <BaseButton>Return home</BaseButton>
        </router-link>
    </div>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';
import NotFoundIcon from '@/components/icons/not-found/NotFoundIcon.vue';
import NotFoundShadowIcon from '@/components/icons/not-found/NotFoundShadowIcon.vue';

export default {
    name: 'NotFound',
    components: { NotFoundShadowIcon, NotFoundIcon, BaseButton },
};
</script>
