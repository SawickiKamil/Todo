<template functional>
    <div class="layout-view-form">
        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'LayoutViewForm',
})
</script>

<style lang="sass" scoped>
.layout-view-form
    width: 100%
    max-width: $layout-view-form-max-width
    display: flex
    flex-direction: column
    margin: auto
</style>
