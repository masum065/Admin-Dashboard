import { AppBar, Button, Hidden, Toolbar, IconButton } from '@material-ui/core';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// material-ui icons
import Menu from '@material-ui/icons/Menu';
import MoreVert from '@material-ui/icons/MoreVert';
import ViewList from '@material-ui/icons/ViewList';
// core components
// nodejs library to set properties for components
import PropTypes from 'prop-types';
import React from 'react';
import AdminNavbarLinks from './AdminNavbarLinks';
import styles from './styles/adminNavbarStyles';

const useStyles = makeStyles(styles);

export default function AdminNavbar(props) {
    const classes = useStyles();
    const { brandText, miniActive, sidebarMinimize, handleDrawerToggle } = props;

    return (
        <AppBar className={classes.appBar}>
            <Toolbar className={classes.container}>
                <Hidden smDown implementation="css">
                    <div className={classes.sidebarMinimize}>
                        {miniActive ? (
                            <IconButton color="primary" onClick={sidebarMinimize}>
                                <ViewList className={classes.sidebarMiniIcon} />
                            </IconButton>
                        ) : (
                            <IconButton color="primary" onClick={sidebarMinimize}>
                                <MoreVert className={classes.sidebarMiniIcon} />
                            </IconButton>
                        )}
                    </div>
                </Hidden>
                <div className={classes.flex}>
                    {/* Here we create navbar brand, based on route name */}
                    <Button href="#" className={classes.title} color="default">
                        {brandText}
                    </Button>
                </div>
                <Hidden smDown implementation="css">
                    <AdminNavbarLinks />
                </Hidden>
                <Hidden mdUp implementation="css">
                    <IconButton
                        color="primary"
                        className={classes.appResponsive}
                        onClick={handleDrawerToggle}
                    >
                        <Menu />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
}

AdminNavbar.propTypes = {
    brandText: PropTypes.string.isRequired,
    miniActive: PropTypes.bool.isRequired,
    handleDrawerToggle: PropTypes.func.isRequired,
    sidebarMinimize: PropTypes.func.isRequired,
};
