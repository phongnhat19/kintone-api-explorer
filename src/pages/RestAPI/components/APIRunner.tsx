import * as React from 'react';
import {Paper, Table, TableBody, TableCell, TableRow, TableHead} from '@material-ui/core';
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
    }
});

class APIRunner extends React.Component<APIRunnerProps,any> {
    render(){
        const { classes } = this.props;
        return(
            <Paper className={classes.paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
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
                                        <TableCell></TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

export default withStyles(styles)(APIRunner);