<template>
    <BaseBtn v-bind="$attrs" text v-on="$listeners">
        <VIcon left>{{ mdiPlus }}</VIcon>

        <span> Add new </span>
    </BaseBtn>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiPlus } from '@mdi/js'
import { BaseBtn } from '../BaseBtn'

export default Vue.extend({
    name: 'BaseBtnAddNew',

    components: { BaseBtn },

    data: () => ({
        mdiPlus,
    }),
})
</script>
