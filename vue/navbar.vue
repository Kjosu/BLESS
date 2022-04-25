<template>
    <div class="navbar">
        <div class="navbar__title">
            {{ title }}
            <span class="subtext p-xs-0_5">{{ subTitle }}</span>
        </div>
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
import blessButton from './button.vue';

export default {
    components: {
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
