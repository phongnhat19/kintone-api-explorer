import LocalConfig from '../LocalConfig'
import axios from 'axios'
import nodeProxy from '../nodeProxy'
let localConfig = new LocalConfig()

interface APIListReturnType {
    baseUrl: string
    apis: object
}

interface APISchemaReturnType {
    id: string
    baseUrl: string
    path: string
    httpMethod: string
    request: object
    response: object
    schemas: object
}

interface APIInfoType {
    getAPIList: () => Promise<APIListReturnType | any>
    getAPISchema: (schemaURL: string) => Promise<APISchemaReturnType | any>
}

let APIInfo: APIInfoType = {
    getAPIList: ():Promise<APIListReturnType | any> => {
        let body = {
            domain: localConfig.domain,
            path: 'apis.json',
            method: 'GET',
            proxy: {
                "host": "dc-ty3-squid-1.cb.local",
                "port": 3128
            }
        }
        return axios.post(`${nodeProxy.url}/request`,body)
        .then((response)=>{
            return response.data
        })
        .catch((error)=>{
            return error
        })
    },
    getAPISchema: (schemaURL: string):Promise<APISchemaReturnType | any> => {
        let body = {
            domain: localConfig.domain,
            path: schemaURL,
            method: 'GET',
            proxy: {
                "host": "dc-ty3-squid-1.cb.local",
                "port": 3128
            }
        }
        return axios.post(`${nodeProxy.url}/request`,body)
        .then((response)=>{
            return response.data
        })
        .catch((error)=>{
            return error
        })
    }
}

export {APISchemaReturnType}
export {APIListReturnType}

export default APIInfo