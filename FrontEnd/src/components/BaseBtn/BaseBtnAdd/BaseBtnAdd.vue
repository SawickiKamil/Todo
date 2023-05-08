<template>
    <BaseBtn v-bind="$attrs" v-on="$listeners">
        <VIcon left>{{ mdiPlus }}</VIcon>

        <span>Add</span>
    </BaseBtn>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiPlus } from '@mdi/js'
import { BaseBtn } from '../BaseBtn'

export default Vue.extend({
    name: 'BaseBtnAdd',

    components: { BaseBtn },

    data: () => ({
        mdiPlus,
    }),
})
</script>
