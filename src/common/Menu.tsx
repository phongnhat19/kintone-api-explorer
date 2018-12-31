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
            paddingLeft: theme.spacing.unit * 5,
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
                            <Link to="/get-apps" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Get Apps'} />
                                </ListItem>
                            </Link>
                            <Link to="/add-preview-app" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Add Preview App'} />
                                </ListItem>
                            </Link>
                            <Link to="/deploy-app-settings" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Deploy App Settings'} />
                                </ListItem>
                            </Link>
                            <Link to="/get-app-deploy-status" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Get App Deploy Status'} />
                                </ListItem>
                            </Link>
                            <Link to="/get-form-fields" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Get Form Fields'} />
                                </ListItem>
                            </Link>
                            <Link to="/add-form-fields" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Add Form Fields'} />
                                </ListItem>
                            </Link>
                            <Link to="/update-form-fields" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Update Form Fields'} />
                                </ListItem>
                            </Link>
                            <Link to="/delete-form-fields" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Delete Form Fields'} />
                                </ListItem>
                            </Link>
                            <Link to="/get-form-layout" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Get Form Layout'} />
                                </ListItem>
                            </Link>
                            <Link to="/update-form-layout" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Update Form Layout'} />
                                </ListItem>
                            </Link>
                            <Link to="/get-views" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Get Views'} />
                                </ListItem>
                            </Link>
                            <Link to="/update-views" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Update Views'} />
                                </ListItem>
                            </Link>
                            <Link to="/get-general-settings" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Get General Settings'} />
                                </ListItem>
                            </Link>
                            <Link to="/update-general-settings" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Update General Settings'} />
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
                            <Link to="/get-records" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Get Records'} />
                                </ListItem>
                            </Link>
                            <Link to="/add-record" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Add Record'} />
                                </ListItem>
                            </Link>
                            <Link to="/add-records" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Add Records'} />
                                </ListItem>
                            </Link>
                            <Link to="/update-record" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Update Record'} />
                                </ListItem>
                            </Link>
                            <Link to="/update-records" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Update Records'} />
                                </ListItem>
                            </Link>
                            <Link to="/delete-record" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Delete Record'} />
                                </ListItem>
                            </Link>
                            <Link to="/delete-records" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Delete Records'} />
                                </ListItem>
                            </Link>
                            <Link to="/get-comments" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Get Comments'} />
                                </ListItem>
                            </Link>
                            <Link to="/add-comment" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Add Comment'} />
                                </ListItem>
                            </Link>
                            <Link to="/delete-comment" className={classes['menuLink']}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={'Delete Comment'} />
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