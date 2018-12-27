import * as React from 'react'
import {AppBar, Toolbar, IconButton, Typography, Fab} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings'
import { withStyles } from '@material-ui/core/styles';
import LocalConfig from '../services/LocalConfig'

interface Props {
    title: string;
    handleDrawerToggle: () => void;
}

const localConfig = new LocalConfig()

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
	reConfig = () => {
		localConfig.clearConfig()
		window.location.reload()
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
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Header);