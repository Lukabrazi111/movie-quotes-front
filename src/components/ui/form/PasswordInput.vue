<template>
    <div class="flex flex-col space-y-1 items-start">
        <label :for="name" class="text-white">
            {{ labelName.charAt(0).toUpperCase() + labelName.slice(1) }}
            <span v-show="required" class="text-red-400">*</span>
        </label>
        <div class="relative w-full">
            <Field :rules="rules" :name="name" v-slot="{ field }">
                <input
                    @input="$emit('update:modelValue', $event.target.value)"
                    v-bind="field"
                    :type="showPassword ? 'text' : 'password'"
                    :id="name"
                    :name="name"
                    :value="modelValue"
                    :placeholder="placeholder"
                    class="w-full px-2 py-1.5 text-gray-900 bg-gray-200 border rounded-lg focus:outline-0"
                />
            </Field>

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
import HidePasswordIcon from '@/components/icons/modal/form/HidePasswordIcon.vue';
import ShowPasswordIcon from '@/components/icons/modal/form/ShowPasswordIcon.vue';
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
        modelValue: {
            type: String,
            required: true,
        },
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
