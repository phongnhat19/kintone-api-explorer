import * as React from 'react';
import {Paper, Table, TableBody, TableCell, TableRow, TableHead, TextField, Button, Typography, CircularProgress} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {APISchemaReturnType as Schema} from '../../../services/RestAPI/APIInfo'
import APIService from '../../../services/RestAPI/APIService'
import LocalConfig from '../../../services/LocalConfig'
import JSONTree from 'react-json-tree'
import APIRequest from "src/pages/RestAPI/components/APIRequest";
import JSONInput from './InputField/JSONInput'

interface APIRunnerProps {
    schema: Schema,
    classes: any
}
const localConfig = new LocalConfig()
const apiInstance = new APIService({
    domain: localConfig.domain,
    kintoneHeader: localConfig.getHeader()
})

const styles = (theme:any) => ({
    paper: {
        paddingBottom: theme.spacing.unit * 4
    },
    table: {
        minWidth: 700,
    },
    button: {
        margin: theme.spacing.unit,
    }
});

class APIRunner extends React.Component<APIRunnerProps,any> {
    constructor(props: APIRunnerProps) {
        super(props)
        let stateObj = {}
        Object.keys(props.schema.request['properties']).forEach((key)=>{
            stateObj[key] = ""
        })
        this.state = {...stateObj,...{
            apiRequest: {
                path: props.schema.path,
                method: props.schema.httpMethod,
                withHeader: true
            }
        }}
    }
    componentDidUpdate(prevProps: APIRunnerProps) {
        if (prevProps.schema.id !== this.props.schema.id) {
            let stateObj = {}
            Object.keys(this.props.schema.request['properties']).forEach((key)=>{
                stateObj[key] = ""
            })
            this.setState(stateObj)
        }
    }
    handleChange = (event:any) => {
        this.setState({ [event.target.name]: event.target.value }, this.updateRequestState);
    };
    updateRequestState = async (run?: boolean) => {
        let param = {}
        Object.keys(this.props.schema.request['properties']).map((key)=>{
            if (this.state[key]) {
                if (typeof this.state[key] === 'object' && !(this.state[key] instanceof Array)) {
                    let objData = Object.assign({},this.state[key])
                    Object.keys(objData).forEach((objKey)=>{
                        objData[objKey] = {
                            value: objData[objKey].value
                        }
                    })
                    param[key] = objData
                }
                else {
                    param[key] = this.state[key]
                }
            }
        })
        let apiObj = this.state.apiRequest
        if (apiObj.method === 'GET') {
            apiObj['params'] = param
        } else {
            apiObj['data'] = param
        }
        this.setState({
            apiRequest: apiObj
        })
        if (run) {
            this.setState({
                loading: true
            })
            let result = await apiInstance.execute(apiObj)
            this.setState({
                apiResult: result,
                loading: false
            })
        }
    }
    runAPI = async () => {
        this.updateRequestState(true)
    }
    renderResult = (result: object) => {
        const theme = {
            scheme: 'monokai',
            author: 'wimer hazenberg (http://www.monokai.nl)',
            base00: '#272822',
            base01: '#383830',
            base02: '#49483e',
            base03: '#75715e',
            base04: '#a59f85',
            base05: '#f8f8f2',
            base06: '#f5f4f1',
            base07: '#f9f8f5',
            base08: '#f92672',
            base09: '#fd971f',
            base0A: '#f4bf75',
            base0B: '#a6e22e',
            base0C: '#a1efe4',
            base0D: '#66d9ef',
            base0E: '#ae81ff',
            base0F: '#cc6633'
          };
        return(
            <div style={{padding: 20}} >
                <Typography variant="h5" component="h3">
                    Response
                </Typography>
                <JSONTree data={result} theme={theme} invertTheme={false} hideRoot={true} shouldExpandNode={() => true} />
            </div>
        )
    }
    renderRequest = (request: object) => {
        const requestMeta = {
            "domain": apiInstance.domain,
            "headers": apiInstance.kintoneHeader
        }

        return(
            <APIRequest request={Object.assign({},{...request, ...requestMeta})}></APIRequest>
        )
    }
    handleUpdateArray = (value: Array<any>, statekey: string) => {
        let newStateObj = {}
        newStateObj[statekey] = value
        this.setState(newStateObj,()=>{
            this.updateRequestState(false)
        })
    }
    handleUpdateJSON = (value: object, statekey: string) => {
        this.setState({
            [statekey]: value
        },()=>{
            this.updateRequestState(false)
        })
    }
    renderInputField = (schema: Schema, key: string) => {
        if (schema.request['properties'][key]['type'] === 'array') {
            return <JSONInput 
                        value={(this.state && this.state[key])?(this.state[key]):([])} 
                        handleUpdate={this.handleUpdateArray}
                        statekey={key}
                    />
        }
        else if (schema.request['properties'][key]['type'] === 'object') {
            return <JSONInput 
                        value={(this.state && this.state[key])?(this.state[key]):({})} 
                        handleUpdate={this.handleUpdateJSON}
                        statekey={key}
                    />
        }
        else if (schema.request['properties'][key]['$ref'] === 'UpdateKey') {
            return <JSONInput 
                        value={(this.state && this.state[key])?(this.state[key]):({})} 
                        handleUpdate={this.handleUpdateJSON}
                        statekey={key}
                    />
        }
        else {
            return(
                <TextField
                    label="Value"
                    value={(this.state)?(this.state[key]):("")}
                    name={key}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="outlined"
                />
            )
        }
    }
    render(){
        const { classes } = this.props;
        return(
            <Paper className={classes.paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Required</TableCell>
                            <TableCell>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Object.keys(this.props.schema.request['properties']).map((key)=>{
                                return(
                                    <TableRow key={key}>
                                        <TableCell component="th" scope="row">
                                            <strong>
                                                {key}
                                            </strong>
                                        </TableCell>
                                        <TableCell>{this.props.schema.request['properties'][key]['type']}</TableCell>
                                        <TableCell>
                                            {
                                                (this.props.schema.request['required']) ? (
                                                (this.props.schema.request['required'].indexOf(key)!==-1)?(
                                                    <span>Required</span>
                                                ):("")
                                                ) : ("No")
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                this.renderInputField(this.props.schema, key)
                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
                <Button onClick={this.runAPI} variant="contained" color="primary" className={classes.button}>
                    Execute
                </Button>
                {
                    this.renderRequest(this.state.apiRequest)
                }
                {
                    this.state.apiResult && this.renderResult(this.state.apiResult)
                }
                {
                    this.state.loading && <CircularProgress size={20}/>
                }
            </Paper>
        )
    }
}

export default withStyles(styles)(APIRunner);