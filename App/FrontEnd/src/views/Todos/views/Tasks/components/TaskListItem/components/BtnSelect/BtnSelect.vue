<template>
    <BaseBtn v-if="isSelected" @click="setCurrentTaskId(id)" text>
        <VIcon left>{{ mdiCheck }}</VIcon>

        Select
    </BaseBtn>
</template>

<script lang="ts">
import { storeModuleSelectedTask } from '@/mixins'
import { mdiCheck } from '@mdi/js'
import { BaseBtn } from '@/components'

export default storeModuleSelectedTask.extend({
    name: 'BtnSelect',

    components: { BaseBtn },

    props: {
        id: {
            type: String,
            required: true,
        },
        isSelected: Boolean,
    },

    data: () => ({
        mdiCheck,
    }),
})
</script>

<style scoped>
</style>