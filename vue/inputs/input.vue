<template>
    <component :is="componentByType" v-bind="propsAndAttrs" />
</template>
<script>
import textField from './textfield';
import passwordField from './password-field';

export default {
    components: {
        textField,
        passwordField
    },
    props: {
        type: {
            type: String,
            default: 'text',
            validator: (value) => ['text', 'password'].indexOf(value) !== -1
        }
    },
    computed: {
        componentByType() {
            switch (this.type) {
                case 'password':
                    return passwordField;
                default:
                    return textField;
            }
        },
        propsAndAttrs() {
            return Object.assign({}, this.$props, this.$attrs);
        }
    }
};
</script>
