<template>
    <div class="bless-input">
        <div v-if="prependOuter" class="bless-input__prepend-outer">
            <div class="bless-input__icon bless-input__icon--prepend">
                <bless-icon v-bind="mapProp(prependOuter)" />
            </div>
        </div>
        <div class="bless-input__control">
            <div v-if="prependInner" class="bless-input__prepend-inner">
                <div class="bless-input__icon bless-input__icon--prepend">
                    <bless-icon v-bind="mapProp(prependInner)" />
                </div>
            </div>
            <div class="bless-input__slot">
                <slot />
            </div>
            <div v-if="appendInner" class="bless-input__append-inner">
                <div class="bless-input__icon bless-input__icon--append">
                    <bless-icon v-bind="mapProp(appendInner)" />
                </div>
            </div>
        </div>
        <div v-if="appendOuter" class="bless-input__append-outer">
            <div class="bless-input__icon bless-input__icon--append">
                <bless-icon v-bind="mapProp(appendOuter)" />
            </div>
        </div>
    </div>
</template>
<script>
import blessIcon from './icon';

export default {
    components: {
        blessIcon
    },
    props: {
        prependOuter: {
            type: [Object, String],
            default: undefined
        },
        prependInner: {
            type: [Object, String],
            default: undefined
        },
        appendOuter: {
            type: [Object, String],
            default: undefined
        },
        appendInner: {
            type: [Object, String],
            default: undefined
        }
    },
    methods: {
        mapProp(prop) {
            return prop instanceof Object ? prop : { icon: prop };
        }
    }
};
</script>
