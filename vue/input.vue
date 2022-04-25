<template>
    <div class="bless-input" :class="rootClasses">
        <input
            :id="id"
            :value="modelValue"
            :type="type"
            :name="name"
            :disabled="disabled"
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
        buttonProps: {
            type: Object,
            default: () => undefined
        }
    },
    emits: ['input', 'focus', 'blur', 'keydown', 'keyup', 'change', 'submit', 'update:modelValue'],
    data() {
        return {
            focused: false
        };
    },
    computed: {
        rootClasses() {
            return {
                'bless-input--disabled': this.disabled,
                'bless-input--focused': this.focused,
                'bless-input--filled': this.isFilled
            };
        },
        isFilled() {
            return !!this.modelValue;
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
            this.$emit('change', this.modelValue);
        }
    }
};
</script>
