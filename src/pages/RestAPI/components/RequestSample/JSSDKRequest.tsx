import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/styles/prism'

interface APIRequestProps {
    request: any
}

class JSSDKRequest extends React.Component<APIRequestProps,any> {
    renderRequestTemplate = (request: object): string =>  {
        let requestSample: string = ""
        
        return requestSample
    }
    render() {
        const { request } = this.props;
        return <SyntaxHighlighter language='http' style={dark}>{this.renderRequestTemplate(request)}</SyntaxHighlighter>
    }
}

export default JSSDKRequest