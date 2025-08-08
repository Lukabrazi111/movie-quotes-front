<template>
    <div class="bg-[#11101A] rounded-lg px-5 py-4 space-y-4">
        <router-link :to="{ name: 'profile' }" class="flex items-center space-x-4 w-full py-1">
            <img
                class="w-full max-w-12 h-12 object-cover rounded-full"
                src="/src/assets/images/person.jpg"
                alt="profile-image"
            />
            <h3 class="text-lg">Luka Khangoshvili</h3>
        </router-link>

        <div>
            <p>
                “Follow your dream.”movie -
                <span class="text-cream font-bold">Billy Elliot.</span> <span>(2000)</span>
            </p>
        </div>

        <div>
            <img src="/src/assets/images/person.jpg" alt="image" class="rounded-lg" />
        </div>

        <div class="flex items-center space-x-6 border-b border-border-gray pb-3">
            <div class="flex items-center space-x-2">
                <span>3</span>
                <button>
                    <CommentIcon />
                </button>
            </div>
            <div class="flex items-center space-x-2">
                <span>3</span>
                <button>
                    <LikeIcon />
                </button>
            </div>
        </div>

        <!-- Comments -->
        <section class="pt-3">
            <div class="flex items-start space-x-5 border-border-gray pb-5">
                <router-link :to="{ name: 'profile' }" class="w-full max-w-12 h-12 -translate-y-3">
                    <img
                        class="w-full max-w-12 h-12 object-cover rounded-full"
                        src="/src/assets/images/person.jpg"
                        alt="profile-image"
                    />
                </router-link>
                <div class="border-b border-border-gray pb-4">
                    <h3 class="text-lg font-medium!">Luka Khangoshvili</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
                        delectus dolorum ducimus eaque explicabo facere fugit laudantium nemo
                        ratione totam.
                    </p>
                </div>
            </div>
        </section>

        <!-- Comment post -->
        <div class="flex items-center space-x-4">
            <router-link :to="{ name: 'profile' }" class="w-full max-w-12 h-12 transform">
                <img
                    class="w-full max-w-12 h-12 object-cover rounded-full"
                    src="/src/assets/images/person.jpg"
                    alt="profile-image"
                />
            </router-link>

            <div class="bg-[#24222F] w-full rounded-lg">
                <input
                    class="w-full py-2 px-3 focus:outline-0 placeholder:text-[#CED4DA]"
                    type="text"
                    placeholder="Write a comment"
                    name="comment"
                />
            </div>
        </div>
    </div>
</template>
<script>
import CommentIcon from '@/components/icons/news-feed/CommentIcon.vue';
import LikeIcon from '@/components/icons/news-feed/LikeIcon.vue';

export default {
    name: 'NewsItem',
    components: { LikeIcon, CommentIcon },
};
</script>
