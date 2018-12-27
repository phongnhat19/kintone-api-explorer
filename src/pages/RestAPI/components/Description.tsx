import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableRow, Paper} from '@material-ui/core';
import {APISchemaReturnType as Schema} from '../../../services/RestAPI/APIInfo'

interface DescriptionProps {
    schema: Schema
}

const styles = (theme:any) => ({
    table: {
        minWidth: 700,
    }
});

const Description = (props:DescriptionProps) => {
    //const { classes } = props;
    const rows = [
        {
            key: 'Method',
            value: props.schema.httpMethod
        },
        {
            key: 'URL',
            value: props.schema.baseUrl + props.schema.path
        },
        {
            key: 'URL (guest space)',
            value: (props.schema.baseUrl + props.schema.path).replace('/v1','/guest/{{SpaceID}}/v1')
        },
        {
            key: 'Authentication',
            value: 'API Token Authentication , Password Authentication'
        },
        {
            key: 'Content-Type',
            value: ''
        }
    ]
    return(
        <Paper >
            <Table >
                <TableBody>
                    {
                        rows.map(row => {
                            return (
                                <TableRow key={row.key}>
                                    <TableCell component="th" scope="row">
                                        <strong>
                                            {row.key}
                                        </strong>
                                    </TableCell>
                                    <TableCell>{row.value}</TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </Paper>
    )
}

export default withStyles(styles)(Description);