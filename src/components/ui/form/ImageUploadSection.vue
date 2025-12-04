<template>
    <div class="border px-3 py-4 border-[#6C757D]">
        <div v-show="!image" class="flex justify-start items-center space-x-4">
            <CameraIcon />
            <span>Drag & drop your image here or</span>
            <label
                :for="inputId"
                type="button"
                class="bg-[#9747FF66] px-2 py-1 rounded cursor-pointer"
            >
                <input
                    type="file"
                    :id="inputId"
                    name="image"
                    class="hidden"
                    @change="handleImageUpload"
                />
                Choose file
            </label>
        </div>

        <div v-show="image" class="flex justify-start items-start space-x-4">
            <div class="object-cover object-center rounded flex-1">
                <img
                    :src="imagePreview"
                    alt="image-preview"
                    class="w-full max-w-52 object-cover object-center rounded"
                />
            </div>
            <div class="flex flex-col items-center justify-center my-auto flex-1 space-y-3">
                <h1 class="text-cream font-bold text-lg uppercase">Replace image</h1>
                <div class="flex items-center space-x-2">
                    <CameraIcon />
                    <span>Drag & drop your image here or</span>
                </div>
                <label
                    :for="replaceInputId"
                    type="button"
                    class="bg-[#9747FF66] px-2 py-1 rounded cursor-pointer"
                >
                    <input
                        type="file"
                        :id="replaceInputId"
                        class="hidden"
                        accept="image/*"
                        @change="handleImageUpload"
                    />
                    Choose file
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import CameraIcon from '@/components/icons/news-feed/CameraIcon.vue';

export default {
    name: 'ImageUploadSection',
    components: {
        CameraIcon,
    },

    props: {
        image: {
            type: [File, String, null],
            required: true,
        },
    },

    data() {
        return {
            imagePreview: null,
            uniqueId: `image-upload-${Math.random().toString(36).substring(2, 9)}`,
        };
    },

    computed: {
        inputId() {
            return `${this.uniqueId}-input`;
        },
        replaceInputId() {
            return `${this.uniqueId}-replace`;
        },
    },

    watch: {
        image(newImage) {
            this.updateImagePreview(newImage);
        },
    },

    mounted() {
        this.updateImagePreview(this.image);
    },

    beforeUnmount() {
        this.cleanupImagePreview();
    },

    methods: {
        updateImagePreview(imageFile) {
            this.cleanupImagePreview();

            if (imageFile && imageFile instanceof File) {
                this.imagePreview = URL.createObjectURL(imageFile);
            } else if (imageFile && typeof imageFile === 'string') {
                this.imagePreview = imageFile;
            } else {
                this.imagePreview = null;
            }
        },

        cleanupImagePreview() {
            if (this.imagePreview) {
                URL.revokeObjectURL(this.imagePreview);
                this.imagePreview = null;
            }
        },

        handleImageUpload(event) {
            const file = event.target.files[0] || null;
            this.$emit('update:image', file);
        },
    },
};
</script>
