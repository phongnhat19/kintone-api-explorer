import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {CssBaseline, AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import Menu from './common/Menu'

import GetApp from './pages/RestAPI/Apps/GetApp'
import GetRecord from './pages/RestAPI/Records/GetRecord';

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
	}
});

class App extends React.Component<any, any> {
	constructor(props: any) {
        super(props)
        this.state = {
            mobileOpen: false
        }
	}
	handleDrawerToggle = () => {
        this.setState({
            mobileOpen: !this.state['mobileOpen']
        });
    };
	public render() {
		const { classes } = this.props;
		return (
			<Router>
				<div className={classes.root}>
					<CssBaseline/>
					<AppBar position="fixed" className={classes.appBar}>
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="Open drawer"
								onClick={this.handleDrawerToggle}
								className={classes.menuButton}
							>
							<MenuIcon />
							</IconButton>
							<Typography variant="h6" color="inherit" noWrap>
								Responsive drawer
							</Typography>
						</Toolbar>
					</AppBar>
					<Menu mobileOpen={this.state['mobileOpen']} handleDrawerToggle={this.handleDrawerToggle}/>
					<main className={classes.content}>
						<div className={classes.toolbar} />
						<Switch>
							<Route path="/get-app" exact={true} component={GetApp} />
							<Route path="/get-record" exact={true} component={GetRecord} />
						</Switch>
					</main>
				</div>
			</Router>
		);
	}
}

export default withStyles(styles, { withTheme: true })(App);
