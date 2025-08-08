<template>
    <form
        action="#"
        class="flex flex-col space-y-8 items-center justify-center mx-auto w-full max-w-lg px-10 pb-28"
    >
        <div class="flex flex-col w-full space-y-1">
            <label for="username">Username</label>
            <!-- TODO: Placeholder needs to be changed on username from database -->
            <div class="flex items-center space-x-4">
                <input
                    type="text"
                    name="username"
                    id="username"
                    class="w-full max-w-sm px-2 py-1.5 text-gray-900 bg-gray-200 border rounded-lg focus:outline-0"
                    placeholder="Username"
                    v-model="this.currentUser.username"
                />
                <button class="hover:underline">Edit</button>
            </div>
        </div>

        <div class="flex flex-col w-full space-y-1">
            <label for="email">Email</label>
            <input
                type="text"
                name="email"
                id="email"
                class="w-full max-w-sm px-2 py-1.5 text-gray-900 bg-gray-200 border rounded-lg focus:outline-0"
                placeholder="Email"
                v-model="this.currentUser.email"
            />
        </div>

        <div class="flex flex-col w-full space-y-1">
            <label for="password">Password</label>
            <div class="flex items-center space-x-4">
                <input
                    type="password"
                    name="password"
                    id="password"
                    class="w-full max-w-sm px-2 py-1.5 text-gray-900 bg-gray-200 border rounded-lg focus:outline-0"
                    placeholder="Password"
                    :value="user.password"
                />
                <button class="hover:underline">Edit</button>
            </div>
        </div>
    </form>
</template>

<script>
import { mapState } from 'pinia';
import { useAuthStore } from '@/stores/user/auth.js';

export default {
    name: 'UserProfileForm',

    data() {
        return {
            user: {
                username: '',
                new_username: '',
                email: '',
                password: 'password123',
                password_confirmation: '',
            },
        };
    },

    computed: {
        ...mapState(useAuthStore, ['currentUser']),
    },
}
</script>
