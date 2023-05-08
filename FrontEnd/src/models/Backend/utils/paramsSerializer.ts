import { stringify } from 'qs'

export function paramsSerializer(params: unknown) {
    return stringify(params, { arrayFormat: 'repeat' })
}
