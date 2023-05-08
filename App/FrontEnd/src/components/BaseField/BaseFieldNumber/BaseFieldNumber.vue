<template>
    <BaseFieldText v-model="valueComputed" v-bind="attrs" v-on="$listeners" />
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiNumeric1BoxMultipleOutline } from '@mdi/js'
import { BaseFieldText } from '../BaseFieldText'

export default Vue.extend({
    name: 'BaseFieldNumber',

    components: { BaseFieldText },

    model: {
        prop: 'value',
        event: 'update:value',
    },

    props: {
        min: {
            type: Number,
            default: -Number.MAX_VALUE,
        },
        max: {
            type: Number,
            default: Number.MAX_VALUE,
        },
        precision: {
            type: Number,
            default: 0,
            validator: (value: number): boolean => value >= 0,
        },
        value: Number as () => number | null,
        nullable: Boolean,
        label: String,
        prependInnerIcon: {
            type: String,
            default: mdiNumeric1BoxMultipleOutline,
        },
    },

    data: () => ({
        valueInternal: '',
        valueForRerender: '',
    }),

    computed: {
        attrs(): Record<string, unknown> {
            return {
                label: this.label,
                prependInnerIcon: this.prependInnerIcon,
                ...this.$attrs,
                ...(!this.nullable &&
                    this.value === 0 && { placeholder: '0', persistentPlaceholder: true }),
                type: 'text',
            }
        },

        valueComputed: {
            get(): string {
                return this.valueForRerender || this.valueInternal
            },
            set(value: string) {
                this.setValueInternal(value)
            },
        },
    },

    watch: {
        value: {
            immediate: true,
            handler(value: number) {
                if (value === parseFloat(this.valueInternal)) return

                this.valueInternal = this.value?.toString() ?? ''
            },
        },

        valueInternal: {
            immediate: true,
            handler(value: string) {
                this.$emit('update:value', this.parseValue(value))
            },
        },
    },

    methods: {
        parseValue(value: string): number | null {
            const sanitized = this.sanitizeValueString(value)
            const constraindedPrecision = this.constrainValuePrecision(sanitized)
            const numeric = parseFloat(constraindedPrecision)

            if (Number.isNaN(numeric)) {
                return this.nullable ? null : Math.max(0, this.min)
            }

            return this.constrainValueMinMax(numeric)
        },

        sanitizeValueString(value: string): string {
            let sanitized = value.replace(',', '.')
            // remove all characters except minus signs, digits and dots
            sanitized = sanitized.match(/-|\d{1,}|\./g)?.join('') ?? ''
            // remove all minus signs except if first char
            sanitized = sanitized.replace(/(?!^)-/g, '')
            // remove all dots except first
            sanitized = sanitized.replace(/(?<=(.*\..*))\./g, '')
            // insert leading zero if missing
            sanitized = sanitized.replace(/(?<!\d)\./g, '0.')

            return sanitized
        },

        constrainValuePrecision(value: string): string {
            const [whole, fraction] = value.split('.')

            if (!this.precision || !fraction) return whole

            return `${whole}.${fraction.slice(0, this.precision)}`
        },

        constrainValueMinMax(value: number): number {
            const constrainedMax = Math.min(value, this.max)

            return Math.max(constrainedMax, this.min)
        },

        async setValueInternal(value: string) {
            let parsedValue = this.parseValueInternal(value)

            if (parsedValue !== value) {
                this.valueForRerender = Math.random().toString()
                await this.$nextTick()
                this.valueForRerender = ''
            }

            this.valueInternal = parsedValue
        },

        parseValueInternal(rawValue: string): string {
            const rawNumber = parseFloat(rawValue)

            const isInRange = isNaN(rawNumber)
                ? true
                : this.constrainValueMinMax(rawNumber) === rawNumber

            if (!rawValue.length) return rawValue

            const isMatchingPattern = /^(-|\d{0,1})(\d{0,}\.{0,1}\d{0,})$/.test(rawValue)
            const hasLeadingZero = /^(-0|0)([0-9]{1,})/.test(rawValue)
            const [, fraction = ''] = rawValue.split('.')

            if (
                isMatchingPattern &&
                fraction.length <= this.precision &&
                isInRange &&
                !hasLeadingZero
            ) {
                return rawValue
            }

            return this.parseValue(rawValue)?.toString() ?? ''
        },
    },
})
</script>
