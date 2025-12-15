<template>
    <header class="text-center border-b border-gray-600 pb-3 relative px-5">
        <div class="flex items-center justify-between">
            <div class="flex-1">
                <slot name="header-content" />
            </div>
            <h1 class="text-white font-bold! text-lg align-middle text-nowrap flex-1 text-center">
                {{ title }}
            </h1>
            <div class="flex-1"></div>
        </div>
        <CloseFormIcon
            @click="$emit('closeDropdown')"
            class="text-right absolute -top-1.5 right-3 cursor-pointer"
        />
    </header>
</template>

<script>
import CloseFormIcon from '@/components/icons/news-feed/CloseFormIcon.vue';

export default {
    name: 'FormHeader',
    components: { CloseFormIcon },

    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>
