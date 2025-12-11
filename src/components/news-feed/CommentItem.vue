<template>
    <div class="flex items-start space-x-5 border-border-gray pb-5">
        <div class="w-full max-w-12 h-12 -translate-y-3">
            <img
                class="w-full max-w-12 h-12 object-cover rounded-full"
                :src="comment.user?.avatar ? comment.user?.avatar : '/src/assets/images/person.jpg'"
                alt="profile-image"
            />
        </div>
        <div class="border-b border-border-gray pb-4 w-full">
            <h3 class="text-lg font-medium!">{{ comment.user?.username }}</h3>
            <p>
                {{ comment.body }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommentItem',

    props: {
        comment: {
            type: Object,
            required: true,
        },
    },
};
</script>
