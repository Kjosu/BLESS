<template>
    <component
        :is="rootComponent"
        class="bless-button"
        :class="rootClasses"
        :href="link"
        :disabled="isDisabled"
        :to="route"
        @click="click">
        <i v-if="showIcon" class="bless-button__icon" :class="iconClasses" />
        <div v-if="showLabel" class="bless-button__label">
            {{ label }}
        </div>
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
        iconModifier: String,
        isLoading: Boolean,
        type: String,
        route: String
    },
    emits: ['click'],
    computed: {
        isDisabled() {
            return this.disabled || this.isLoading;
        },
        isLinked() {
            return !!this.link;
        },
        isRouted() {
            return !!this.route;
        },
        rootComponent() {
            if(this.isLinked) {
                return 'a';
            } else if(this.isRouted) {
                return 'router-link';
            } else return 'button';
        },
        rootClasses() {
            const classes = {
                'bless-button--is-loading': this.isLoading,
                'bless-button--icon-only': this.iconOnly
            };

            if(this.type) {
                classes[`bless-button--${this.type}`] = true;
            }

            return classes;
        },
        iconClasses() {
            return [this.iconType, this.iconModifier, this.isLoading ? 'fa-spinner' : this.icon];
        },
        showLabel() {
            return this.label && !this.isLoading;
        },
        showIcon() {
            return this.icon || this.isLoading;
        },
        iconOnly() {
            return this.showIcon && !this.showLabel;
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
