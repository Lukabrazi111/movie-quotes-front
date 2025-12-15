<template>
    <div>
        <ThreeDotsOptionsIcon
            @click="$emit('toggleQuoteOptions')"
            v-click-outside="closeQuoteOptions"
            class="absolute top-5 right-5 cursor-pointer"
        />
        <div
            v-show="this.modelValue"
            @click.stop
            class="bg-[#24222F] text-white absolute -right-43 top-12 rounded"
        >
            <ul>
                <li
                    @click="openQuoteViewModal"
                    class="flex items-start justify-start space-x-4 hover:underline cursor-pointer pl-5 pr-20 py-4"
                >
                    <div>
                        <ViewDetailsIcon />
                    </div>
                    <span>View Quote</span>
                </li>
                <li
                    class="flex items-center space-x-4 hover:underline cursor-pointer pl-5 pr-20 py-4"
                >
                    <div>
                        <EditPencilIcon />
                    </div>
                    <span>Edit</span>
                </li>
                <li
                    class="flex items-center space-x-4 hover:underline cursor-pointer pl-5 pr-20 py-4"
                >
                    <div>
                        <DeleteTrashIcon />
                    </div>
                    <span>Delete</span>
                </li>
            </ul>
        </div>
        <!-- Quote view modal -->
        <QuoteView
            v-show="isOpenQuoteViewModal"
            v-model="isOpenQuoteViewModal"
            :quote="quote || {}"
        />
    </div>
</template>

<script>
import ThreeDotsOptionsIcon from '@/components/icons/ThreeDotsOptionsIcon.vue';
import EditPencilIcon from '@/components/icons/EditPencilIcon.vue';
import ViewDetailsIcon from '@/components/icons/ViewDetailsIcon.vue';
import DeleteTrashIcon from '@/components/icons/DeleteTrashIcon.vue';
import QuoteView from '@/components/movies/quotes/QuoteView.vue';

export default {
    name: 'MovieQuoteOptionMenu',

    data() {
        return {
            isOpenQuoteViewModal: false,
        };
    },

    components: {
        DeleteTrashIcon,
        ViewDetailsIcon,
        EditPencilIcon,
        ThreeDotsOptionsIcon,
        QuoteView,
    },

    props: {
        modelValue: Boolean,
        quote: {
            type: Object,
            required: true,
        },
    },

    methods: {
        closeQuoteOptions() {
            this.$emit('closeQuoteOptions');
        },
        openQuoteViewModal() {
            this.isOpenQuoteViewModal = true;
            this.closeQuoteOptions();
        },
    },

    watch: {
        isOpenQuoteViewModal(newVal) {
            if (newVal) {
                document.body.classList.add('overflow-hidden');
            } else {
                document.body.classList.remove('overflow-hidden');
            }
        },
    },
};
</script>
