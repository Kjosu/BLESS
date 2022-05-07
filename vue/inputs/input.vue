<template>
    <div class="bless-input" :class="rootClasses" v-bind="$props">
        <input
            :id="id"
            :value="value"
            :type="type"
            :name="name"
            :disabled="disabled"
            :placeholder="computedPlaceholder"
            class="bless-input__input"
            @focus="onFocus"
            @blur="onBlur"
            @keydown.enter="onSubmit"
            @keydown="onKeyDown"
            @keyup="onKeyUp"
            @change="onChange"
            @input="onInput">
        <label v-if="label" class="bless-input__label">
            {{ label }}
        </label>
        <bless-button
            v-if="buttonProps"
            class="bless-input__button"
            v-bind="buttonProps"
            @click="onSubmit" />
    </div>
</template>
<script>
import blessButton from './button';

export default {
    components: {
        blessButton
    },
    props: {
        modelValue: {},
        modelModifiers: {
            type: Object,
            default: () => ({})
        },
        type: {
            type: String,
            default: 'text'
        },
        id: String,
        name: String,
        label: String,
        disabled: Boolean,
        placeholder: String,
        hidePlaceholderOnFocus: Boolean,
        buttonProps: {
            type: Object,
            default: () => undefined
        }
    },
    emits: ['input', 'focus', 'blur', 'keydown', 'keyup', 'change', 'submit', 'update:modelValue'],
    data() {
        return {
            focused: false,
            value: this.modelValue
        };
    },
    computed: {
        rootClasses() {
            return {
                'bless-input--disabled': this.disabled,
                'bless-input--focused': this.focused,
                'bless-input--filled': this.isFilled,
                'bless-input--no-label': !this.label
            };
        },
        isFilled() {
            return !!this.value;
        },
        computedPlaceholder() {
            return this.hidePlaceholderOnFocus && this.focused ? '' : this.placeholder;
        }
    },
    watch: {
        modelValue(value) {
            this.value = value;
        }
    },
    methods: {
        onInput(e) {
            let value = e.target.value;

            if (this.modelModifiers.upperCase) {
                value = value.toUpperCase();
            } else if (this.modelModifiers.lowerCase) {
                value = value.toLowerCase();
            }

            this.value = value;
            this.$emit('update:modelValue', value);
        },
        onSubmit() {
            this.$emit('submit');
        },
        onFocus(e) {
            this.focused = true;
            this.$emit('focus', e);
        },
        onBlur(e) {
            this.focused = false;
            this.$emit('blur', e);
        },
        onKeyDown(e) {
            this.$emit('keydown', e);
        },
        onKeyUp(e) {
            this.$emit('keyup', e);
        },
        onChange() {
            this.$emit('change', this.value);
        }
    }
};
</script>
<style scoped lang="less">
@import 'src/bless/less/base/variables';

/* Block */
.bless-input {
    position: relative;
    display: flex;
    background-color: @color-neutral;
    height: 3rem;
}

/* Elements */
.bless-input__input {
    border: none;
    border-radius: 0;
    background: transparent;
    padding: 1rem 1rem 0.1rem;
    line-height: 1.6;
    font-size: 1rem;
    color: @color-text-light;
    width: 100%;

&::placeholder {
     color: @color-text-light;
     opacity: 1;
 }

&:focus {
     outline: none;
 }
}

.bless-input__label {
    position: absolute;
    top: 50%;
    left: 0.5rem;
    color: @color-text-light;
    padding-left: 0.5rem;
    transform: translateY(-50%);
    transition: top .2s ease;
    pointer-events: none;
}

.bless-input__button {
    padding: 1rem 1.5rem;
    height: 100%;
    background-color: @color-neutral;

&:hover {
     background-color: @color-neutral;
 }

&:active:hover {
     background-color: @color-neutral;
 }

&:disabled {
     cursor: default;
     background-color: @color-neutral;
     color: @color-text-disabled;
 }
}

/* Modifiers */
.bless-input--focused .bless-input__label,
.bless-input--filled .bless-input__label {
    top: 0.8rem;
    font-size: 0.7rem;
}

.bless-input--no-label {
.bless-input__input {
    padding: 0.5rem 1rem;
}
}
</style>
