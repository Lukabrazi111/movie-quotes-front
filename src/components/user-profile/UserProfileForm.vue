<template>
    <form
        class="flex flex-col space-y-8 items-start justify-center mx-auto w-full max-w-lg px-10 pb-28"
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
                    v-model="this.localUser.username"
                />
                <button type="button" @click="$emit('toggleEditableUsername', true)" class="hover:underline">
                    Edit
                </button>
            </div>
        </div>

        <!-- Editable username input -->
        <div v-show="this.editableUsername" class="flex flex-col w-full space-y-1">
            <label for="new_username">New username</label>
            <input
                type="text"
                name="new_username"
                id="new_username"
                class="w-full max-w-sm px-2 py-1.5 text-gray-900 bg-gray-200 border rounded-lg focus:outline-0"
                placeholder="Enter new username"
                v-model="user.new_username"
            />
        </div>

        <div class="flex flex-col w-full space-y-1">
            <CustomInput
                :required="false"
                class="w-full max-w-sm"
                v-model="this.localUser.email"
                rules="required|email"
                name="email"
                labelName="email"
                type="text"
                placeholder="Enter your email"
            />
            <ErrorMessage class="text-red-400" name="email" />
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
                <button type="button" @click="$emit('toggleEditablePassword', true)" class="hover:underline">Edit</button>
            </div>
        </div>

        <div
            v-if="this.editablePassword"
            class="border border-[#CED4DA33] w-full max-w-sm py-5 px-6 space-y-4 flex flex-col items-start justify-start"
        >
            <h3>Passwords should contain:</h3>

            <div>
                <ul class="flex flex-col items-start space-y-1">
                    <li class="text-gray-400"><span>•</span> 8 or more characters</li>
                    <li><span class="text-green-400">•</span> 15 lowercase character</li>
                </ul>
            </div>
        </div>

        <!-- Editable password input -->
        <div class="w-full space-y-8">
            <div v-show="this.editablePassword" class="flex flex-col w-full space-y-1">
                <PasswordInput
                    class="w-full! max-w-sm!"
                    :required="false"
                    v-model="user.new_password"
                    rules="required"
                    name="new_password"
                    labelName="New password"
                    type="password"
                    placeholder="Enter new password"
                />
                <ErrorMessage class="text-red-400" name="new_password" />
            </div>

            <div v-show="this.editablePassword" class="flex flex-col w-full space-y-1">
                <PasswordInput
                    class="w-full! max-w-sm!"
                    :required="false"
                    v-model="user.new_password_confirmation"
                    rules="required"
                    name="new_password_confirmation"
                    labelName="Confirm new password"
                    type="password"
                    placeholder="Confirm new password"
                />
                <ErrorMessage class="text-red-400" name="new_password_confirmation" />
            </div>
        </div>
    </form>
</template>
<script>
import PasswordInput from '@/components/ui/form/PasswordInput.vue';
import { ErrorMessage } from 'vee-validate';
import CustomInput from '@/components/ui/form/CustomInput.vue';

export default {
    name: 'UserProfileForm',
    components: { CustomInput, PasswordInput, ErrorMessage },

    props: {
        currentUser: {
            type: Object,
            required: true,
        },
        editableUsername: {
            type: Boolean,
            required: true,
        },
        editablePassword: {
            type: Boolean,
            required: true,
        },
    },

    data() {
        return {
            localUser: { ...this.currentUser },
            user: {
                username: '',
                email: '',
                password: 'password123',
                new_username: '',
                new_password: '',
                new_password_confirmation: '',
            },
        };
    },
};
</script>
