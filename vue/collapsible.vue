<template>
    <accordion v-bind="$props" :expanded="expanded" @toggle="toggle">
        <slot />
    </accordion>
</template>
<script>
import accordion from './accordion';

export default {
    components: {
        accordion
    },
    props: {
        initiallyExpanded: Boolean
    },
    data() {
        return {
            expanded: this.initiallyExpanded
        };
    },
    methods: {
        toggle() {
            this.expanded = !this.expanded;
        }
    }
};
</script>
