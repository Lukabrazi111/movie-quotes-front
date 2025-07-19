<template>
    <span class="text-red-400">
        {{ message }}
    </span>
</template>

<script>
export default {
    name: 'FieldError',

    props: {
        message: String,
    },
};
</script>
