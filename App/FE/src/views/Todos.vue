<template>
    <LayoutApp>
        <VMain class="todos__main">
            <div class="todos__main__content">
                <div class="todos__main__content__container">
                    <RouterView />
                </div>
            </div>
        </VMain>
    </LayoutApp>
</template>

<script lang="ts">
import Vue from 'vue'
import { LayoutApp } from '@/layouts'

export default Vue.extend({
    name: 'Todos',

    components: { LayoutApp },
})
</script>

<style lang="sass" scoped>
.todos
    &__main
        background-color: $app-background-color

        &__content
            display: flex
            flex-direction: column
            align-items: center
            min-height: 100%
            padding: $app-padding

            &__container
                flex: 1 1 auto
                display: flex
                flex-direction: column
                width: 100%
                max-width: $app-max-width
</style>
