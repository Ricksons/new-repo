export const documentInfo =  (to, from, next, documentInfo) => {
    document.title = documentInfo.pageTitle || process.env.VUE_APP_PUBLIC_TITLE
}

export default documentInfo
