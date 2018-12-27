import * as React from 'react';
import { Drawer, Divider, Hidden, List, ListItem, ListItemText, Collapse} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const drawerWidth = 240;
//let spacingUnit: any
const styles = (theme: any) =>{
    //spacingUnit = theme.spacing.unit * 2
    return {
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
        rootMenu:{
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        nested: {
            paddingLeft: theme.spacing.unit * 10,
        },
        menuLink: {
            textDecoration: 'none',
            '&:hover': {
                color: 'white'
            }
        }
    }
};

class Menu extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            openAppMenu: false,
            openRecordMenu: false,
            openSpaceMenu: false
        }
    }
    renderMenuByAPITree(classes: any) {
        return(
            <div>
                <List>
                    <ListItem button onClick={()=>{this.setState({openAppMenu: !this.state.openAppMenu})}}>
                        {this.state.openAppMenu ? <ExpandMore /> : <KeyboardArrowRight />}
                        <ListItemText primary="Apps" />
                    </ListItem>
                    <Collapse in={this.state.openAppMenu} timeout="auto" unmountOnExit>
                        <List>
                            <Link to="/get-app" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Get App'} />
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse>
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={()=>{this.setState({openRecordMenu: !this.state.openRecordMenu})}}>
                        {this.state.openRecordMenu ? <ExpandMore /> : <KeyboardArrowRight />}
                        <ListItemText primary="Records" />
                    </ListItem>
                    <Collapse in={this.state.openRecordMenu} timeout="auto" unmountOnExit>
                        <List>
                            <Link to="/get-record" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Get Record'} />
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse>
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={()=>{this.setState({openSpaceMenu: !this.state.openSpaceMenu})}}>
                        {this.state.openSpaceMenu ? <ExpandMore /> : <KeyboardArrowRight />}
                        <ListItemText primary="Spaces" />
                    </ListItem>
                    <Collapse in={this.state.openSpaceMenu} timeout="auto" unmountOnExit>
                        <List>
                            <Link to="/get-space" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Get Space'} />
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse>
                </List> 
            </div>
        )
    }
    render(){
        const { classes, theme } = this.props;
        const drawer = (
            <div>
                <div className={classes['toolbar']} />
                <Divider />
                {
                    this.renderMenuByAPITree(classes)
                }
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