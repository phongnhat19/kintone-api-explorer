import * as React from 'react'
import { WithContext as ReactTags } from 'react-tag-input';
import './arrayInputStyle.css'

const KeyCodes = {
    comma: 188,
    enter: 13,
}
const delimiters = [KeyCodes.comma, KeyCodes.enter];

interface ArrayInputProps {
    value: Array<any>
    handleUpdate: (value: Array<any>, statekey: string) => void
    statekey: string
}

class ArrayInput extends React.Component<ArrayInputProps,any> {
    constructor(props: ArrayInputProps) {
        super(props)
        this.state = {
            value: props.value
        }
    }
    handleAddition = (value: any) => {
        let newValue = [...this.state.value, value]
        this.setState({value: newValue},()=>{
            this.props.handleUpdate(this.state.value.map((item: object)=>{
                return item['text']
            }), this.props.statekey)
        });
    }
    handleDelete = (i: number) => {
        const { value } = this.state;
        this.setState({
            value: value.filter((tag:any, index:number) => index !== i),
        },()=>{
            this.props.handleUpdate(this.state.value, this.props.statekey)
        });
    }
    render() {
        return(
            <ReactTags 
                tags={this.state.value}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                delimiters={delimiters} 
                inline={false}
                placeholder="Add new value"
            />
        )
    }
}

export default ArrayInput