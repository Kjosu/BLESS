<template>
    <bless-input-wrapper
        v-bind="$props"
        :dropdown="showAutocomplete"
        :class="rootClasses"
        class="bless-input--textfield">
        <div class="bless-textfield">
            <label class="bless-textfield__label">
                {{ label }}
            </label>
            <input
                :id="id"
                v-model="internalValue"
                type="text"
                class="bless-textfield__input"
                :name="getName"
                :disabled="disabled"
                :placeholder="computedPlaceholder"
                @keydown.enter="onSubmit"
                @keydown="onKeyDown"
                @keyup="onKeyUp"
                @change="onChange"
                @focus="onFocus"
                @blur="onBlur">
        </div>
        <template #dropdown>
            <div
                v-for="(item, index) in autocompleteItems"
                :key="index"
                class="bless-textfield__autocomplete-item"
                @click="onAutocomplete(item)"
                @mousedown.prevent>
                {{ item }}
            </div>
        </template>
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
        name: String,
        autocompleteItems: {
            type: Array,
            default: undefined
        }
    },
    emits: ['keydown', 'keyup', 'change', 'submit'],
    computed: {
        getName() {
            return this.name || this.camelize(this.label);
        },
        showAutocomplete() {
            return this.autocompleteItems && this.autocompleteItems.length > 0 && this.isFocused;
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
        },
        onAutocomplete(item) {
            this.internalValue = item;
        },
        camelize(str) {
            return str?.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        }
    }
};
</script>
