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
import {Helmet} from "react-helmet";

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
				<Route path="/add-preview-app" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Add Preview App" 
							apiName='add-preview-app' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/preview/app/post.json'
						/>
					)
				}} />
				<Route path="/deploy-app-settings" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Deploy App Settings" 
							apiName='deploy-app-settings' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/preview/app/deploy/post.json'
						/>
					)
				}} />
				<Route path="/get-app-deploy-status" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Get App Deploy Status"
							apiName='get-app-deploy-status' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/preview/app/deploy/get.json'
						/>
					)
				}} />
				<Route path="/get-form-fields" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Get Form Fields" 
							apiName='get-form-fields' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/app/form/fields/get.json'
						/>
					)
				}} />
				<Route path="/add-form-fields" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Add Form Fields" 
							apiName='add-form-fields' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/preview/app/form/fields/post.json'
						/>
					)
				}} />
				<Route path="/update-form-fields" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Update Form Fields" 
							apiName='update-form-fields' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/preview/app/form/fields/put.json'
						/>
					)
				}} />
				<Route path="/delete-form-fields" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Delete Form Fields" 
							apiName='delete-form-fields' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/preview/app/form/fields/delete.json'
						/>
					)
				}} />
				<Route path="/get-form-layout" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Get Form Layout" 
							apiName='get-form-layout' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/preview/app/form/layout/get.json'
						/>
					)
				}} />
					<Route path="/update-form-layout" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Update Form Layout" 
							apiName='update-form-layout' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/preview/app/form/layout/put.json'
						/>
					)
				}} />
				<Route path="/get-views" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Get Views" 
							apiName='get-views' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/preview/app/views/get.json'
						/>
					)
				}} />
					<Route path="/update-views" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Update Views" 
							apiName='update-views' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/preview/app/views/put.json'
						/>
					)
				}} />
				<Route path="/get-general-settings" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Get General Settings" 
							apiName='get-general-settings' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/preview/app/settings/get.json'
						/>
					)
				}} />
					<Route path="/update-general-settings" exact={true} render={()=>{
					return(
						<RestAPI 
							title="Update General Settings" 
							apiName='update-general-settings' 
							setHeaderTitle={this.setHeaderTitle}
							schemaURL='apis/preview/app/settings/put.json'
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
				<Helmet>
					<title>Kintone API Explorer</title>
					<meta name="description" content="Some simple API Explorer to help developer" />
					<meta property="og:title" content="Kintone API Explorer"/>
					<meta property="og:description" content="Some simple API Explorer to help developer"/>
					<meta property="og:image" content="https://cybozu.vn/img/visual_bnr_02.png"/>
					<meta property="og:url" content={window.location.href}/>
				</Helmet>
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
