<template>
    <div
        v-show="showPagination && pagination && pagination?.last_page > 1"
        class="flex items-center justify-center space-x-2 py-2"
    >
        <button
            @click="handlePageChange(pagination?.current_page - 1)"
            :disabled="pagination?.current_page === 1"
            class="px-3 py-1 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 rounded transition-colors"
            :class="{
                'cursor-not-allowed': pagination?.current_page === 1,
            }"
            aria-label="Previous page"
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10 12L6 8L10 4"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </button>

        <template v-for="page in paginationPages" :key="page">
            <button
                v-if="page !== '...'"
                @click="handlePageChange(page)"
                class="px-3 py-1 text-white rounded transition-colors"
                :class="{
                    'bg-primary': page === pagination?.current_page,
                    'hover:bg-gray-700': page !== pagination?.current_page,
                }"
                :aria-label="`Go to page ${page}`"
            >
                {{ page }}
            </button>
            <span v-else class="px-2 text-white">...</span>
        </template>

        <button
            @click="handlePageChange(pagination?.current_page + 1)"
            :disabled="pagination?.current_page === pagination?.last_page"
            class="px-3 py-1 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 rounded transition-colors"
            :class="{
                'cursor-not-allowed': pagination?.current_page === pagination?.last_page,
            }"
            aria-label="Next page"
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M6 4L10 8L6 12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    name: 'BasePagination',

    computed: {
        paginationPages() {
            if (!this.pagination) return [];

            const current = this.pagination?.current_page;
            const last = this.pagination?.last_page;
            const pages = [];

            if (last <= 7) {
                // Show all pages if 7 or fewer
                for (let i = 1; i <= last; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);

                // Calculate start and end of middle range
                let start = Math.max(2, current - 1);
                let end = Math.min(last - 1, current + 1);

                if (current <= 3) {
                    end = 4;
                }

                if (current >= last - 2) {
                    start = last - 3;
                }

                if (start > 2) {
                    pages.push('...');
                }

                for (let i = start; i <= end; i++) {
                    pages.push(i);
                }

                if (end < last - 1) {
                    pages.push('...');
                }

                pages.push(last);
            }

            return pages;
        },
    },

    props: {
        pagination: {
            type: [Object, null],
            required: true,
        },
        showPagination: {
            type: Boolean,
            required: false,
            default: false,
        },
    },

    methods: {
        handlePageChange(page) {
            this.$emit('page-change', page);
        },
    },
};
</script>
