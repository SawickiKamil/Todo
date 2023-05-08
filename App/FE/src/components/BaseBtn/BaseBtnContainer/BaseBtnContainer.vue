<script lang="ts">
import Vue from 'vue'
import { mergeData } from 'vue-functional-data-merge'
import { insertIf } from '@/utils'

export default Vue.extend({
    name: 'BaseBtnContainer',

    functional: true,

    props: {
        sm: Boolean,
        right: Boolean,
    },

    render(h, { data, props, children = [] }) {
        const componentData = {
            staticClass: 'base-btn-container',
        }
        const childNodes = children.filter((child) => !!child.tag)
        const items = childNodes.map((child) => {
            return h('div', { staticClass: 'base-btn-container__content__item' }, [child])
        })

        return h('div', mergeData(data, componentData), [
            h(
                'div',
                {
                    staticClass: [
                        'base-btn-container__content',
                        ...insertIf(props.sm, 'base-btn-container__content--sm'),
                        ...insertIf(props.right, 'base-btn-container__content--right'),
                    ].join(' '),
                },
                items
            ),
        ])
    },
})
</script>

<style lang="sass" scoped>
.base-btn-container
    position: relative

    &__content
        display: flex
        flex-wrap: wrap
        +margin-sm(left, true)
        +margin-sm(top, true)

        $root: &

        &--right
            justify-content: flex-end

        &__item
            flex: 0 0 auto
            +padding-sm(left)
            +padding-sm(top)

        &--sm
            +margin-xs(left, true)
            +margin-xs(top, true)

            #{$root}__item
                flex: 0 0 auto
                +padding-xs(left)
                +padding-xs(top)
</style>
