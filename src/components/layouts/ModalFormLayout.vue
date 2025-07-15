<template>
    <Transition name="modal" appear>
        <div
            id="bgTransparent"
            class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
        >
            <div @click.stop class="bg-form-dark w-full max-w-lg py-11 md:mx-0 mx-10 rounded-md">
                <form class="w-full px-10 md:px-20">
                    <slot />
                </form>
            </div>
        </div>
    </Transition>
</template>

<script>
export default {
    name: 'ModalFormLayout',
};
</script>

<style>
#bgTransparent {
    background-color: rgba(0, 0, 0, 0.35);
}

.modal-enter-active,
.modal-leave-active {
    transition: all 0.22s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(1.08);
}
</style>
