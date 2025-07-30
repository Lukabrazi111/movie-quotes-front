<template>
    <button class="border px-5 py-1.5 rounded font-light font-helvetica">
        <slot />
    </button>
</template>
<script>
export default {
    name: 'SecondaryButton',

    props: {
        className: {
            type: String,
            required: false,
        },
    }
}
</script>
