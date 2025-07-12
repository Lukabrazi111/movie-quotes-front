<template>
    <div
        @click="toggleModal"
        id="bgTransparent"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
    >
        <div @click.stop class="bg-form-dark w-full max-w-lg py-12 md:mx-0 mx-10 rounded-md">
            <form class="w-full px-10 md:px-20">
                <div class="mb-8 text-center space-y-2">
                    <h1 class="text-white text-3xl font-bold">Create an account</h1>
                    <span class="text-gray-400">Start your journey!</span>
                </div>

                <!-- Inputs -->
                <div class="space-y-5 font-light">
                    <div class="flex flex-col space-y-1 items-start">
                        <label for="name" class="text-white">
                            Name <span class="text-red-400">*</span>
                        </label>
                        <input
                            placeholder="At least 3 & max.15 lower case characters"
                            type="text"
                            id="name"
                            name="name"
                            class="w-full px-2 py-1.5 text-gray-900 bg-gray-200 border rounded-lg focus:outline-0"
                        />
                    </div>
                    <div class="flex flex-col space-y-1 items-start">
                        <label for="email" class="text-white">
                            Email <span class="text-red-400">*</span>
                        </label>
                        <input
                            placeholder="Enter your email"
                            type="text"
                            id="email"
                            name="email"
                            class="w-full px-2 py-1.5 text-gray-900 bg-gray-200 border rounded-lg focus:outline-0"
                        />
                    </div>
                    <div class="flex flex-col space-y-1 items-start">
                        <label for="password" class="text-white">
                            Password <span class="text-red-400">*</span>
                        </label>
                        <input
                            placeholder="At least 8 & max.15 lower case characters"
                            type="password"
                            id="password"
                            name="password"
                            class="w-full px-2 py-1.5 text-gray-900 bg-gray-200 border rounded-lg focus:outline-0"
                        />
                    </div>
                    <div class="flex flex-col space-y-1 items-start">
                        <label for="password_confirmation" class="text-white">
                            Confirm password <span class="text-red-400">*</span>
                        </label>
                        <input
                            placeholder="Confirm password"
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            class="w-full px-2 py-1.5 text-gray-900 bg-gray-200 border rounded-lg focus:outline-0"
                        />
                    </div>
                </div>

                <div class="space-y-4 mt-7">
                    <BaseButton class="w-full">Get started</BaseButton>
                    <SecondaryButton
                        class="flex items-center justify-center space-x-4 mx-auto w-full text-white"
                    >
                        <div>
                            <GoogleIcon />
                        </div>
                        <span>Sign up with Google</span>
                    </SecondaryButton>
                </div>

                <div
                    class="mt-7 text-center text-gray-400 flex items-center justify-center space-x-1"
                >
                    <p>Already have an account?</p>
                    <router-link to="/" class="text-blue-500 underline">Login</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';
import SecondaryButton from '@/components/ui/SecondaryButton.vue';
import GoogleIcon from '@/components/icons/GoogleIcon.vue';

export default {
    name: 'SignUpModal',
    components: { GoogleIcon, SecondaryButton, BaseButton },

    data() {
        return {};
    },

    props: {
        modelValue: Boolean,
    },

    methods: {
        toggleModal() {
            return this.$emit('update:modelValue', !this.modelValue);
        },
    },
};
</script>

<style>
#bgTransparent {
    background-color: rgba(0, 0, 0, 0.35);
}
</style>
