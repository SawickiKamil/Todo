type TitleProvider = () => string

export function setDocumentTitle(title?: TitleProvider): void {
    const baseTitle = process.env.VUE_APP_BRAND_NAME || ''

    document.title = title ? `${title()} | ${baseTitle}` : baseTitle
}
