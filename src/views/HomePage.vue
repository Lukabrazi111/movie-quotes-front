<template>
    <main>
        <HeaderBase />

        <!-- MainContent -->
        <MainContent />

        <FooterBase />
    </main>
</template>

<script>
import HeaderBase from '@/components/HeaderBase.vue';
import FooterBase from '@/components/FooterBase.vue';
import MainContent from '@/components/auth/MainContent.vue';

export default {
    name: 'HomePage',

    components: {
        MainContent,
        FooterBase,
        HeaderBase,
    },
};
</script>
