<template>
    <main>
        <HeaderGuest />

        <!-- Movie and Quotes -->
        <MainContentGuest :movie-quotes="movieQuotes" />

        <FooterGuest />
    </main>
</template>

<script>
import { MovieQuotesData } from '@/stores/movie-quotes-data.js';
import HeaderGuest from '@/components/guest/HeaderGuest.vue';
import MainContentGuest from '@/components/guest/MainContentGuest.vue';
import FooterGuest from '@/components/guest/FooterGuest.vue';

export default {
    name: 'LandingPage',
    components: { FooterGuest, HeaderGuest, MainContentGuest },

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
