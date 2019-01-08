import * as React from 'react';
import {Typography, Tabs, Tab} from '@material-ui/core';
import HTTPRequest from './RequestSample/HTTPRequest'
import CURLRequest from './RequestSample/CURLRequest'
import JSSDKRequest from './RequestSample/JSSDKRequest'

interface APIRequestProps {
    request: any
}

class APIRequest extends React.Component<APIRequestProps,any> {
    constructor(props: APIRequestProps) {
        super(props)
        this.state = {
            tab: 0
        }
    }
    handleChange = (event: any, value: number) => {
        this.setState({ tab: value });
    };
    render(){
        const { request } = this.props;
        if (request['method'] === 'GET') {
            delete request['headers']['Content-Type']
        }
        return(
            <div>
                <Typography variant="h5" component="h3" style={{padding: 20}} >
                    Request
                </Typography>
                <Tabs
                    value={this.state.tab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleChange}
                >
                    <Tab label="HTTP" />
                    <Tab label="CURL"/>
                    <Tab label="JS SDK" />
                </Tabs>
                <div style={{padding: 20}} >
                    {
                        this.state.tab===0 && <HTTPRequest request={request} />
                    }
                    {
                        this.state.tab===1 && <CURLRequest request={request} />
                    }
                    {
                        this.state.tab===2 && <JSSDKRequest request={request} />
                    }
                </div>
            </div>
        )
    }
}

export default APIRequest