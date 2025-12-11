<template>
    <section>
        <CommentItem
            class="first:mt-6 last:mb-0 last:pb-0"
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
        />
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
