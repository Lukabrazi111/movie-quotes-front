<template>
    <div class="space-y-5">
        <div class="text-white space-x-4">
            <span>Quotes (total 7)</span>
            <span class="text-[#6C757D]">|</span>
            <BaseButton>Add quote</BaseButton>
        </div>

        <!-- Movie quote item -->
        <MovieQuoteItem />
    </div>
</template>
<script>
import MovieQuoteItem from '@/components/movies/quotes/MovieQuoteItem.vue';
import BaseButton from '@/components/ui/buttons/BaseButton.vue';

export default {
    name: 'MovieQuoteLists',
    components: { BaseButton, MovieQuoteItem },
};
</script>
