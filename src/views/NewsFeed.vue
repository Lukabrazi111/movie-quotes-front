<template>
    <HeaderBase />

    <!-- MainContent -->
    <MainContent />

    <FooterBase />
</template>

<script>
import HeaderBase from '@/components/HeaderBase.vue';
import FooterBase from '@/components/FooterBase.vue';
import MainContent from '@/components/auth/MainContent.vue';

export default {
    name: 'NewsFeed',

    components: {
        MainContent,
        FooterBase,
        HeaderBase,
    },
};
</script>
