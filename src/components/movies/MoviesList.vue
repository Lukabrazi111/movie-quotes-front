<template>
    <section class="mt-5 space-y-10 text-white">
        <MoviesItem title="loki mobius" imageUrl="" releaseYear="2021" comments="10" />
    </section>
</template>

<script>
import MoviesItem from '@/components/movies/MoviesItem.vue';

export default {
    name: 'MoviesList',
    components: { MoviesItem },
};
</script>
