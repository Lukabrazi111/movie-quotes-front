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
            <a
                v-if="link.value && link.value === 'https://mail.google.com'"
                :href="link.value"
                target="_blank"
            >
                <BaseButton class="w-full">{{ buttonText }}</BaseButton>
            </a>

            <router-link v-else @click.prevent="handleModalSwitch" :to="link">
                <BaseButton class="w-full">{{ buttonText }}</BaseButton>
            </router-link>
        </div>

        <button v-show="skipButton" class="flex items-center justify-center mx-auto">
            <span
                class="text-gray-500 hover:text-gray-400 transition-colors"
                @click="this.$emit('closeModal', false)"
            >
                Skip, I'll confirm later
            </span>
        </button>
    </div>
</template>
<script>
import BaseButton from '@/components/ui/buttons/BaseButton.vue';

export default {
    name: 'SuccessMessageInfo',
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
        skipButton: {
            type: Boolean,
            default: false,
            required: false,
        },
    },

    methods: {
        handleModalSwitch() {
            this.$emit('switchModal', this.link);
        },
    },
};
</script>
