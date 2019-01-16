import * as React from 'react'
import JSONEditor, { JSONEditorOptions } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

interface kintoneFieldObj {
    type: string
    value: any
}

interface JSONInputProps {
    value: kintoneFieldObj
    statekey: string
    handleUpdate: (value: object, statekey: string) => void
    classes?: any
}

export default class JSONEditorDemo extends React.Component<JSONInputProps,any> {
    componentDidMount () {
        const options = {
            mode: 'tree',
            onChangeJSON: (json: object) => {
                this.props.handleUpdate(json, this.props.statekey)
            }
        };
    
        this['jsoneditor'] = new JSONEditor(this['container'], options as JSONEditorOptions);
        this['jsoneditor'].set(this.props.value);
    }
  
    componentWillUnmount () {
        if (this['jsoneditor']) {
            this['jsoneditor'].destroy();
        }
    }
  
    componentWillUpdate(nextProps: any) {
        this['jsoneditor'].update(nextProps.value);
    }
  
    render() {
        return (
            <div className="jsoneditor-react-container" ref={elem => this['container'] = elem} />
        );
    }
}