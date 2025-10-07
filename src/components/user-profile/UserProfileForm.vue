<template>
    <FormSection
        @submit="updateProfile"
        class="flex flex-col items-center justify-center mt-28 px-10 py-12 bg-content-dark rounded-lg relative mb-28"
    >
        <!-- Image -->
        <div class="flex flex-col items-center justify-center absolute -top-24 space-y-4">
            <img
                :src="
                    localCurrentUser?.avatar
                        ? localCurrentUser.avatar
                        : '/public/images/profile/no-profile-picture.jpg'
                "
                alt="user-profile"
                class="w-full max-w-44 h-44 rounded-full object-cover"
            />
            <label for="avatar" class="hover:underline cursor-pointer">Upload new photo</label>
            <input
                @change="handleImageUpload"
                hidden
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
            />
        </div>

        <div class="flex flex-col items-center justify-center space-y-6 w-full max-w-sm mt-24">
            <!-- Success notification -->
            <div
                v-if="successMessage"
                class="bg-green-400 text-white w-full py-1 px-4 text-center rounded-lg font-semibold!"
            >
                {{ successMessage }}
            </div>

            <div
                v-if="errorMessage"
                class="bg-red-400 text-white w-full py-1 px-4 text-center rounded-lg font-semibold!"
            >
                {{ errorMessage }}
            </div>

            <div class="flex flex-col space-y-1 w-full">
                <label for="username">Username</label>
                <div class="flex items-center space-x-4 w-full">
                    <input
                        type="text"
                        name="disabled_username"
                        id="disabled_username"
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
                <CustomInput
                    :required="false"
                    v-model="user.username"
                    id="username"
                    name="username"
                    labelName="New username"
                    type="text"
                    placeholder="Enter new username"
                />
                <!-- Backend error -->
                <FieldError v-if="this.errors?.username" :message="this.errors?.username" />
            </div>

            <div class="flex flex-col w-full space-y-1 pr-10.5">
                <label for="email">Email</label>
                <input
                    type="email"
                    name="disabled_email"
                    id="disabled_email"
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
                        name="disabled_password"
                        id="disabled_password"
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
                        <li
                            class="text-gray-400"
                            :class="{
                                'text-white': eightOrMoreChars,
                            }"
                        >
                            <span :class="{ 'text-green-400': eightOrMoreChars }">•</span> 8 or more
                            characters
                        </li>
                        <li class="text-gray-400" :class="{ 'text-white': lowerChars }">
                            <span :class="{ 'text-green-400': lowerChars }">•</span> lowercase
                            character
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Editable password input -->
            <div class="w-full space-y-8">
                <div v-show="this.editablePassword" class="flex flex-col w-full space-y-1 pr-10.5">
                    <PasswordInput
                        @input="checkPasswordRule"
                        class="w-full! max-w-sm!"
                        :required="false"
                        v-model="user.password"
                        id="password"
                        name="password"
                        labelName="New password"
                        type="password"
                        placeholder="Enter new password"
                    />
                    <FieldError v-if="this.errors?.password" :message="this.errors?.password" />
                </div>

                <div v-show="this.editablePassword" class="flex flex-col w-full space-y-1 pr-10.5">
                    <PasswordInput
                        class="w-full! max-w-sm!"
                        :required="false"
                        v-model="user.password_confirmation"
                        rules="confirmed:@password"
                        id="new_password_confirmation"
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
            <BaseButton type="submit">Save Changes</BaseButton>
        </div>
    </FormSection>
</template>
<script>
import { ErrorMessage, Form as FormSection } from 'vee-validate';
import { axios } from '@/configs/axios/index.js';
import PasswordInput from '@/components/ui/form/PasswordInput.vue';
import BaseButton from '@/components/ui/buttons/BaseButton.vue';
import CustomInput from '@/components/ui/form/CustomInput.vue';
import FieldError from '@/components/ui/form/FieldError.vue';

export default {
    name: 'UserProfileForm',
    components: { CustomInput, FieldError, BaseButton, PasswordInput, ErrorMessage, FormSection },

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
            errors: {
                username: '',
                password: '',
            },
            user: {
                avatar: {},
                username: '',
                password: '',
                password_confirmation: '',
            },
            successMessage: '',
            errorMessage: '',
            lowerChars: false,
            eightOrMoreChars: false,
        };
    },

    methods: {
        async updateProfile() {
            try {
                const payload = this.buildProfilePayload();

                if (payload.username || payload.password) {
                    const response = await axios.put('/profile', payload);

                    if (response.status === 200) {
                        this.successMessage = response.data?.message;

                        this.user = {
                            username: '',
                            password: '',
                            password_confirmation: '',
                        };

                        if (payload.username) {
                            this.localCurrentUser.username = payload.username;
                        }

                        this.$emit('cancelUpdate');

                        setTimeout(() => {
                            this.successMessage = '';
                        }, 3000);
                    }
                }
            } catch (error) {
                const response = error.response;

                if (response && response.status === 422) {
                    const errors = response.data?.errors;

                    if (Object.prototype.hasOwnProperty.call(errors, 'username')) {
                        this.errors.username = errors['username']?.[0] || '';
                    } else if (Object.prototype.hasOwnProperty.call(errors, 'password')) {
                        this.errors.password = errors['password']?.[0] || '';
                    }
                }
            }
        },

        async handleImageUpload(event) {
            this.user.avatar = await event.target.files[0];

            try {
                const profileImage = this.user?.avatar;

                let formData = new FormData();
                formData.append('avatar', profileImage);
                formData.append('_method', 'put');

                if (profileImage) {
                    const response = await axios.post('/profile', formData, {
                        headers: {
                            'Content-Type': 'multipart/auth-form-data',
                        },
                    });

                    if (response.status === 200) {
                        this.localCurrentUser.avatar = response.data?.user?.avatar;
                        this.successMessage = response.data?.message;
                        setTimeout(() => {
                            this.successMessage = '';
                        }, 3000);
                    }
                }
            } catch (error) {
                const response = error.response;

                if (response.status === 422) {
                    this.errorMessage = response.data?.message;
                    setTimeout(() => {
                        this.errorMessage = '';
                    }, 5000);
                }
            }
        },

        buildProfilePayload() {
            let payload = {};

            if (this.user?.username.trim() !== '') payload.username = this.user.username;
            if (
                this.user?.password.trim() !== '' &&
                this.user?.password_confirmation.trim() !== ''
            ) {
                payload.password = this.user.password;
                payload.password_confirmation = this.user.password_confirmation;
            }

            return payload;
        },

        checkPasswordRule() {
            const value = this.user?.password;
            this.eightOrMoreChars = value.length >= 8;
            this.lowerChars = value && value === value.toLowerCase();
        },
    },

    computed: {
        localCurrentUser: {
            get() {
                return this.currentUser;
            },

            set(value) {
                this.$emit('update:currentUser', value);
            },
        },
    },
};
</script>
