<template>
    <div class="flex items-center space-x-4">
        <button
            class="text-white flex items-center space-x-4 bg-[#24222F] py-3 px-4 rounded-lg"
            :class="{
                'w-full': !isOpenSearchInput,
            }"
        >
            <PencilWriteIcon />
            <span class="text-nowrap">Write new quote</span>
        </button>

        <!-- Search input -->
        <div
            v-click-outside="() => (isOpenSearchInput = false)"
            class="flex items-center"
            :class="{
                'w-full': isOpenSearchInput,
            }"
        >
            <button
                @click="toggleSearchInput"
                v-show="!isOpenSearchInput"
                class="text-gray-300 flex items-center text-nowrap px-4 py-3 space-x-4"
            >
                <SearchIcon />
                <span>Search by</span>
            </button>

            <div
                v-show="isOpenSearchInput"
                class="flex items-center border-b border-gray-600 w-full space-x-3"
            >
                <SearchIcon />
                <input
                    type="text"
                    name="search"
                    placeholder="Enter @ to search movies, Enter # to search quotes"
                    class="text-gray-main py-3 focus:outline-0 w-full"
                />
            </div>
        </div>
    </div>
</template>
<script>
import SearchIcon from '@/components/icons/news-feed/SearchIcon.vue';
import PencilWriteIcon from '@/components/icons/news-feed/PencilWriteIcon.vue';

export default {
    name: 'NewsHeader',
    components: { PencilWriteIcon, SearchIcon },
    data() {
        return {
            isOpenSearchInput: false,
        }
    },

    methods: {
        toggleSearchInput() {
            this.isOpenSearchInput = !this.isOpenSearchInput;
        }
    },
};
</script>
