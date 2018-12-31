import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/styles/prism'
import {Typography} from '@material-ui/core';

interface APIRequestProps {
    classes: any
}

class APIRequest extends React.Component<APIRequestProps,any> {
    constructor(props: APIRequestProps) {
        super(props)
        let stateObj = {}
        this.setState(stateObj)
    }
    
    renderRequestTemplate = (request: object) =>  {
        const methodRequest = request['method']
        var requestSample: String = ""
        switch ( methodRequest ) {
            case 'GET':
                requestSample = this.renderGetRequest(request)
                break
            case 'POST':
            default:
        }
        return requestSample
    }
    buildGETRequestParam = (params: object): String => {
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

    renderGetRequest = (request: object): String => {
        const methodRequest = request['method']
        const params = request['params']
        const queryStr = this.buildGETRequestParam(params)
        const headerStr = this.buildHeaderHTTPRequest(request['headers'])
        var requestSample = `${methodRequest} /k/v1/${request['path']}${queryStr}\nHost: https://${request['domain']}\n${headerStr}
                            `
        return requestSample
    }
    render(){
        const { classes } = this.props;
        return(
            <div style={{padding: 20}} >
                <Typography variant="h5" component="h3">
                    Request
                </Typography>
                <SyntaxHighlighter language='http' style={dark}>{this.renderRequestTemplate(classes)}</SyntaxHighlighter>
            </div>
        )
    }
}

export default APIRequest