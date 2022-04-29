<template>
    <div
        class="bless-sidenav"
        :class="rootClasses"
        :style="rootStyle">
        <div v-if="title" class="bless-sidenav__title">
            {{ title }}
        </div>
        <bless-button
            v-bind="buttonProps"
            class="bless-sidenav-toggle"
            icon="fa-arrow-right"
            :draggable="draggable"
            @click="toggle"
            @dragstart="onDragStart"
            @drag.prevent="onDrag"
            @dragend="onDragEnd"
            @touchstart="onDragStart"
            @touchmove.prevent="onDrag"
            @touchend="onDragEnd" />
        <div class="bless-sidenav__content">
            <slot />
        </div>
    </div>
</template>
<script>
import blessButton from './button';

const antiDragImage = document.createElement('div');
antiDragImage.classList.add('anti-drag-image');

export default {
    components: {
        blessButton
    },
    props: {
        title: String,
        initialState: String,
        buttonProps: Object,
        draggable: Boolean,
        keepToggleOutside: Boolean
    },
    data() {
        return {
            open: this.initialState === 'open',
            dragging: false,
            dragStartX: 0,
            x: 0
        };
    },
    computed: {
        rootClasses() {
            return {
                'bless-sidenav--open': this.open,
                'bless-sidenav--keep-toggle-outside': this.keepToggleOutside
            };
        },
        rootStyle() {
            if (!this.dragging) {
                return;
            }

            return {
                transform: `translateX(-${100 - this.x * 100}%)`,
                transition: 'none'
            };
        }
    },
    methods: {
        toggle() {
            this.open = !this.open;
        },
        onDragStart(e) {
            if (!this.draggable) {
                return;
            }

            if (e instanceof TouchEvent) {
                this.dragStartX = e.changedTouches[0].pageX;
            } else {
                e.dataTransfer.setDragImage(antiDragImage, 0, 0);
                e.dataTransfer.dropEffect = 'none';
                e.dataTransfer.effectAllowed = 'move';

                this.dragStartX = e.pageX;
            }

            this.x = this.open ? 1 : 0;
            this.dragging = true;
        },
        onDrag(e) {
            if (!this.dragging || e.pageX === 0) {
                return;
            }

            const x = (e instanceof TouchEvent) ? e.changedTouches[0].pageX : e.pageX;

            const diffX = (this.open ? -1 : 1) * (x - this.dragStartX);
            const diffXClamped = Math.max(Math.min(diffX, this.$el.clientWidth), 0);

            this.x = diffXClamped / this.$el.clientWidth;

            if (this.open) {
                this.x = 1 - this.x;
            }
        },
        onDragEnd() {
            if (!this.dragging) {
                return;
            }

            this.open = this.x > (this.open ? 0.75 : 0.25);
            this.dragStartX = 0;
            this.dragging = false;
        }
    }
};
</script>
