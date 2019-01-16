export default interface configType {
    domain: string
    authType: 'PASSWORD' | 'API_TOKEN',
    kintoneHeader: object
    username?: string
    password?: string
    apiToken?: string
}