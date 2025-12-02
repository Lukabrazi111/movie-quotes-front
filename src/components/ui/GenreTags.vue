<template>
    <ul class="flex items-start space-x-2">
        <li
            v-for="genre in genres"
            :key="genre.id"
            class="text-white bg-gray-400 rounded flex items-center space-x-1 px-1 text-nowrap"
        >
            <span>{{ genre.name?.charAt(0).toUpperCase() + genre.name?.slice(1) }}</span>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'GenreTags',
    props: {
        genres: {
            type: Array,
            required: true,
        },
    },
};
</script>
