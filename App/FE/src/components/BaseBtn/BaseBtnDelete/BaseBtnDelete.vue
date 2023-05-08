<template>
    <BaseBtn v-click-outside="onClickOutside" v-bind="attrs" v-on="listeners">
        <VIcon :left="!btnIconOnly" :size="btnIconSize">{{ btnIcon }}</VIcon>

        <template v-if="!btnIconOnly">{{ computedLabel }}</template>
    </BaseBtn>
</template>

<script lang="ts">
import Vue from 'vue'
import { BaseBtn } from '../BaseBtn'
import { mdiTrashCan, mdiTrashCanOutline } from '@mdi/js'

export default Vue.extend({
    name: 'BaseBtnDelete',

    components: { BaseBtn },

    props: {
        text: Boolean,
        icon: Boolean,
        small: Boolean,
        color: String,
    },

    data: () => ({
        isClickedOnce: false,
    }),

    computed: {
        attrs(): Record<string, unknown> {
            return {
                ...this.$attrs,
                text: this.text && !this.isClickedOnce,
                small: this.small,
                icon: this.btnIconOnly,
                color: this.isClickedOnce ? 'error' : this.color || 'error',
            }
        },

        listeners(): Record<string, unknown> {
            return {
                ...this.$listeners,
                click: this.onClick,
            }
        },

        computedLabel(): string {
            return this.isClickedOnce ? 'Are you sure' : 'Delete'
        },

        btnIcon(): string {
            return this.isClickedOnce ? mdiTrashCan : mdiTrashCanOutline
        },

        btnIconSize(): number | undefined {
            return this.btnIconOnly && this.small ? 18 : undefined
        },

        btnIconOnly(): boolean {
            return this.icon && !this.isClickedOnce
        },
    },

    methods: {
        onClick() {
            if (!this.$listeners.click) return

            if (this.isClickedOnce) {
                const clickHandlers = Array.isArray(this.$listeners.click)
                    ? this.$listeners.click
                    : [this.$listeners.click]

                clickHandlers.forEach((handler) => handler())

                this.isClickedOnce = false
            } else {
                this.isClickedOnce = true
            }
        },

        onClickOutside() {
            this.isClickedOnce = false
        },
    },
})
</script>
