<template>
    <div class="mb-8 text-center space-y-2">
        <h1 class="text-white text-3xl font-bold!">{{ title }}</h1>
        <span class="text-gray-400">{{ description }}</span>
    </div>
</template>

<script>
export default {
    name: 'FormTitleModal',

    props: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
};
</script>
