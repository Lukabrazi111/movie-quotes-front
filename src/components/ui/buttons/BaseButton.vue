<template>
    <button
        class="bg-primary hover:bg-primary-hover px-5 py-1.5 rounded transition-colors text-white font-light font-helvetica"
    >
        <slot />
    </button>
</template>

<script>
export default {
    name: 'BaseButton',
};
</script>
