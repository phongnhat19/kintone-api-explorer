import configType from './ConfigInterface'

class LocalConfig {
    public domain: string
    public fullURL: string
    public authType: 'PASSWORD' | 'API_TOKEN'
    public username?: string
    public password?: string
    public apiToken?: string
    private kintoneHeader: object
    private initiated = true
    constructor(configObj?: configType) {
        if (configObj) {
            this.domain = configObj.domain
            this.authType = configObj.authType
            this.kintoneHeader = Object.assign({}, configObj.kintoneHeader)
            let localObj = {
                domain: this.domain,
                authType: this.authType,
                kintoneHeader: this.kintoneHeader,
                username: this.username,
                password: this.password
            }
            localStorage.setItem('kintone-api-explorer-config', JSON.stringify(localObj))
        }
        else {
            let configString = localStorage.getItem('kintone-api-explorer-config') || ""
            try {
                let configJSON = JSON.parse(configString) as configType
                this.domain = configJSON.domain
                this.authType = configJSON.authType
                this.kintoneHeader = Object.assign({},configJSON.kintoneHeader)
                this.username = configJSON.username
                this.password = configJSON.password
                this.apiToken = configJSON.apiToken
            } catch (error) {
                this.initiated = false
            }
        }
        if (this.initiated) {
            let prefix = 'https://';
            if (this.domain.substr(0, prefix.length) !== prefix) {
                this.fullURL = prefix + this.domain;
            }
            else {
                this.fullURL = this.domain;
            }
            if (this.fullURL[this.fullURL.length] !== '/') {
                this.fullURL += '/'
            }
        }
    }

    public static config(configObj: configType): boolean {
        localStorage.setItem('kintone-api-explorer-config', JSON.stringify(configObj))
        return true
    }

    public clearConfig(): boolean {
        localStorage.removeItem('kintone-api-explorer-config')
        return true
    }

    public isConfiged():boolean {
        return !this.initiated
    }

    public getHeader(): object {
        return this.kintoneHeader
    }
}

export default LocalConfig