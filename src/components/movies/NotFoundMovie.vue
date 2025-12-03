<template>
    <div class="flex flex-col items-center justify-center text-white w-full space-y-7 mt-20">
        <div class="flex flex-col items-center justify-center space-y-6">
            <NotFoundIcon />
            <NotFoundShadowIcon />
        </div>

        <div class="flex flex-col items-center justify-center space-y-3.5">
            <h1 class="font-bold! text-4xl">Whoops!</h1>
            <p class="font-medium!">You have not added any movie yet</p>
        </div>
    </div>
</template>

<script>
import NotFoundIcon from '@/components/icons/not-found/NotFoundIcon.vue';
import NotFoundShadowIcon from '@/components/icons/not-found/NotFoundShadowIcon.vue';

export default {
    name: 'NotFoundMovie',
    components: { NotFoundShadowIcon, NotFoundIcon },
};
</script>
