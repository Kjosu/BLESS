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
            :icon="toggleIcon"
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
import blessButton from './inputs/button';

const antiDragImage = document.createElement('div');
antiDragImage.classList.add('anti-drag-image');

export default {
    components: {
        blessButton
    },
    props: {
        title: String,
        initiallyOpened: Boolean,
        buttonProps: Object,
        draggable: Boolean,
        keepToggleOutside: Boolean,
        side: {
            type: String,
            default: 'left',
            validator: (val) => ['left', 'right', 'top', 'bottom'].indexOf(val) !== -1
        }
    },
    data() {
        return {
            open: this.initiallyOpened,
            dragging: false,
            dragStart: {
                x: 0,
                y: 0
            },
            transform: {
                x: 0,
                y: 0
            }
        };
    },
    computed: {
        rootClasses() {
            return [
                `bless-sidenav--${this.side}`,
                {
                    'bless-sidenav--open': this.open,
                    'bless-sidenav--keep-toggle-outside': this.keepToggleOutside
                }
            ];
        },
        rootStyle() {
            if (!this.dragging) {
                return;
            }

            let x = 0, y = 0;

            switch (this.side) {
                case 'left':
                    x = -(this.open ? this.transform.x : (1 - this.transform.x));
                    break;
                case 'right':
                    x = this.open ? this.transform.x : 1 - this.transform.x;
                    break;
                case 'top':
                    y = this.open ? -this.transform.y : -(1 - this.transform.y);
                    break;
                case 'bottom':
                    y = this.open ? this.transform.y : 1 - this.transform.y;
                    break;
            }

            return {
                transform: `translate(${x * 100}%, ${y * 100}%)`,
                transition: 'none'
            };
        },
        swipeAxis() {
            return this.side === 'left' || this.side === 'right' ? 'x' : 'y';
        },
        isNegativeAxis() {
            return this.side === 'left' || this.side === 'top';
        },
        toggleIcon() {
            return this.swipeAxis === 'x' ? 'fa-arrow-right' : 'fa-arrow-down';
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
                this.dragStart = {
                    x: e.changedTouches[0].pageX,
                    y: e.changedTouches[0].pageY
                };

                // iOS swipe navigation fix
                if (this.dragStart.x <= 10 || this.dragStart.x >= window.innerWidth - 10) {
                    return;
                } else {
                    e.preventDefault();
                }
            } else {
                e.dataTransfer.setDragImage(antiDragImage, 0, 0);
                e.dataTransfer.dropEffect = 'none';
                e.dataTransfer.effectAllowed = 'move';

                this.dragStart = {
                    x: e.pageX,
                    y: e.pageY
                };
            }

            this.transform.x = 0;
            this.transform.y = 0;

            this.dragging = true;
        },
        onDrag(e) {
            if (!this.dragging || e.pageX === 0) {
                return;
            }

            const diff = {};

            // Get coordinates
            if (e instanceof TouchEvent) {
                diff.x = e.changedTouches[0].pageX;
                diff.y = e.changedTouches[0].pageY;
            } else {
                diff.x = e.pageX;
                diff.y = e.pageY;
            }

            const swap = this.isNegativeAxis ? this.open : !this.open;

            // Get difference
            diff.x = swap ? this.dragStart.x - diff.x : diff.x - this.dragStart.x;
            diff.y = swap ? this.dragStart.y - diff.y : diff.y - this.dragStart.y;

            // Clamp
            diff.x = Math.max(Math.min(diff.x, this.$el.clientWidth), 0);
            diff.y = Math.max(Math.min(diff.y, this.$el.clientHeight), 0);

            // Make percentage
            diff.x /= this.$el.clientWidth;
            diff.y /= this.$el.clientHeight;

            this.transform.x = diff.x;
            this.transform.y = diff.y;
        },
        onDragEnd() {
            if (!this.dragging) {
                return;
            }

            const transformValue = this.swipeAxis === 'x' ? this.transform.x : this.transform.y;

            this.open = transformValue > 0.25 ? !this.open : this.open;
            this.dragStart = { x: 0, y: 0 };
            this.dragging = false;
        }
    }
};
</script>
