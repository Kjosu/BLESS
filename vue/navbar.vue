<template>
    <div class="navbar">
        <div class="navbar__title">
            BLESS
            <span class="subtext p-xs-0_5">a beautiful less framework</span>
        </div>
        <div class="navbar__items fill-v">
            <bless-button
                v-for="(item, index) in items" :key="index" class="fill-v bless-button--nav" :label="item.label"
                :link="item.link" type="nav"
                :icon-type="item.iconType" :icon-modifier="item.iconModifier" :icon="item.icon" />
        </div>
    </div>
</template>

<script>
import blessButton from './button.vue';

export default {
    components: {
        blessButton
    },
    data() {
        return {
            items: [ 
                {label: 'Home', link: '/', icon: 'fa-house', iconType: 'fa-solid', iconModifier: 'fa-md'}, 
                {label: 'CSS', link: '#css', icon: 'fa-css3-alt', iconType: 'fa-brands', iconModifier: 'fa-lg'}, 
                {label: 'Less', link: '#less', icon: 'fa-less', iconType: 'fa-brands', iconModifier: 'fa-lg'}, 
                {label: 'Vue.js', link: '#vue', icon: 'fa-vuejs', iconType: 'fa-brands', iconModifier: 'fa-lg'}
            ]
        };
    },
    methods: {
    }
};
</script>
