<script lang="ts">
import { VTextField } from 'vuetify/lib'

export default VTextField.extend({
    name: 'BaseFieldText',

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
