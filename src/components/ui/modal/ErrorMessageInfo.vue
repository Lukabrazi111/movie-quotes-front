<template>
    <div class="w-full px-10 md:px-20">
        <div class="flex items-center justify-center mb-8">
            <!-- Here we need to pass some Icon or Image component -->
            <slot />
        </div>

        <div class="mb-8 text-center space-y-8">
            <h1 class="text-white text-3xl font-bold!">{{ title }}</h1>
            <span class="text-white">
                {{ description }}
            </span>
        </div>

        <div class="space-y-4 mt-7 mb-7">
            <router-link @click.prevent="$emit('sendVerificationLink')" :to="link">
                <BaseButton class="w-full">{{ buttonText }}</BaseButton>
            </router-link>
        </div>
    </div>
</template>
<script>
import BaseButton from '@/components/ui/buttons/BaseButton.vue';

export default {
    name: 'ErrorMessageInfo',
    components: { BaseButton },

    props: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        buttonText: {
            type: String,
            required: true,
        },
        link: {
            type: Object,
            required: true,
        },
    },
};
</script>
