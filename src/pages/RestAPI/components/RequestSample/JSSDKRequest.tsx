import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/styles/hljs'
import {jsTemplate} from './CodeTemplates/template'

interface APIRequestProps {
    request: any
}

class JSSDKRequest extends React.Component<APIRequestProps,any> {
    renderRequestTemplate = (request: object): string =>  {
        console.log(request)
        let requestSample: string = ''
        jsTemplate.some((template) => {
            if (template.path === request['path'] && template.method === request['method']) {
                requestSample = template.template
                return true
            }
            return false
        })
        
        return requestSample
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