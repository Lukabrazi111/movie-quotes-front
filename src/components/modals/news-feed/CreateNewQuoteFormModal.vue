<template>
    <ModalLayout @click="toggleModal">
        <FormSection @submit="createQuote" novalidate class="w-full px-10 md:px-20"> </FormSection>
    </ModalLayout>
</template>

<script>
import ModalLayout from '@/components/layouts/ModalLayout.vue';
import { Form as FormSection } from 'vee-validate';

export default {
    name: 'CreateNewQuoteFormModal',
    components: { FormSection, ModalLayout },

    props: {
        modelValue: Boolean,
    },

    methods: {
        toggleModal() {
            return this.$emit('update:modelValue', !this.modelValue);
        },

        createQuote() {
            console.log('Create quote');
        },
    },
};
</script>
