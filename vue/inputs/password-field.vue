<template>
    <bless-input-wrapper
        v-bind="$props"
        :class="rootClasses"
        class="bless-input--password"
        :append-inner="inputIcon">
        <div class="bless-textfield bless-textfield--password">
            <label class="bless-textfield__label">
                {{ label }}
            </label>
            <input
                :id="id"
                v-model="internalValue"
                :type="inputType"
                class="bless-textfield__input"
                :name="name"
                :disabled="disabled"
                :placeholder="computedPlaceholder"
                @keydown.enter="onSubmit"
                @keydown="onKeyDown"
                @keyup="onKeyUp"
                @change="onChange"
                @focus="onFocus"
                @blur="onBlur">
        </div>
    </bless-input-wrapper>
</template>
<script>
import inputMixin from '../mixins/input-mixin';
import placeholderMixin from '../mixins/placeholder-mixin';
import blessInputWrapper from './input-wrapper';

export default {
    components: {
        blessInputWrapper
    },
    mixins: [inputMixin, placeholderMixin],
    props: {
        name: String
    },
    emits: ['keydown', 'keyup', 'change', 'submit'],
    data() {
        return {
            showPassword: false
        };
    },
    computed: {
        inputType() {
            return this.showPassword ? 'text' : 'password';
        },
        inputIcon() {
            return {
                icon: this.showPassword ? 'fa-eye' : 'fa-eye-slash',
                click: this.toggle
            };
        }
    },
    methods: {
        toggle() {
            this.showPassword = !this.showPassword;
        },
        onSubmit() {
            this.$emit('submit');
        },
        onKeyDown(e) {
            this.$emit('keydown', e);
        },
        onKeyUp(e) {
            this.$emit('keyup', e);
        },
        onChange() {
            this.$emit('change', this.internalValue);
        }
    }
};
</script>
