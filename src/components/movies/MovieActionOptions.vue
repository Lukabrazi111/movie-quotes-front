<template>
    <div
        class="bg-[#24222F] px-4 py-2 flex items-center space-x-4 rounded-lg absolute top-0 right-0"
    >
        <div>
            <EditPencilIcon class="cursor-pointer" />
        </div>
        <span class="text-[#6C757D]">|</span>
        <div>
            <DeleteTrashIcon class="cursor-pointer" />
        </div>
    </div>
</template>

<script>
import EditPencilIcon from '@/components/icons/EditPencilIcon.vue';
import DeleteTrashIcon from '@/components/icons/DeleteTrashIcon.vue';

export default {
    name: 'MovieActionOptions',
    components: { DeleteTrashIcon, EditPencilIcon },
};
</script>
