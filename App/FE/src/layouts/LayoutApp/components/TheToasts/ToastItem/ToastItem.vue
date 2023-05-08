<template>
    <div class="toast-item" :class="toastClass">
        <div class="toast-item__icon">
            <VIcon color="white">{{ icon }}</VIcon>
        </div>

        <div class="toast-item__text">
            {{ toast.message }}
        </div>

        <BaseBtn class="toast-item__btn-close" icon @click="closeHandler">
            <VIcon color="white">{{ mdiClose }}</VIcon>
        </BaseBtn>
    </div>
</template>

<script lang="ts">
import { Toast } from '@/models'
import { BaseBtn } from '@/components/BaseBtn'
import {
    mdiAlert,
    mdiAlertBoxOutline,
    mdiCheckBoxOutline,
    mdiInformationOutline,
    mdiClose,
} from '@mdi/js'
import { mixins } from '@/utils'
import { storeModuleToasts } from '@/mixins'

export default mixins(storeModuleToasts).extend({
    name: 'ToastItem',

    components: { BaseBtn },

    data: () => ({ mdiClose }),

    props: {
        toast: {
            type: Toast,
            required: true,
        },
    },

    computed: {
        icon(): string {
            const icons: Record<Toast['type'], string> = {
                error: mdiAlert,
                warning: mdiAlertBoxOutline,
                success: mdiCheckBoxOutline,
                primary: mdiInformationOutline,
            }

            return icons[this.toast.type]
        },

        toastClass(): string {
            return `toast-item--${this.toast.type}`
        },
    },

    async created() {
        if (!this.toast.timeout) return

        setTimeout(() => this.removeToast(this.toast.uuid), this.toast.timeout)
    },

    methods: {
        closeHandler(): void {
            this.removeToast(this.toast.uuid)
        },
    },
})
</script>

<style lang="sass" scoped>
.toast-item
    border: solid 1px rgba(map-get($grey, 'darken-4'), .2)
    border-radius: $border-radius-root
    display: flex
    +elevation(4)
    +padding-xxs

    &--primary
        background-color: map-get($primary, 'base')
    &--success
        background-color: map-get($success, 'base')
    &--error
        background-color: map-get($error, 'darken-1')
    &--warning
        background-color: map-get($warning, 'darken-4')

    & + &
        +margin-xs(top)

    & > *:not(:last-child)
        +margin-xs(left)

    &__text
        color: white
        flex: 1 1 auto
        word-break: break-word
        +padding-xs(top)
        +padding-xs(bottom)

    &__icon
        margin-top: 7px

    &__btn-close
        margin-top: 2px
</style>
