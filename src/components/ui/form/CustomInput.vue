<template>
    <div class="flex flex-col space-y-1 items-start">
        <label :for="name" class="text-white">
            {{ labelName.charAt(0).toUpperCase() + labelName.slice(1) }}
            <span v-show="required" class="text-red-400">*</span>
        </label>
        <input
            :placeholder="placeholder"
            :type="type"
            :id="name"
            :name="name"
            class="w-full px-2 py-1.5 text-gray-900 bg-gray-200 border rounded-lg focus:outline-0"
        />
    </div>
</template>

<script>
export default {
    name: 'CustomInput',

    props: {
        name: {
            type: String,
            required: true,
        },
        labelName: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        required: {
            type: Boolean,
            default: true,
            required: false,
        },
    },
};
</script>
