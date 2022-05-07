export default {
    props: {
        placeholder: String,
        hidePlaceholderOnFocus: Boolean
    },
    data() {
        return {
            isFocused: false
        };
    },
    computed: {
        computedPlaceholder() {
            return this.hidePlaceholderOnFocus && this.isFocused ? '' : this.placeholder;
        }
    }
};
