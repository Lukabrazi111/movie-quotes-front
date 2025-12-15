<template>
    <div class="py-2 flex items-start space-x-4 rounded-lg">
        <div>
            <EditPencilIcon class="cursor-pointer" @click="$emit('edit-quote')" />
        </div>
        <span class="text-[#6C757D]">|</span>
        <div>
            <DeleteTrashIcon class="cursor-pointer" @click="$emit('delete-quote')" />
        </div>
    </div>
</template>

<script>
import EditPencilIcon from '@/components/icons/EditPencilIcon.vue';
import DeleteTrashIcon from '@/components/icons/DeleteTrashIcon.vue';

export default {
    components: { EditPencilIcon, DeleteTrashIcon },
    name: 'ActionOptions',
};
</script>
