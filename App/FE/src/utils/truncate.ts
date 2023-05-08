const SUFFIX = '...'

export function truncate(text: string, maxCharacters: number): string {
    if (text.length < maxCharacters) return text

    return [text.substring(0, maxCharacters - SUFFIX.length), SUFFIX].join('')
}
