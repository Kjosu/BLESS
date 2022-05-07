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
        initiallyExpanded: Boolean,
        group: String
    },
    data() {
        return {
            expanded: this.initiallyExpanded
        };
    },
    mounted() {
        document.addEventListener('bless-accordion-group-toggle', this.handleAccordionGroupToggle);
    },
    methods: {
        toggle() {
            this.expanded = !this.expanded;

            document.dispatchEvent(new CustomEvent('bless-accordion-group-toggle', {
                detail: {
                    group: this.group,
                    sender: this,
                    expanded: this.expanded
                }
            }));
        },
        handleAccordionGroupToggle({ detail: { group, sender, expanded } }) {
            if (group !== this.group || sender === this || !expanded) {
                return;
            }

            this.expanded = false;
        }
    }
};
</script>
