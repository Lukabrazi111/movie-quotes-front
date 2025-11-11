<template>
    <div class="w-full space-y-2">
        <div class="mb-4 cursor-pointer">
            <router-link to="/movies/1">
                <img
                    :src="imageUrl ? imageUrl : '/public/images/profile/no-profile-picture.jpg'"
                    alt="image"
                    class="rounded-lg"
                />
            </router-link>
        </div>

        <div class="space-y-2">
            <router-link to="/movies/1" class="uppercase cursor-pointer"
                >{{ title }} ({{ releaseYear }})
            </router-link>
            <div class="flex items-center space-x-4">
                <span>{{ comments }}</span>
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
        comments: {
            type: String,
            required: true,
        },
    },
};
</script>
