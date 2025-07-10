<template>
    <main>
        <header class="bg-dark h-[80vh]">
            <BaseContainer>
                <div class="flex items-center justify-between px-4 py-8">
                    <div>
                        <h1 class="text-cream uppercase text-md">Movie quotes</h1>
                    </div>

                    <div class="flex items-center space-x-6 text-white">
                        <!-- Add dropdown menu -->

                        <BaseButton>Sign up</BaseButton>
                        <button class="border px-5 py-1.5 rounded">Log in</button>
                    </div>
                </div>

                <div
                    class="flex flex-col items-center justify-center space-y-5 text-center h-[50vh]"
                >
                    <h1 class="text-6xl w-full max-w-xl text-cream leading-20">
                        Find any quote in millions of movie lines
                    </h1>
                    <BaseButton>Get started</BaseButton>
                </div>
            </BaseContainer>
        </header>

        <!-- Movie and Quotes -->
        <section>
            <div
                v-for="(data, index) in movieQuotes"
                :key="index"
                class="relative w-[100vw] h-[100vh] bg-center bg-cover"
                :style="`background-image: url('/src/assets/images/home-page/${data.image}.jpg')`"
            >
                <div id="backgroundColor" class="absolute inset-0 z-0"></div>

                <div
                    class="relative z-10 flex flex-col items-start justify-center text-white w-full max-w-5/6 mx-auto"
                    :class="{
                        'pt-80': index === 0,
                        'pt-100': index === 1,
                        'pt-135': index === 2,
                    }"
                >
                    <h1 class="font-bold text-5xl w-full max-w-2xl leading-16">
                        “{{ data.quote }}”
                    </h1>
                    <p class="text-gray-200 text-xl mt-4 font-bold">
                        {{ data.movie }}, <span>{{ data.year }}</span>
                    </p>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseContainer from '@/components/BaseContainer.vue';
import { MovieQuotesData } from '@/stores/movie-quotes-data.js';

export default {
    name: 'HomeView',
    components: { BaseContainer, BaseButton },

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
