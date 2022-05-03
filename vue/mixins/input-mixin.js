export default {
    props: {
        modelValue: {}
    },
    emits: ['update:modelValue'],
    data() {
        return {
            lazyValue: this.modelValue,
            isFocused: false
        };
    },
    computed: {
        rootClasses() {
            return {
                'bless-input--focused': this.isFocused,
                'bless-input--filled': this.isFilled
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
        onFocus() {
            this.isFocused = true;
        },
        onBlur() {
            this.isFocused = false;
        }
    }
};
