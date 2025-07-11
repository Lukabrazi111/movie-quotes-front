<template>
    <section>
        <div
            v-for="(data, index) in movieQuotes"
            :key="index"
            class="relative h-[100vh] bg-center bg-cover"
            :style="`background-image: url('/src/assets/images/home-page/${data.image}.jpg')`"
        >
            <div id="backgroundColor" class="absolute inset-0 z-0"></div>

            <div
                class="relative z-10 flex flex-col items-start justify-center text-white w-full max-w-5/6 mx-auto font-montserrat"
                :class="{
                    'pt-80': index === 0,
                    'pt-105': index === 1,
                    'pt-135': index === 2,
                }"
            >
                <div id="h1-quote" class="ml-10 relative flex items-start">
                    <div>
                        <h1 class="font-bold text-4xl w-full max-w-2xl leading-16">
                            “{{ data.quote }}”
                        </h1>
                        <p class="text-gray-200 text-xl mt-4 font-bold font-helvetica">
                            {{ data.movie }}, <span>{{ data.year }}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'MainContentGuest',

    props: {
        movieQuotes: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style>
#h1-quote::before {
    display: inline-block;
    content: '';
    border-top: 0.15rem solid white;
    border-radius: 5px;
    width: 3rem;
    margin: 0 1rem;
    transform: translateY(1.8rem);
}
</style>
