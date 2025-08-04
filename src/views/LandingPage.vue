<template>
    <main>
        <HeaderBase />

        <!-- Movie and Quotes -->
        <MainContentGuest :movie-quotes="movieQuotes" />

        <FooterBase />
    </main>
</template>

<script>
import { MovieQuotesData } from '@/stores/movie-quotes-data.js';
import MainContentGuest from '@/components/guest/MainContentGuest.vue';
import FooterBase from '@/components/FooterBase.vue';
import HeaderBase from '@/components/HeaderBase.vue';

export default {
    name: 'LandingPage',
    components: { HeaderBase, FooterBase, MainContentGuest },

    data() {
        return {
            movieQuotes: [],
        };
    },

    created() {
        this.movieQuotes = MovieQuotesData;
    },
};
</script>

<style>
#backgroundColor {
    background-color: rgba(0, 0, 0, 0.35);
}
</style>
