import * as React from 'react';
import { Drawer, Divider, Hidden, List, ListItem, ListItemText} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
const styles = (theme: any) => ({
    drawer: {
        [theme['breakpoints'].up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    toolbar: theme['mixins']['toolbar'],
    drawerPaper: {
        width: drawerWidth,
    },
    menuLink: {
        textDecoration: 'none',
        '&:hover': {
            color: 'white'
        }
    }
});

class Menu extends React.Component<any, any> {
    render(){
        const { classes, theme } = this.props;
        const drawer = (
            <div>
                <div className={classes['toolbar']} />
                <Divider />
                <List>
                    <Link to="/get-app" className={classes['menuLink']}>
                        <ListItem button>
                            <ListItemText primary={'Get App'} />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link to="/get-record" className={classes['menuLink']}>
                        <ListItem button>
                            <ListItemText primary={'Get Record'} />
                        </ListItem>
                    </Link>
                </List>
            </div>
        );
        return(
            <nav className={classes['drawer']}>
                <Hidden smUp implementation="css">
                    <Drawer
                        container={this.props.container}
                        variant="temporary"
                        anchor={theme['direction'] === 'rtl' ? 'right' : 'left'}
                        open={this.props.mobileOpen}
                        onClose={this.props.handleDrawerToggle}
                        classes={{
                            paper: classes['drawerPaper'],
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes['drawerPaper'],
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Menu);