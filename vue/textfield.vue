<template>
    <bless-input-wrapper v-bind="$props" :class="rootClasses" class="bless-input--textfield">
        <div class="bless-textfield">
            <label class="bless-textfield__label">
                {{ label }}
            </label>
            <input
                v-model="internalValue"
                type="text"
                class="bless-textfield__input"
                @focus="onFocus"
                @blur="onBlur">
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
        label: String
    }
};
</script>
