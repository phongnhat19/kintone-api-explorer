import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/styles/prism'

interface APIRequestProps {
    request: any
}

class HTTPRequest extends React.Component<APIRequestProps,any> {
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
    buildHeaderHTTPRequest = (headers: object): String => {
        let headerString = ""
        Object.keys(headers).forEach(key => {
            if (headers[key]){
                headerString += `${key} : ${headers[key]}\n`
            }
        });
        return headerString
    }
    renderRequestTemplate = (request: object): string =>  {
        const methodRequest = request['method']
        var requestSample: string = ""
        switch ( methodRequest ) {
            case 'GET':
                requestSample = this.renderGetRequest(request)
                break
            case 'POST':
            default:
        }
        return requestSample
    }
    renderGetRequest = (request: object): string => {
        const methodRequest = request['method']
        const params = request['params']
        const queryStr = this.buildGETRequestParam(params)
        const headerStr = this.buildHeaderHTTPRequest(request['headers'])
        var requestSample = `${methodRequest} /k/v1/${request['path']}${queryStr}\nHost: https://${request['domain']}\n${headerStr}
                            `
        return requestSample
    }
    render() {
        const { request } = this.props;
        return <SyntaxHighlighter language='http' style={dark}>{this.renderRequestTemplate(request)}</SyntaxHighlighter>
    }
}

export default HTTPRequest;