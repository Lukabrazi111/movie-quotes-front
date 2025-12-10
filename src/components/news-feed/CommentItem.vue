<template>
    <div class="flex items-start space-x-5 border-border-gray pb-5">
        <router-link :to="{ name: 'profile' }" class="w-full max-w-12 h-12 -translate-y-3">
            <img
                class="w-full max-w-12 h-12 object-cover rounded-full"
                src="/src/assets/images/person.jpg"
                alt="profile-image"
            />
        </router-link>
        <div class="border-b border-border-gray pb-4">
            <h3 class="text-lg font-medium!">Luka Khangoshvili</h3>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis delectus
                dolorum ducimus eaque explicabo facere fugit laudantium nemo ratione totam.
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
