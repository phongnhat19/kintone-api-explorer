import * as React from 'react';
import {Paper, Tabs, Tab, CircularProgress} from '@material-ui/core'
import Description from './components/Description';
import APIRunner from './components/APIRunner'
import APIInfoService from '../../services/RestAPI/APIInfo'

interface Props {
    setHeaderTitle: (title: string) => void;
    apiName: string
    title: string,
    schemaURL: string
}

class RestAPITemplate extends React.Component<Props,any> {
    constructor(props: Props) {
        super(props)
        this.state = {
            tab: 0,
            schema: {},
            loading: true
        }
    }
    getSchema = async () => {
        let schema = await APIInfoService.getAPISchema(this.props.schemaURL)
        schema.id && this.setState({
            schema: schema
        })
        this.setState({
            loading: false
        })
    }
    componentDidMount() {
        document.title = this.props.title
        this.props.setHeaderTitle(this.props.title)
        this.getSchema()
    }
    componentDidUpdate() {
        if (document.title !== this.props.title) {
            this.setState({
                loading: true
            })
            document.title = this.props.title
            this.props.setHeaderTitle(this.props.title)
            this.getSchema()
        }
    }
    handleChange = (event: any, value: number) => {
        this.setState({ tab: value });
    };
    render() {
        if (this.state.loading) {
			return(
				<div style={
					{
						width:'100%', 
						height: '100%', 
						display: 'flex', 
						alignItems: 'center', 
						justifyContent: 'center'
					}
				}>
					<CircularProgress />
				</div>
			)
		}
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
                    this.state.tab===0 && <APIRunner schema={this.state.schema}/>
                }
                {
                    this.state.tab===1 && <Description schema={this.state.schema}/>
                }
            </Paper>
        )
    }
}

export default RestAPITemplate