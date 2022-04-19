<template>
    <component
        :is="rootComponent"
        class="bless-button"
        :class="rootClasses"
        :href="link"
        :disabled="isDisabled"
        @click="click">
        <i v-if="showIcon" class="bless-button__icon" :class="iconClasses" />
        <div v-if="showLabel" class="bless-button__label" v-html="label" />
    </component>
</template>
<script>
export default {
    props: {
        link: String,
        disabled: Boolean,
        label: String,
        iconType: {
            type: String,
            default: 'fas'
        },
        icon: String,
        iconModifiers: String,
        isLoading: Boolean
    },
    emits: ['click'],
    computed: {
        isDisabled() {
            return this.disabled || this.isLoading;
        },
        isLinked() {
            return !!this.link;
        },
        rootComponent() {
            return this.isLinked ? 'a' : 'button';
        },
        rootClasses() {
            return {
                'bless-button--is-loading': this.isLoading
            };
        },
        iconClasses() {
            return [this.iconType, this.iconModifiers, this.isLoading ? 'fa-spinner' : this.icon];
        },
        showLabel() {
            return this.label && !this.isLoading;
        },
        showIcon() {
            return this.icon || this.isLoading;
        }
    },
    methods: {
        click() {
            if (this.isLinked) {
                return;
            }

            this.$emit('click');
        }
    }
};
</script>
