<template>
    <header>
        <BaseContainer>
            <nav class="flex items-center justify-between px-4 py-6">
                <div>
                    <h1 class="text-cream uppercase text-md font-helvetica font-normal">
                        Movie quotes
                    </h1>
                </div>

                <div class="flex items-center space-x-6 text-white">
                    <!-- Slot: nav content -->
                    <slot name="nav-content" />
                </div>
            </nav>

            <!-- Slot: header content -->
            <slot name="header-content" />
        </BaseContainer>
    </header>
</template>

<script>
import BaseContainer from '@/components/BaseContainer.vue';
import { useAuthStore } from '@/stores/user/auth.js';
import { mapStores } from 'pinia';

export default {
    name: 'HeaderLayout',
    components: { BaseContainer },

    computed: {
        ...mapStores(useAuthStore, ['isAuthenticated']),
    },
};
</script>
