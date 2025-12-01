<template>
    <div class="w-full space-y-2">
        <div class="mb-4 cursor-pointer">
            <router-link :to="`/movies/${id}`">
                <img
                    :src="imageUrl ? imageUrl : '/public/images/profile/no-profile-picture.jpg'"
                    alt="image"
                    class="rounded-lg w-full object-cover object-center"
                />
            </router-link>
        </div>

        <div class="space-y-2">
            <router-link :to="`/movies/${id}`" class="uppercase cursor-pointer text-nowrap"
                >{{ title }} ({{ releaseYear }})
            </router-link>
            <div class="flex items-center space-x-4">
                <span>{{ quotesCount }}</span>
                <MovieCommentIcon />
            </div>
        </div>
    </div>
</template>

<script>
import MovieCommentIcon from '@/components/icons/movies/MovieCommentIcon.vue';

export default {
    name: 'MoviesItem',
    components: { MovieCommentIcon },
    props: {
        id: {
            type: Number,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        releaseYear: {
            type: String,
            required: true,
        },
        quotesCount: {
            type: Number,
            required: true,
        },
    },
};
</script>
