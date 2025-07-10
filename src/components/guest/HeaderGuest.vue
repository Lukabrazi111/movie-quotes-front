<template>
    <header class="bg-dark h-[80vh]">
        <BaseContainer>
            <div class="flex items-center justify-between px-4 py-8">
                <div>
                    <h1 class="text-cream uppercase text-md font-helvetica font-normal">
                        Movie quotes
                    </h1>
                </div>

                <div class="flex items-center space-x-6 text-white">
                    <!-- Add dropdown menu -->

                    <BaseButton>Sign up</BaseButton>
                    <button class="border px-5 py-1.5 rounded font-normal font-helvetica">
                        Log in
                    </button>
                </div>
            </div>

            <div class="flex flex-col items-center justify-center space-y-5 text-center h-[50vh]">
                <h1
                    class="text-5xl w-full max-w-xl text-cream leading-18 font-montserrat font-bold"
                >
                    Find any quote in millions of movie lines
                </h1>
                <BaseButton>Get started</BaseButton>
            </div>
        </BaseContainer>
    </header>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseContainer from '@/components/BaseContainer.vue';

export default {
    name: 'HeaderGuest',
    components: { BaseContainer, BaseButton },
};
</script>
