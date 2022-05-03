<template>
    <bless-input-wrapper v-bind="$props" :class="rootClasses" class="bless-input--textfield">
        <div class="bless-textfield">
            <label class="bless-textfield__label">
                {{ label }}
            </label>
            <input
                :id="id"
                v-model="internalValue"
                type="text"
                class="bless-textfield__input"
                :name="name"
                :disabled="disabled"
                :placeholder="computedPlaceholder"
                @focus="onFocus"
                @blur="onBlur"
                @keydown.enter="onSubmit"
                @keydown="onKeyDown"
                @keyup="onKeyUp"
                @change="onChange">
        </div>
    </bless-input-wrapper>
</template>
<script>
import inputMixin from './mixins/input-mixin';
import blessInputWrapper from './input-wrapper';

export default {
    components: {
        blessInputWrapper
    },
    mixins: [inputMixin],
    props: {
        placeholder: String,
        hidePlaceholderOnFocus: Boolean
    },
    emits: ['keydown', 'keyup', 'change', 'submit'],
    computed: {
        computedPlaceholder() {
            return this.hidePlaceholderOnFocus && this.focused ? '' : this.placeholder;
        }
    },
    methods: {
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
            this.$emit('change', this.value);
        }
    }
};
</script>
