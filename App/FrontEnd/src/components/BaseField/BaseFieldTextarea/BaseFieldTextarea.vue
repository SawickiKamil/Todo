<script lang="ts">
import { VTextarea } from 'vuetify/lib'

export default VTextarea.extend({
    name: 'BaseFieldTextarea',

    props: {
        outlined: {
            type: Boolean,
            default: true,
        },
        hideDetails: {
            type: [Boolean, String],
            default: 'auto',
        },
        validateOnBlur: {
            type: Boolean,
            default: true,
        },
    },
})
</script>
