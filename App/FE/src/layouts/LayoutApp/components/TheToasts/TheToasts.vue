<template>
    <div class="the-toast">
        <div class="the-toast__container">
            <ToastItem v-for="toast in toastsReversed" :key="toast.uuid" v-bind="{ toast }" />
        </div>
    </div>
</template>
<script lang="ts">
import { Toast } from '@/models'
import { mixins } from '@/utils'
import { storeModuleToasts } from '@/mixins'
import { ToastItem } from './ToastItem'

export default mixins(storeModuleToasts).extend({
    name: 'TheToasts',

    components: { ToastItem },

    computed: {
        toastsReversed(): Toast[] {
            return [...this.toasts].reverse()
        },
    },
})
</script>

<style lang="sass" scoped>
.the-toast
    +fixed(0, 0, 0, 0)
    +padding
    display: flex
    flex-direction: column
    justify-content: flex-end
    pointer-events: none
    z-index: $z-index-toasts

    &__container
        width: 100%
        max-width: 420px
        max-height: 100vh
        margin: 0 auto
        pointer-events: auto
        overflow-y: auto
</style>
