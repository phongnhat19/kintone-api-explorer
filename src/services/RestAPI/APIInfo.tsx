import LocalConfig from '../LocalConfig'
import axios from 'axios'
import nodeProxy from '../nodeProxy'
let localConfig = new LocalConfig()

interface APIListReturnType {
    baseUrl: string
    apis: object
}

interface APIInfoType {
    getAPIList: () => Promise<APIListReturnType>
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
    }
}

export default APIInfo