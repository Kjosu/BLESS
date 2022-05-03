export default {
    props: {
        id: String,
        label: String,
        modelValue: {},
        disabled: Boolean
    },
    emits: ['update:modelValue', 'focus', 'blur'],
    data() {
        return {
            lazyValue: this.modelValue,
            isFocused: false
        };
    },
    computed: {
        rootClasses() {
            return {
                'bless-input--disabled': this.disabled,
                'bless-input--focused': this.isFocused,
                'bless-input--filled': this.isFilled,
                'bless-input--no-label': !this.label
            };
        },
        internalValue: {
            get() {
                return this.lazyValue;
            },
            set(value) {
                this.lazyValue = value;
                this.$emit('update:modelValue', value);
            }
        },
        isFilled() {
            return !!this.internalValue;
        }
    },
    watch: {
        modelValue(value) {
            this.lazyValue = value;
        }
    },
    methods: {
        onInput(e) {
            this.internalValue = e.target.value;
        },
        onFocus(e) {
            this.isFocused = true;
            this.$emit('focus', e);
        },
        onBlur(e) {
            this.isFocused = false;
            this.$emit('blur', e);
        }
    }
};
