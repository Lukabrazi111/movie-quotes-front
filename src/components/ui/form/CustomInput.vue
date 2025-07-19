<template>
    <div class="flex flex-col space-y-1 items-start">
        <label :for="name" class="text-white">
            {{ labelName.charAt(0).toUpperCase() + labelName.slice(1) }}
            <span v-show="required" class="text-red-400">*</span>
        </label>
        <Field
            :label="labelName"
            :rules="rules"
            :placeholder="placeholder"
            :type="type"
            :id="name"
            :name="name"
            class="w-full px-2 py-1.5 text-gray-900 bg-gray-200 border rounded-lg focus:outline-0"
        />
    </div>
</template>

<script>
import { Field } from 'vee-validate';

export default {
    name: 'CustomInput',

    components: {
        Field,
    },

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
        rules: {
            type: String,
            required: false,
        },
    },
};
</script>
