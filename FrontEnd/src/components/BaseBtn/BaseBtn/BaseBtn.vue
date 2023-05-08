<script lang="ts">
import { VBtn } from 'vuetify/lib'

export default VBtn.extend({
    name: 'BaseBtn',

    props: {
        depressed: {
            type: Boolean,
            default: true,
        },
        color: {
            type: String,
            default: 'primary',
        },
    },
})
</script>

<style lang="sass" scoped>
.v-btn
    letter-spacing: 0
    text-transform: none
    font-weight: 700
    min-width: 0 !important
</style>
