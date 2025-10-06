<template>
    <Transition name="modal" appear>
        <div
            id="bgTransparent"
            class="fixed top-0 left-0 h-full w-full flex items-center justify-center z-50"
        >
            <div
                @click.stop
                class="bg-secondary-dark w-full max-w-2xl py-11 md:mx-0 mx-10 rounded-md fixed top-26"
            >
                <slot />
            </div>
        </div>
    </Transition>
</template>

<script>
export default {
    name: 'ModalLayout',
};
</script>

<style>
#bgTransparent {
    background-color: rgba(0, 0, 0, 0.35);
}

.modal-enter-active,
.modal-leave-active {
    transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(1.08);
}
</style>
