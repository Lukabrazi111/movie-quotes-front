<template>
    <section class="space-y-10 text-white">
        <div class="grid grid-cols-3 gap-10 items-center">
            <MoviesItem title="loki mobius" imageUrl="" releaseYear="2021" comments="10" />
            <MoviesItem title="loki mobius" imageUrl="" releaseYear="2021" comments="10" />
            <MoviesItem title="loki mobius" imageUrl="" releaseYear="2021" comments="10" />
            <MoviesItem title="loki mobius" imageUrl="" releaseYear="2021" comments="10" />
            <MoviesItem title="loki mobius" imageUrl="" releaseYear="2021" comments="10" />
            <MoviesItem title="loki mobius" imageUrl="" releaseYear="2021" comments="10" />
            <MoviesItem title="loki mobius" imageUrl="" releaseYear="2021" comments="10" />
            <MoviesItem title="loki mobius" imageUrl="" releaseYear="2021" comments="10" />
        </div>
    </section>
</template>

<script>
import MoviesItem from '@/components/movies/MoviesItem.vue';

export default {
    name: 'MoviesList',
    components: { MoviesItem },
};
</script>
