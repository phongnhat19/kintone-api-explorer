import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/styles/prism'

interface APIRequestProps {
    request: any
}

class CURLRequest extends React.Component<APIRequestProps,any> {
    buildHeaderHTTPRequest = (headers: object): String => {
        let headerString = ""
        Object.keys(headers).forEach(key => {
            if (headers[key]){
                headerString += `-H '${key}: ${headers[key]}' \\\n`
            }
        });
        return headerString
    }
    buildGETRequestParam = (params: object): string => {
        let queryString = ""
        Object.keys(params).forEach(key => {
            if (params[key]){
                if (queryString != "") {
                    queryString += "&"
                } else {
                    queryString += "?"
                }
                queryString += key + "=" + encodeURIComponent(params[key])
            }
        });
        return queryString
    }
    buildBodyString = (params: object): string => {
        let paramsObj = Object.assign({}, params)
        Object.keys(paramsObj).forEach((key)=>{
            if (!paramsObj[key]) {
                delete paramsObj[key]
            }
        })
        let bodyString = `-d '${JSON.stringify(paramsObj)}'`
        return bodyString
    }
    renderRequestTemplate = (request: object): string =>  {
        const headerStr = this.buildHeaderHTTPRequest(request['headers'])
        const params = request['params'] || {}
        const queryStr = this.buildGETRequestParam(params)
        const contentJSON = (request['method'] !== 'GET')?(`-H 'Content-type: application/json' \\\n`):('')
        const bodyData = request['data'] || {}
        const bodyString = (request['method'] !== 'GET')?(this.buildBodyString(bodyData)):('')
        let fullURL = `https://${request['domain']}/k/v1/${request['path']}${queryStr}`
        let requestSample: string = `curl -X ${request['method'] || 'GET'} \\\n ${contentJSON} ${headerStr} ${bodyString} '${fullURL}'`
        
        return requestSample
    }
    render() {
        const { request } = this.props;
        return <SyntaxHighlighter language='http' style={dark}>{this.renderRequestTemplate(request)}</SyntaxHighlighter>
    }
}

export default CURLRequest