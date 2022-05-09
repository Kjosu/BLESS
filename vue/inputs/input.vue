<template>
    <component :is="componentByType" v-bind="propsAndAttrs" />
</template>
<script>
import textField from './textfield';
import numberField from './number-field';
import passwordField from './password-field';
import emailField from './email-field';

export default {
    components: {
        textField,
        passwordField,
        numberField,
        emailField
    },
    props: {
        type: {
            type: String,
            default: 'text',
            validator: (value) => ['text', 'password', 'number', 'email'].indexOf(value) !== -1
        }
    },
    computed: {
        componentByType() {
            switch (this.type) {
                case 'password':
                    return passwordField;
                case 'number':
                    return numberField;
                case 'email':
                    return emailField;
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
