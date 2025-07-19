<template>
    <div class="mt-7 text-center text-gray-400 flex items-center justify-center space-x-1">
        <p>{{ text }}</p>
        <router-link @click.prevent="handleModalSwitch" :to="link" class="text-blue-500 underline"
            >{{ linkText }}
        </router-link>
    </div>
</template>
<script>
export default {
    name: 'FormFooterModal',

    props: {
        text: {
            type: String,
            required: true,
        },
        link: {
            type: Object,
            required: true,
        },
        linkText: {
            type: String,
            required: true,
        },
    },

    methods: {
        handleModalSwitch() {
            this.$emit('switchModal', this.link);
        },
    },
};
</script>
