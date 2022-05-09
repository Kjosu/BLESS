<template>
    <bless-input-wrapper
        v-bind="$props"
        :class="rootClasses"
        class="bless-input--number">
        <div class="bless-textfield bless-textfield--number">
            <label class="bless-textfield__label">
                {{ label }}
            </label>
            <input
                :id="id"
                v-model="internalValue"
                type="text"
                class="bless-textfield__input"
                :name="computedName"
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
    emits: ['keydown', 'keyup', 'change', 'submit'],
    watch: {
        internalValue(newValue, oldValue) {
            if (!newValue) return;

            if (isNaN(newValue) || isNaN(parseFloat(newValue))) {
                this.internalValue = oldValue;
            }
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
            this.$emit('change', this.internalValue);
        }
    }
};
</script>
