<template>
    <div class="flex items-center space-x-4">
        <router-link :to="{ name: 'profile' }" class="w-full max-w-12 h-12 transform">
            <img
                class="w-full max-w-12 h-12 object-cover rounded-full"
                :src="user.avatar || '/public/images/profile/no-profile-picture.jpg'"
                alt="profile-image"
            />
        </router-link>

        <div class="bg-[#24222F] w-full rounded-lg">
            <input
                class="w-full py-2 px-3 focus:outline-0 placeholder:text-gray-main"
                type="text"
                placeholder="Write a comment"
                name="comment"
                v-model="comment"
                @keyup.enter="createComment"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommentPostForm',

    data() {
        return {
            comment: '',
        };
    },

    props: {
        user: {
            type: Object,
            required: true,
        },
    },

    methods: {
        createComment() {
            this.$emit('create-comment', this.comment);
            this.comment = '';
        },
    },
};
</script>
