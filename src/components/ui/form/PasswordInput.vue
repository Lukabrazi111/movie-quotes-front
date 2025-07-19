<template>
    <div class="flex flex-col space-y-1 items-start">
        <label :for="name" class="text-white">
            {{ labelName.charAt(0).toUpperCase() + labelName.slice(1) }}
            <span v-show="required" class="text-red-400">*</span>
        </label>
        <div class="relative w-full">
            <Field
                :label="labelName"
                :rules="rules"
                :placeholder="placeholder"
                :type="showPassword ? 'text' : 'password'"
                :id="name"
                :name="name"
                class="w-full px-2 py-1.5 text-gray-900 bg-gray-200 border rounded-lg focus:outline-0"
            />

            <ShowPasswordIcon
                @click="toggleShowPassword"
                v-show="!showPassword"
                class="absolute top-2 right-2 cursor-pointer text-[#999] hover:text-gray-500 transition-colors"
            />
            <HidePasswordIcon
                @click="toggleShowPassword"
                v-show="showPassword"
                class="absolute top-2 right-2 cursor-pointer text-[#999] hover:text-gray-500 transition-colors"
            />
        </div>
    </div>
</template>

<script>
import HidePasswordIcon from '@/components/icons/modalForms/HidePasswordIcon.vue';
import ShowPasswordIcon from '@/components/icons/modalForms/ShowPasswordIcon.vue';
import { Field } from 'vee-validate';

export default {
    name: 'PasswordInput',
    components: { ShowPasswordIcon, HidePasswordIcon, Field },

    data() {
        return {
            showPassword: false,
        };
    },

    methods: {
        toggleShowPassword() {
            this.showPassword = !this.showPassword;
        },
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
