<script lang="ts">
import Vue from 'vue'
import { mergeData } from 'vue-functional-data-merge'

export default Vue.extend({
    name: 'BaseProps',

    functional: true,

    render(h, { data, children }) {
        const componentData = {
            staticClass: 'base-props',
        }
        const childNodes = children.filter((child) => !!child.tag)
        const items = childNodes.map((child) => {
            return h('div', { staticClass: 'base-props__content__item' }, [child])
        })

        return h('div', mergeData(data, componentData), [
            h('div', { staticClass: 'base-props__content' }, items),
        ])
    },
})
</script>

<style lang="sass">
.base-props
    position: relative

    &__content
        display: flex
        flex-wrap: wrap
        +margin-xs(left, true)
        +margin-xxs(top, true)

        &__item
            +padding-xs(left)
            +padding-xxs(top)
</style>
