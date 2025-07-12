<template>
    <button
        @click="$emit('scrollToContent')"
        class="bg-primary hover:bg-primary-hover px-5 py-1.5 rounded transition-colors text-white font-helvetica font-normal"
    >
        <slot />
    </button>
</template>

<script>
export default {
    name: 'BaseButton',
};
</script>
