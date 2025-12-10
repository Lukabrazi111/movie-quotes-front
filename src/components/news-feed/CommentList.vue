<template>
    <section class="pt-3">
        <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment" />
    </section>
</template>

<script>
import CommentItem from '@/components/news-feed/CommentItem.vue';
export default {
    name: 'CommentList',
    components: { CommentItem },
    props: {
        comments: {
            type: Array,
            required: true,
        },
    },
};
</script>
