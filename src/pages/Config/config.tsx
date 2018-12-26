import * as React from 'react'
import {Paper, Typography, TextField, MenuItem, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Base64 } from 'js-base64';
import LocalConfig from 'src/services/LocalConfig';
import configType from '../../services/ConfigInterface'

const styles = (theme:any) => ({
    rootPaper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 5,
        paddingBottom: theme.spacing.unit * 5,
        minWidth: '30%'
    },
    root: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#67DBF1'
    },
    button: {
        marginTop: theme.spacing.unit * 2
    },
    formControl: {
        margin: theme.spacing.unit,
    }
});

interface ConfigState {
    domain: string
    errorDomain: string
    authType: string
    errorAuthType: string
    headerKey: string
    headerValue: string
    apiToken: string
    errorToken: string
    username: string
    errorUsername: string
    password: string,
    errorPassword: string
}


class ConfigPage extends React.Component<any,ConfigState> {
    constructor(props: any) {
        super(props)
        this.state = {
            domain: '',
            errorDomain: '',
            authType: '',
            errorAuthType: '',
            headerKey: '',
            headerValue: '',
            apiToken: '',
            errorToken: '',
            username: '',
            errorUsername: '',
            password: '',
            errorPassword: ''
        }
    }
    domainRef: any
    handleChange = (event:any) => {
        this.setState({ [event.target.name]: event.target.value } as ConfigState);
    };
    handleSubmit = ():void => {
        let hasError = false
        this.setState({
            errorDomain: '',
            errorAuthType: '',
            errorToken: '',
            errorUsername: '',
            errorPassword: ''
        })
        if (!this.state.domain) {
            hasError = true
            this.setState({
                errorDomain: 'Please provide your domain name'
            })
        }
        if (!this.state.authType) {
            hasError = true
            this.setState({
                errorAuthType: 'Please choose auth type'
            })
        }
        else {
            switch (this.state.authType) {
                case 'PASSWORD':
                    if (!this.state.username) {
                        hasError = true
                        this.setState({
                            errorUsername: 'Please provide your username'
                        })
                    }
                    if (!this.state.password) {
                        hasError = true
                        this.setState({
                            errorPassword: 'Please provide your password'
                        })
                    }
                    break;
                case 'API_TOKEN':
                    if (!this.state.apiToken) {
                        hasError = true
                        this.setState({
                            errorToken: 'Please provide your API Token'
                        })
                    }
                    break;
                default:
                    break;
            }
        }

        let configObj = {
            domain: this.state.domain,
            authType: this.state.authType,
            kintoneHeader: {}
        }
        if (configObj.authType === 'PASSWORD') {
            configObj.kintoneHeader = {
                'X-Cybozu-Authorization': Base64.encode(`${this.state.username}`)
            }
        }
        else if (configObj.authType === 'API_TOKEN') {
            configObj.kintoneHeader = {
                'X-Cybozu-API-Token': this.state.apiToken
            }
        }
        if (!hasError) {
            if (LocalConfig.config(configObj as configType)) {
                window.location.href = '/'
            }
        }
    }
    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Paper className={classes.rootPaper} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Configuration
                    </Typography>
                    <TextField
                        error={this.state.errorDomain !== ''}
                        label="Kintone Domain"
                        name="domain"
                        value={this.state.domain}
                        onChange={this.handleChange}
                        type="text"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        helperText = {(this.state.errorDomain)?(
                            <Typography component="span" color="inherit">
                                {this.state.errorDomain}
                            </Typography>
                            ):(null)
                        }
                    />
                    <TextField
                        error={this.state.errorAuthType !== ''}
                        select
                        name='authType'
                        label="Authentication Type"
                        value={this.state.authType}
                        onChange={this.handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        helperText = {(this.state.errorAuthType)?(
                            <Typography component="span" color="inherit">
                                {this.state.errorAuthType}
                            </Typography>
                            ):(null)
                        }
                    >
                        <MenuItem value={'PASSWORD'}>Password Authentication</MenuItem>
                        <MenuItem value={'API_TOKEN'}>API Token Authentication</MenuItem>
                    </TextField>
                    {
                        this.state.authType==='PASSWORD' && (
                            <div>
                                <TextField
                                    error={this.state.errorUsername !== ''}
                                    helperText = {(this.state.errorUsername)?(
                                        <Typography component="span" color="inherit">
                                            {this.state.errorUsername}
                                        </Typography>
                                        ):(null)
                                    }
                                    label="Kintone Username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    error={this.state.errorPassword !== ''}
                                    helperText = {(this.state.errorPassword)?(
                                        <Typography component="span" color="inherit">
                                            {this.state.errorPassword}
                                        </Typography>
                                        ):(null)
                                    }
                                    type="password"
                                    label="Kintone Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                />
                            </div>
                        )
                    }
                    {
                        this.state.authType==='API_TOKEN' && (
                            <TextField
                                error={this.state.errorToken !== ''}
                                helperText = {(this.state.errorToken)?(
                                    <Typography component="span" color="inherit">
                                        {this.state.errorToken}
                                    </Typography>
                                    ):(null)
                                }
                                label="API Token"
                                name="apiToken"
                                value={this.state.apiToken}
                                onChange={this.handleChange}
                                type="text"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                            />
                        )
                    }
                    <Button 
                        className={classes.button} 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        onClick={this.handleSubmit}
                    >
                        SUBMIT
                    </Button>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(ConfigPage);