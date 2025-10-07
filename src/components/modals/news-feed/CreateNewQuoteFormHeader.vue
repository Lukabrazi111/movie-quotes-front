<template>
    <header class="text-center border-b border-gray-600 pb-3 relative px-5">
        <h1 class="text-white font-bold! text-lg">{{ title }}</h1>
        <CloseFormIcon
            @click="$emit('closeDropdown')"
            class="text-right absolute -top-1.5 right-3 cursor-pointer"
        />
    </header>
</template>

<script>
import CloseFormIcon from '@/components/icons/news-feed/CloseFormIcon.vue';

export default {
    name: 'NewQuoteFormHeader',
    components: { CloseFormIcon },

    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>
