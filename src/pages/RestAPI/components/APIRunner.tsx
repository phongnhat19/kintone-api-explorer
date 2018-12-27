import * as React from 'react';
import {Paper, Table, TableBody, TableCell, TableRow, TableHead, TextField, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {APISchemaReturnType as Schema} from '../../../services/RestAPI/APIInfo'

interface APIRunnerProps {
    schema: Schema,
    classes: any
}

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
        Object.keys(props.schema.request['properties']).map((key)=>{
            stateObj[key] = ""
        })
        this.state = stateObj
    }
    handleChange = (event:any) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    runAPI = () => {
        
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
                                                (this.props.schema.request['required'].indexOf(key)!==-1)?(
                                                    <span>Required</span>
                                                ):("")
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
            </Paper>
        )
    }
}

export default withStyles(styles)(APIRunner);