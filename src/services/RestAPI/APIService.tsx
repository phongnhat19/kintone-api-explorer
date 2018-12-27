import axios from 'axios'
import nodeProxy from '../nodeProxy'
interface APIServiceInit {
    domain: string
    kintoneHeader?: object
}

interface ExecuteParam {
    path: string
    method: string
    withHeader: boolean
    params?: object
    data?: object
}

class APIService {
    public domain: string
    public kintoneHeader: object

    constructor(initObj: APIServiceInit) {
        this.domain = initObj.domain
        if (initObj.kintoneHeader) {
            this.kintoneHeader = initObj.kintoneHeader
        }
    }

    execute = async ({path, method, withHeader, params, data}: ExecuteParam): Promise<void> => {
        let body = {
            domain: this.domain,
            path: path,
            method: method
        }
        if (params) {
            body['params'] = params
        }
        if (data) {
            body['data'] = data
        }
        if (this.kintoneHeader && withHeader) {
            body['headers'] = this.kintoneHeader
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

export default APIService