<template>
    <div class="bless-input">
        <div v-if="prependOuter" class="bless-input__prepend-outer" @click="handleClick($event, prependOuter)">
            <div class="bless-input__icon bless-input__icon--prepend">
                <bless-icon v-bind="mapProp(prependOuter)" />
            </div>
        </div>
        <div class="bless-input__control">
            <div v-if="prependInner" class="bless-input__prepend-inner" @click="handleClick($event, prependInner)">
                <div class="bless-input__icon bless-input__icon--prepend">
                    <bless-icon v-bind="mapProp(prependInner)" />
                </div>
            </div>
            <div class="bless-input__slot">
                <slot />
            </div>
            <div v-if="appendInner" class="bless-input__append-inner" @click="handleClick($event, appendInner)">
                <div class="bless-input__icon bless-input__icon--append">
                    <bless-icon v-bind="mapProp(appendInner)" />
                </div>
            </div>
            <div v-if="dropdown" class="bless-input__dropdown">
                <slot name="dropdown" />
            </div>
        </div>
        <div v-if="appendOuter" class="bless-input__append-outer" @click="handleClick($event, appendOuter)">
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
        },
        dropdown: Boolean
    },
    methods: {
        mapProp(prop) {
            return prop instanceof Object ? prop : { icon: prop };
        },
        handleClick(e, prop) {
            if (!(prop instanceof Object)) {
                return;
            }

            if (prop.click) {
                prop.click(e);
            }
        }
    }
};
</script>
