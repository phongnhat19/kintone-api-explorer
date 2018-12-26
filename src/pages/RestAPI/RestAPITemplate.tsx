import * as React from 'react';
import {Paper, Tabs, Tab} from '@material-ui/core'
import Description from './components/Description';

interface Props {
    setHeaderTitle: (title: string) => void
}

class RestAPITemplate extends React.Component<Props,any> {
    constructor(props: Props) {
        super(props)
        this.state = {
            tab: 0
        }
    }
    componentDidMount() {
        document.title = 'Get App'
        this.props.setHeaderTitle('Get App')
    }
    handleChange = (event: any, value: number) => {
        this.setState({ tab: value });
    };
    render() {
        return(
            <Paper square>
                <Tabs
                    value={this.state.tab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleChange}
                >
                    <Tab label="Run API" />
                    <Tab label="Description"/>
                    <Tab label="Permission" />
                </Tabs>
                {
                    this.state.tab===1 && <Description/>
                }
            </Paper>
        )
    }
}

export default RestAPITemplate