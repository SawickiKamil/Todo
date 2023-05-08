<template>
    <BaseListItem v-bind="{ icon: mdiCalendarCheck }">
        <div class="task-list-item__title">
            {{ task.name }}

            <BaseChip
                v-if="!isSelected"
                :icon="mdiCheckUnderline"
                class="task-list-item__title__chip"
                small
                outlined
            >
                Selected
            </BaseChip>
        </div>

        <template #props>
            <BaseProp :icon="mdiTextBoxOutline" :title="task.description">
                {{ descriptionTruncated }}
            </BaseProp>

            <BaseProp :icon="mdiChartLineVariant" :title="'priority'">
                {{ priority }}
            </BaseProp>
        </template>

        <template #actions>
            <BtnSelect :id="task.id" v-bind="{ isSelected }" />
            <slot name="actions" />
        </template>
    </BaseListItem>
</template>

<script lang="ts">
import { ITask } from '@/models'
import {
    mdiHomeVariantOutline,
    mdiTextBoxOutline,
    mdiChartLineVariant,
    mdiCalendarCheck,
    mdiCheckUnderline,
} from '@mdi/js'
import { BaseProp, BaseListItem, BaseChip } from '@/components'
import { truncate } from '@/utils'
import { storeModuleSelectedTask } from '@/mixins'
import { BtnSelect } from './components'

export default storeModuleSelectedTask.extend({
    name: 'TaskListItem',

    components: { BaseProp, BaseListItem, BaseChip, BtnSelect },

    props: {
        task: {
            type: Object as () => ITask,
            required: true,
        },
    },

    data: () => ({
        mdiCalendarCheck,
        mdiChartLineVariant,
        mdiHomeVariantOutline,
        mdiTextBoxOutline,
        mdiCheckUnderline,
    }),

    computed: {
        priority(): number {
            return this.task.priority
        },

        descriptionTruncated(): string {
            return truncate(this.task.description, 26)
        },

        isSelected(): boolean {
            return this.currentSelectedId !== this.task.id
        },
    },
})
</script>

<style lang="sass" scoped>
.task-list-item__title
    display: flex
    align-items: center
    gap: 4px

    &__chip
        +margin-xxs(top, true)
        +margin-xxs(bottom, true)
</style>

