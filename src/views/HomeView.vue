<template>
    <main>
        <!-- Need to add container -->
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
    </main>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseContainer from '@/components/BaseContainer.vue';

export default {
    name: 'HomeView',
    components: { BaseContainer, BaseButton },
};
</script>
