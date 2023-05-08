<script lang="ts">
import { VProgressCircular } from 'vuetify/lib'

export default VProgressCircular.extend({
    name: 'BaseSpinner',

    props: {
        color: {
            type: String,
            default: 'primary',
        },
        indeterminate: {
            type: Boolean,
            default: true,
        },
    },
})
</script>

<style lang="sass" scoped>
.v-progress-circular
    display: inline-block
    margin: auto
</style>
