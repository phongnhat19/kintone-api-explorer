import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import {Button, TextField, Select, MenuItem, InputLabel, FormControl} from '@material-ui/core'

const styles = (theme:any) => ({
    input: {
        margin: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200,
    },
});

interface kintoneFieldObj {
    type: string
    value: any
}

interface JSONInputProps {
    value: kintoneFieldObj
    statekey: string
    handleUpdate: (value: object, statekey: string) => void
    classes: any
}

class JSONInput extends React.Component<JSONInputProps,any> {
    constructor(props: JSONInputProps) {
        super(props)
        let arrayKV: Array<any> = []
        if (props.value) {
            Object.keys(props.value).forEach((key)=>{
                arrayKV.push({
                    key: key,
                    value: props.value.value,
                    type: props.value.type
                })
            })
        }
        this.state = {
            value: props.value || {},
            arrayKV: arrayKV,
            newKey: '',
            newValue: '',
            newType: ''
        }
    }
    handleChange = (event:any) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    renderNewFieldInput = (classes: any) => {
        return(
            <div>
                <TextField
                    className={classes.input}
                    label="Key"
                    value={this.state.newKey}
                    name={'newKey'}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-simple">Type</InputLabel>
                    <Select
                        value={this.state.newType}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'newType',
                            placeholder: 'Type'
                        }}
                    >
                        <MenuItem value={'string'}>String</MenuItem>
                        <MenuItem value={'number'}>Number</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    className={classes.input}
                    label="Value"
                    value={this.state.newValue}
                    name={'newValue'}
                    onChange={this.handleChange}
                    margin="normal"
                />
            </div>
        )
    }
    buildObject = (add: boolean) => {
        let arrayKV = this.state.arrayKV
        if (add) {
            arrayKV.push({
                key: this.state.newKey,
                value: this.state.newValue,
                type: this.state.newType
            })
        }
        let value = this.state.value
        arrayKV.forEach((kvObj:any)=>{
            value[kvObj.key] = {
                value: kvObj.value,
                type: kvObj.type
            }
        })
        this.props.handleUpdate(value, this.props.statekey)
        this.setState({
            arrayKV: arrayKV,
            newKey: '',
            newValue: '',
            newType: ''
        })
    }
    handleChangeArray = (e: any,index: number) => {
        let arrayKV = this.state.arrayKV
        arrayKV[index][e.target.name] = e.target.value
        this.setState({
            arrayKV: arrayKV
        }, () => this.buildObject(false))
    }
    renderValue = (classes: any) => {
        return this.state.arrayKV.map((kvObj: any, index: number)=>{
            return(
                <div key={`arrayKV-${index}`}>
                    <TextField
                        className={classes.input}
                        label="Key"
                        value={kvObj.key}
                        name={'key'}
                        onChange={(e) => this.handleChangeArray(e,index)}
                        margin="normal"
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Type</InputLabel>
                        <Select
                            value={kvObj.type}
                            onChange={(e) => this.handleChangeArray(e,index)}
                            inputProps={{
                                name: 'type',
                                placeholder: 'Type'
                            }}
                        >
                            <MenuItem value={'string'}>String</MenuItem>
                            <MenuItem value={'number'}>Number</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        className={classes.input}
                        label="Value"
                        value={kvObj.value}
                        name={'value'}
                        onChange={(e) => this.handleChangeArray(e,index)}
                        margin="normal"
                    />
                </div>
            )
        })
    }
    render() {
        const { classes } = this.props;
        return(
            <div className={classes.wrapper}>
                {
                    this.renderValue(classes)
                }
                {
                    this.renderNewFieldInput(classes)
                }
                <Button color="primary" className={classes.button} onClick={() => this.buildObject(true)}>
                    Add Field
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(JSONInput);