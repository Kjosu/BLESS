<template>
    <i v-if="hasIcon" class="bless-icon" :class="rootClasses" />
</template>
<script>
export default {
    props: {
        icon: String,
        iconType: {
            type: String,
            default: 'fas'
        },
        iconModifier: String
    },
    computed: {
        rootClasses() {
            return [this.iconType, this.iconModifier,  this.icon];
        },
        hasIcon() {
            return !!this.icon;
        }
    }
};
</script>
