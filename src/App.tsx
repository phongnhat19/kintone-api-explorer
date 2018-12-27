import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {CssBaseline, CircularProgress} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Menu from './common/Menu'

import RestAPI from './pages/RestAPI/RestAPITemplate'
import Header from './common/header';

import ConfigPage from './pages/Config/config'
import LocalConfig from './services/LocalConfig';

import APIInfoService from './services/RestAPI/APIInfo'

let currentConfig = new LocalConfig()

const drawerWidth = 240;
const styles = (theme:any) => ({
	root: {
	  	display: 'flex',
	},
	appBar: {
		marginLeft: drawerWidth,
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
		},
	},
	menuButton: {
		marginRight: 20,
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
	  	width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
	},
	progress: {
		margin: theme.spacing.unit * 2,
	}
});

let apiTree = {}

class App extends React.Component<any, any> {
	constructor(props: any) {
        super(props)
        this.state = {
			mobileOpen: false,
			title: 'Kintone API Explorer',
			loading: true
        }
	}
	handleDrawerToggle = ():void => {
        this.setState({
            mobileOpen: !this.state['mobileOpen']
        });
	};
	setHeaderTitle = (title: string):void => {
		this.setState({
			title: title
		})
	}
	componentDidMount = async () => {
		let apiList = await APIInfoService.getAPIList()
		apiList.apis && Object.keys(apiList.apis).forEach((key,id1)=>{
			let levelArray = key.split('/')
			let obj = {}
			for (let index = levelArray.length-1; index >= 0; index--) {
				if (index === levelArray.length-1) {
					obj[levelArray[index]] = apiList.apis[key]
				}
				else if (index === 0) {
					if (!apiTree[levelArray[index]]) {
						apiTree[levelArray[index]] = obj
					}
					else {
						apiTree[levelArray[index]][levelArray[index+1]] = obj[levelArray[index+1]]
					}
				}
				else {
					obj = {
						[levelArray[index]]: obj
					}
				}
			}
		})
		this.setState({
			loading: false
		})
	}
	renderRestAPIRoute = () => {
		return(
			<Switch>
				<Route path="/get-app" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Get App" 
							apiName='get-app' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/app/get.json'
						/>
					) 
				}} />
				<Route path="/get-apps" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Get Apps" 
							apiName='get-apps' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/apps/get.json'
						/>
					)
				}} />
				<Route path="/get-record" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Get Record" 
							apiName='get-record' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/record/get.json'
						/>
					)
				}} />
				<Route path="/get-records" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Get Records" 
							apiName='get-records' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/records/get.json'
						/>
					)
				}} />
				<Route path="/add-record" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Add Record" 
							apiName='add-record' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/record/post.json'
						/>
					)
				}} />
				<Route path="/add-records" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Add Record" 
							apiName='add-records' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/records/post.json'
						/>
					)
				}} />
				<Route path="/update-record" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Update Record" 
							apiName='update-record' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/record/put.json'
						/>
					)
				}} />
				<Route path="/update-records" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Update Records" 
							apiName='update-records' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/records/put.json'
						/>
					)
				}} />
				<Route path="/delete-record" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Delete Record" 
							apiName='delete-record' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/record/delete.json'
						/>
					)
				}} />
				<Route path="/delete-records" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Delete Records" 
							apiName='delete-records' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/records/delete.json'
						/>
					)
				}} />
				<Route path="/get-space" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Get Space" 
							apiName='get-space' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/space/get.json'
						/>
					)
				}} />
				<Route path="/get-comments" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Get Comments" 
							apiName='get-comments' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/record/comments/get.json'
						/>
					)
				}} />
				<Route path="/add-comment" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Add Comment" 
							apiName='add-comment' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/record/comment/get.json'
						/>
					)
				}} />
				<Route path="/delete-comment" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Delete Comment" 
							apiName='delete-comment' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/record/comment/delete.json'
						/>
					)
				}} />
			</Switch>
		)
	}
	public render() {
		const { classes } = this.props;
		if (currentConfig.isConfiged()) {
			return <ConfigPage/>
		}
		if (this.state.loading) {
			return(
				<div style={
					{
						width:'100vw', 
						height: '100vh', 
						display: 'flex', 
						alignItems: 'center', 
						justifyContent: 
						'center'
					}
				}>
					<CircularProgress className={classes.progress} />
				</div>
			)
		}
		return (
			<Router>
				<div className={classes.root}>
					<CssBaseline/>
					<Header title={this.state.title} handleDrawerToggle={this.handleDrawerToggle}/>
					<Menu mobileOpen={this.state['mobileOpen']} handleDrawerToggle={this.handleDrawerToggle} apiTree={apiTree}/>
					<main className={classes.content}>
						<div className={classes.toolbar} />
						{
							this.renderRestAPIRoute()
						}
						
					</main>
				</div>
			</Router>
		);
	}
}

export default withStyles(styles, { withTheme: true })(App);
