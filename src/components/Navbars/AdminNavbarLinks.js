import React from 'react';
import classNames from 'classnames';
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/icons
import Person from '@material-ui/icons/Person';
import Notifications from '@material-ui/icons/Notifications';
import Dashboard from '@material-ui/icons/Dashboard';
import Search from '@material-ui/icons/Search';

import {
    TextField,
    IconButton,
    MenuItem,
    MenuList,
    ClickAwayListener,
    Paper,
    Grow,
    Hidden,
    Popper,
    Divider,
    makeStyles,
} from '@material-ui/core';
import styles from './styles/adminNavbarLinkStyles';

const useStyles = makeStyles(styles);

export default function HeaderLinks() {
    const [openNotification, setOpenNotification] = React.useState(null);
    const handleClickNotification = (event) => {
        if (openNotification && openNotification.contains(event.target)) {
            setOpenNotification(null);
        } else {
            setOpenNotification(event.currentTarget);
        }
    };
    const handleCloseNotification = () => {
        setOpenNotification(null);
    };
    const [openProfile, setOpenProfile] = React.useState(null);
    const handleClickProfile = (event) => {
        if (openProfile && openProfile.contains(event.target)) {
            setOpenProfile(null);
        } else {
            setOpenProfile(event.currentTarget);
        }
    };
    const handleCloseProfile = () => {
        setOpenProfile(null);
    };
    const classes = useStyles();
    const searchButton = `${classes.top} ${classes.searchButton}}`;
    const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover);

    const managerClasses = classNames({
        [classes.managerClasses]: true,
    });
    return (
        <div className={classes.root}>
            <TextField
                InputProps={{
                    classes: { root: classes.searchInputRoot, input: classes.srcInput },
                }}
                margin="dense"
                size="small"
                variant="filled"
                placeholder="search"
            />
            <IconButton color="primary" className={searchButton}>
                <Search className={`${classes.headerLinksSvg} ${classes.searchIcon}`} />
            </IconButton>
            <IconButton color="primary" className={classes.buttonLink}>
                <Dashboard className={`${classes.headerLinksSvg} ${classes.links}`} />
                <Hidden mdUp implementation="css">
                    <span className={classes.linkText}>Dashboard</span>
                </Hidden>
            </IconButton>
            <div className={managerClasses}>
                <IconButton
                    color="primary"
                    aria-owns={openNotification ? 'notification-menu-list' : null}
                    onClick={handleClickNotification}
                    className={classes.buttonLink}
                >
                    <Notifications className={`${classes.headerLinksSvg} ${classes.links}`} />
                    <span className={classes.notifications}>5</span>
                    <Hidden mdUp implementation="css">
                        <span
                            role="button"
                            onClick={handleClickNotification}
                            className={classes.linkText}
                            tabIndex="0"
                        >
                            Notification
                        </span>
                    </Hidden>
                </IconButton>
                <Popper
                    open={Boolean(openNotification)}
                    anchorEl={openNotification}
                    transition
                    disablePortal
                    placement="bottom"
                    className={classNames({
                        [classes.popperClose]: !openNotification,
                        [classes.popperResponsive]: true,
                        [classes.popperNav]: true,
                    })}
                >
                    {({ TransitionProps }) => (
                        <Grow
                            {...TransitionProps}
                            id="notification-menu-list"
                            style={{ transformOrigin: '0 0 0' }}
                        >
                            <Paper className={classes.dropdown}>
                                <ClickAwayListener onClickAway={handleCloseNotification}>
                                    <MenuList role="menu">
                                        <MenuItem
                                            onClick={handleCloseNotification}
                                            className={dropdownItem}
                                        >
                                            Mike John responded to your email
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleCloseNotification}
                                            className={dropdownItem}
                                        >
                                            You have 5 new tasks
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleCloseNotification}
                                            className={dropdownItem}
                                        >
                                            Your now friend with Andrew
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleCloseNotification}
                                            className={dropdownItem}
                                        >
                                            Another Notification
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleCloseNotification}
                                            className={dropdownItem}
                                        >
                                            Another One
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>

            <div className={managerClasses}>
                <IconButton
                    color="primary"
                    aria-owns={openProfile ? 'profile-menu-list' : null}
                    onClick={handleClickProfile}
                    className={classes.buttonLink}
                >
                    <Person className={`${classes.headerLinksSvg} ${classes.links}`} />
                    <Hidden mdUp implementation="css">
                        <span
                            role="button"
                            tabIndex="0"
                            onClick={handleClickProfile}
                            className={classes.linkText}
                        >
                            Profile
                        </span>
                    </Hidden>
                </IconButton>
                <Popper
                    open={Boolean(openProfile)}
                    anchorEl={openProfile}
                    transition
                    disablePortal
                    placement="bottom"
                    className={classNames({
                        [classes.popperClose]: !openProfile,
                        [classes.popperResponsive]: true,
                        [classes.popperNav]: true,
                    })}
                >
                    {({ TransitionProps }) => (
                        <Grow
                            {...TransitionProps}
                            id="profile-menu-list"
                            style={{ transformOrigin: '0 0 0' }}
                        >
                            <Paper className={classes.dropdown}>
                                <ClickAwayListener onClickAway={handleCloseProfile}>
                                    <MenuList role="menu">
                                        <MenuItem
                                            onClick={handleCloseProfile}
                                            className={dropdownItem}
                                        >
                                            Profile
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleCloseProfile}
                                            className={dropdownItem}
                                        >
                                            Settings
                                        </MenuItem>
                                        <Divider light />
                                        <MenuItem
                                            onClick={handleCloseProfile}
                                            className={dropdownItem}
                                        >
                                            Log out
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}
