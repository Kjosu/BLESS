<template>
    <div class="bless-accordion">
        <div class="bless-accordion__title" @click="toggle">
            {{ title }}
        </div>
        <transition
            name="expand"
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave">
            <div v-if="expanded" ref="content" class="bless-accordion__content">
                <slot />
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        expanded: Boolean
    },
    emits: ['toggle'],
    data() {
        return {
            height: 0
        };
    },
    computed: {
        content() {
            return this.$refs.content;
        }
    },
    methods: {
        toggle() {
            this.$emit('toggle');
        },
        enter(element) {
            const width = getComputedStyle(element).width;

            element.style.width = width;
            element.style.position = 'absolute';
            element.style.visibility = 'hidden';
            element.style.height = 'auto';

            const height = getComputedStyle(element).height;

            element.style.width = null;
            element.style.position = null;
            element.style.visibility = null;
            element.style.height = 0;

            // Force repaint to make sure the
            // animation is triggered correctly.
            getComputedStyle(element).height;

            requestAnimationFrame(() => {
                element.style.height = height;
            });
        },
        afterEnter(element) {
            element.style.height = 'auto';
        },
        leave(element) {
            const height = getComputedStyle(element).height;

            element.style.height = height;

            // Force repaint to make sure the
            // animation is triggered correctly.
            getComputedStyle(element).height;

            requestAnimationFrame(() => {
                element.style.height = 0;
            });
        }
    }
};
</script>
