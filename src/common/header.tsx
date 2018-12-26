import * as React from 'react'
import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';

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
	}
});

class Header extends React.Component<Props, any> {
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
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Header);