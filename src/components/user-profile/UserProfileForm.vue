<template>
    <form
        class="flex flex-col items-center justify-center mt-28 px-10 py-12 bg-content-dark rounded-lg relative mb-28"
    >
        <!-- Image -->
        <div class="flex flex-col items-center justify-center absolute -top-24 space-y-4">
            <img
                src="/src/assets/images/person.jpg"
                alt="user-profile"
                class="w-full max-w-44 h-44 rounded-full object-cover"
            />
            <span>Upload new photo</span>
        </div>

        <div class="flex flex-col items-center justify-center space-y-6 w-full max-w-sm mt-24">
            <div class="flex flex-col space-y-1 w-full">
                <label for="username">Username</label>
                <!-- TODO: Placeholder needs to be changed on username from database -->
                <div class="flex items-center space-x-4 w-full">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        class="w-full max-w-sm px-2 py-1.5 text-gray-900 bg-gray-200 border rounded-lg focus:outline-0"
                        placeholder="Username"
                        :value="localCurrentUser?.username"
                        disabled
                    />
                    <button
                        type="button"
                        @click="$emit('toggleEditableUsername')"
                        class="hover:underline"
                    >
                        Edit
                    </button>
                </div>
            </div>

            <!-- Editable username input -->
            <div v-show="this.editableUsername" class="flex flex-col w-full space-y-1 pr-10.5">
                <label for="new_username">New username</label>
                <input
                    type="text"
                    name="new_username"
                    id="new_username"
                    class="w-full max-w-sm px-2 py-1.5 text-gray-900 bg-gray-200 border rounded-lg focus:outline-0"
                    placeholder="Enter new username"
                    v-model="user.username"
                />
            </div>

            <div class="flex flex-col w-full space-y-1 pr-10.5">
                <label for="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    class="w-full max-w-sm px-2 py-1.5 text-gray-900 bg-gray-200 border rounded-lg focus:outline-0"
                    :value="localCurrentUser?.email"
                    placeholder="Enter new email"
                    disabled
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
                        value="tryhackme123"
                        disabled
                    />
                    <button
                        type="button"
                        @click="$emit('toggleEditablePassword')"
                        class="hover:underline"
                    >
                        Edit
                    </button>
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
                <div v-show="this.editablePassword" class="flex flex-col w-full space-y-1 pr-10.5">
                    <PasswordInput
                        class="w-full! max-w-sm!"
                        :required="false"
                        v-model="user.password"
                        rules="required"
                        name="new_password"
                        labelName="New password"
                        type="password"
                        placeholder="Enter new password"
                    />
                    <ErrorMessage class="text-red-400" name="new_password" />
                </div>

                <div v-show="this.editablePassword" class="flex flex-col w-full space-y-1 pr-10.5">
                    <PasswordInput
                        class="w-full! max-w-sm!"
                        :required="false"
                        v-model="user.password_confirmation"
                        rules="required"
                        name="new_password_confirmation"
                        labelName="Confirm new password"
                        type="password"
                        placeholder="Confirm new password"
                    />
                    <ErrorMessage class="text-red-400" name="new_password_confirmation" />
                </div>
            </div>
        </div>

        <div
            v-if="editableUsername || editablePassword"
            class="flex items-center justify-end space-x-8 absolute right-0 -bottom-20"
        >
            <button
                @click="$emit('cancelUpdate')"
                class="text-gray-main hover:text-white transition-colors"
            >
                Cancel
            </button>
            <BaseButton @click="updateProfile">Save Changes</BaseButton>
        </div>
    </form>
</template>
<script>
import PasswordInput from '@/components/ui/form/PasswordInput.vue';
import { ErrorMessage } from 'vee-validate';
import BaseButton from '@/components/ui/buttons/BaseButton.vue';

export default {
    name: 'UserProfileForm',
    components: { BaseButton, PasswordInput, ErrorMessage },

    data() {
        return {
            user: {
                username: '',
                password: '',
                password_confirmation: '',
            },
        };
    },

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

    computed: {
        localCurrentUser: {
            get() {
                return this.currentUser;
            },
        },
    },

    methods: {
        updateProfile() {},
    },
};
</script>
