<template>
    <input-wrapper class="bless-input--checkbox" :class="rootClasses">
        <div class="bless-checkbox" :class="checkboxClasses">
            <label class="bless-checkbox__label">
                <div class="bless-checkbox__icon">
                    <icon :icon="computedIcon" />
                </div>
                <input
                    :id="id"
                    v-model="internalValue"
                    :name="computedName"
                    class="bless-checkbox__input"
                    type="checkbox"
                    :disabled="disabled">
                {{ label }}
            </label>
        </div>
    </input-wrapper>
</template>
<script>
import icon from '../icon';
import inputWrapper from './input-wrapper';
import inputMixin from '../mixins/input-mixin';

export default {
    components: {
        inputWrapper,
        icon
    },
    mixins: [inputMixin],
    props: {
        checkIcon: {
            type: [Object, String],
            default: 'fa-check'
        },
        position: {
            type: String,
            default: 'left',
            validator: (val) => ['top', 'right', 'bottom', 'left' ].indexOf(val) !== -1
        }
    },
    computed: {
        computedIcon() {
            return this.isFilled ? this.checkIcon : 'none';
        },
        checkboxClasses() {
            return [`bless-checkbox--${this.position}`];
        }
    }
};
</script>
