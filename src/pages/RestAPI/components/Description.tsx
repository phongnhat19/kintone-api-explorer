import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableRow, Paper} from '@material-ui/core';

const styles = (theme:any) => ({
    table: {
        minWidth: 700,
    }
});

const rows = [
    {
        key: 'Method',
        value: 'GET'
    },
    {
        key: 'URL',
        value: 'https://{{subdomain}}.kintone.com/k/v1/app.json'
    },
    {
        key: 'URL (guest space)',
        value: 'https://{{subdomain}}.kintone.com/k/guest/{{SpaceID}}/v1/app.json'
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

const Description = (props:any) => {
    //const { classes } = props;
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