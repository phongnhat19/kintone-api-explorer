import * as React from 'react';
import {Paper, Table, TableBody, TableCell, TableRow, TableHead, TextField, Button, Typography, CircularProgress} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {APISchemaReturnType as Schema} from '../../../services/RestAPI/APIInfo'
import APIService from '../../../services/RestAPI/APIService'
import LocalConfig from '../../../services/LocalConfig'
import JSONTree from 'react-json-tree'

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
        this.state = stateObj
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
        this.setState({ [event.target.name]: event.target.value });
    };
    runAPI = async () => {
        let param = {}
        this.setState({
            loading: true,
            apiResult: null
        })
        Object.keys(this.props.schema.request['properties']).map((key)=>{
            param[key] = this.state[key]
        })
        let apiObj = {
            path: this.props.schema.path,
            method: this.props.schema.httpMethod,
            withHeader: true
        }
        if (apiObj.method === 'GET') {
            apiObj['params'] = param
        } else {
            apiObj['data'] = param
        }
        let result = await apiInstance.execute(apiObj)
        this.setState({
            apiResult: result,
            loading: false
        })
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
                    API Result
                </Typography>
                <JSONTree data={result} theme={theme} invertTheme={true} hideRoot={true} shouldExpandNode={() => true} />
            </div>
        )
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
                                            <TextField
                                                label="Value"
                                                value={(this.state)?(this.state[key]):("")}
                                                name={key}
                                                onChange={this.handleChange}
                                                margin="normal"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
                <Button onClick={this.runAPI} variant="contained" color="primary" className={classes.button}>
                    Call
                </Button>
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