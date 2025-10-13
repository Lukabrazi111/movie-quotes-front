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
    </div>
</template>

<script>
import ThreeDotsOptionsIcon from '@/components/icons/ThreeDotsOptionsIcon.vue';
import EditPencilIcon from '@/components/icons/EditPencilIcon.vue';
import ViewDetailsIcon from '@/components/icons/ViewDetailsIcon.vue';
import DeleteTrashIcon from '@/components/icons/DeleteTrashIcon.vue';

export default {
    name: 'MovieQuoteOptionMenu',
    components: { DeleteTrashIcon, ViewDetailsIcon, EditPencilIcon, ThreeDotsOptionsIcon },

    props: {
        modelValue: Boolean,
    },

    methods: {
        closeQuoteOptions() {
            this.$emit('closeQuoteOptions');
        },
    },
};
</script>
