import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/styles/hljs'
import {jsTemplate, JSAuthTemplate} from './CodeTemplates/template'
import LocalConfig from '../../../../services/LocalConfig'

interface APIRequestProps {
    request: any
}

const buildAuthCode = (): string => {
    let code = ''
    const localConfig = new LocalConfig()
    if (localConfig.authType === 'PASSWORD') {
        code = JSAuthTemplate.passwordAuth
                .replace('{{username}}', localConfig.username || '')
                .replace('{{password}}', localConfig.password || '')
    }
    else if (localConfig.authType === 'API_TOKEN') {
        code = JSAuthTemplate.apiTokenAuth
                .replace('{{apiToken}}', localConfig.apiToken || '')
    }
    else {
        code = JSAuthTemplate.basicAuth
    }
    return code
}

const replaceParams = (request: object, code:string):string => {
    let params = (request['method']==='GET')?(request['params'] || {}):(request['data'] || {});
    Object.keys(params).forEach((key)=>{
        if (typeof params[key] === 'object') {
            code = code.replace(`{{${key}}}`, JSON.stringify(params[key]))
        }
        else {
            code = code.replace(`{{${key}}}`, params[key])
        }
    })
    code = code.replace(/{{[a-zA-Z0-9]*}}/g,'')
    return code
}

class JSSDKRequest extends React.Component<APIRequestProps,any> {
    renderRequestTemplate = (request: object): string =>  {
        let requestSample: string = ''
        jsTemplate.some((template) => {
            if (template.path === request['path'] && template.method === request['method']) {
                requestSample = template.template
                return true
            }
            return false
        })
        
        return replaceParams(request, requestSample.replace('{{authTemplate}}',buildAuthCode()))
    }
    render() {
        const { request } = this.props;
        return(
            <SyntaxHighlighter 
                language='javascript' 
                style={vs2015}
                customStyle={{fontSize:'18px'}}
            >
                {this.renderRequestTemplate(request)}
            </SyntaxHighlighter>
        )
    }
}

export default JSSDKRequest