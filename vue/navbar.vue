<template>
    <div class="navbar">
        <div class="navbar__title">
            {{ title }}
            <span class="subtext p-xs-0_5">{{ subTitle }}</span>
        </div>
        <bless-input placeholder="Suche" :button-props="{ icon: 'fa-magnifying-glass' }" />
        <div class="navbar__items fill-v hide-on-xsmall-down">
            <bless-button
                v-for="(item, index) in items"
                :key="index"
                class="fill-v bless-button--nav"
                type="nav"
                :label="item.label"
                :link="item.link"
                :icon-type="item.iconType"
                :icon-modifier="item.iconModifier"
                :icon="item.icon" />
        </div>
    </div>
</template>

<script>
import blessInput from './input.vue';
import blessButton from './button.vue';

export default {
    components: {
        blessInput,
        blessButton
    },
    props: {
        title: String,
        subTitle: String,
        items: Array
    },
    data() {
        return {

        };
    },
    methods: {
    }
};
</script>
