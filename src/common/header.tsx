import * as React from 'react'
import {AppBar, Toolbar, IconButton, Typography, Fab} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings'
import { withStyles } from '@material-ui/core/styles';
import ConfigDialog from './ConfigDialog'

interface Props {
    title: string;
    handleDrawerToggle: () => void;
}

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
	fab: {
		margin: theme.spacing.unit,
	}
});

class Header extends React.Component<Props, any> {
	constructor(props: Props) {
		super(props)
		this.state = {
			openDialog: false
		}
	}
	reConfig = () => {
		/* localConfig.clearConfig()
		window.location.reload() */
		this.setState({
			openDialog: true
		})
	}
	handleClose = () => {
		this.setState({
			openDialog: false
		})
	}
    render() {
        const classes = this.props['classes'];
        return(
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.props.handleDrawerToggle}
                        className={classes.menuButton}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                        {this.props.title}
                    </Typography>
					<Fab size="small" aria-label="Config" className={classes.fab} onClick={this.reConfig}>
						<SettingsIcon />
					</Fab>
					<ConfigDialog open={this.state.openDialog} handleClose={this.handleClose} />
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Header);