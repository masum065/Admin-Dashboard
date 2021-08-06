/* eslint-disable no-use-before-define */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';
import { NavLink, useLocation } from 'react-router-dom';
import cx from 'classnames';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';

// core components

// import avatar from 'assets/img/faces/avatar.jpg';
import avatar from '../../assets/images/default-avatar.png';
import sidebarStyle from './styles';

import AdminNavbarLinks from '../Navbars/AdminNavbarLinks';

const useStyles = makeStyles(sidebarStyle);

let ps;

// We've created this component so we can have a ref to the wrapper of the links that appears in our sidebar.
// This was necessary so that we could initialize PerfectScrollbar on the links.
// There might be something with the Hidden component from material-ui, and we didn't have access to
// the links, and couldn't initialize the plugin.
function SidebarWrapper({ className, user, headerLinks, links }) {
    const sidebarWrapper = React.useRef();
    React.useEffect(() => {
        if (navigator.platform.indexOf('Win') > -1) {
            ps = new PerfectScrollbar(sidebarWrapper.current, {
                suppressScrollX: true,
                suppressScrollY: false,
            });
        }
        return function cleanup() {
            if (navigator.platform.indexOf('Win') > -1) {
                ps.destroy();
            }
        };
    });
    return (
        <div className={className} ref={sidebarWrapper}>
            {user}
            {headerLinks}
            {links}
        </div>
    );
}

const Sidebar = (props) => {
    const classes = useStyles();
    const [miniActive, setMiniActive] = React.useState(true);
    // to check for active links and opened collapses
    const location = useLocation();
    // this is for the user collapse
    const [openAvatar, setOpenAvatar] = React.useState(false);
    // this is for the rest of the collapses
    const [state, setState] = React.useState({});

    const mainPanel = React.useRef();
    // this creates the intial state of this component based on the collapse routes
    // that it gets through routes]
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getCollapseStates = useCallback((routes) => {
        let initialState = {};
        routes.map((prop) => {
            if (prop.collapse) {
                initialState = {
                    [prop.state]: getCollapseInitialState(prop.views),
                    ...getCollapseStates(prop.views),
                    ...initialState,
                };
            }
            return null;
        });
        return initialState;
    });
    React.useEffect(() => {
        setState(getCollapseStates(props.routes));
        // eslint-disable-next-line react/destructuring-assignment
    }, [getCollapseStates, props.routes]);
    // this verifies if any of the collapses should be default opened on a rerender of this component
    // for example, on the refresh of the page,
    // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
    const getCollapseInitialState = (routes) => {
        for (let i = 0; i < routes.length; i += 1) {
            if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
                return true;
            }
            if (location.pathname === routes[i].layout + routes[i].path) {
                return true;
            }
        }
        return false;
    };
    // verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName) => (location.pathname === routeName ? 'active' : '');
    // this function creates the links and collapses that appear in the sidebar (left menu)
    const createLinks = (routes) => {
        const { color } = props;
        return routes.map((prop) => {
            if (prop.redirect) {
                return null;
            }
            if (prop.collapse) {
                const st = {};
                st[prop.state] = !state[prop.state];
                const navLinkClasses = `${classes.itemLink} ${cx({
                    [` ${classes.collapseActive}`]: getCollapseInitialState(prop.views),
                })}`;
                const itemText = `${classes.itemText} ${cx({
                    [classes.itemTextMini]: props.miniActive && miniActive,
                })}`;
                const collapseItemText = `${classes.collapseItemText} ${cx({
                    [classes.collapseItemTextMini]: props.miniActive && miniActive,
                })}`;
                const { itemIcon, caret, collapseItemMini } = classes;
                return (
                    <ListItem
                        key={prop.path}
                        className={cx(
                            { [classes.item]: prop.icon !== undefined },
                            { [classes.collapseItem]: prop.icon === undefined }
                        )}
                    >
                        <NavLink
                            to="#"
                            className={navLinkClasses}
                            onClick={(e) => {
                                e.preventDefault();
                                setState(st);
                            }}
                        >
                            {prop.icon !== undefined ? (
                                typeof prop.icon === 'string' ? (
                                    <Icon className={itemIcon}>{prop.icon}</Icon>
                                ) : (
                                    <prop.icon className={itemIcon} />
                                )
                            ) : (
                                <span className={collapseItemMini}>{prop.mini}</span>
                            )}
                            <ListItemText
                                primary={prop.name}
                                secondary={
                                    <b
                                        className={`${caret} ${
                                            state[prop.state] ? classes.caretActive : ''
                                        }`}
                                    />
                                }
                                disableTypography
                                className={cx(
                                    { [itemText]: prop.icon !== undefined },
                                    { [collapseItemText]: prop.icon === undefined }
                                )}
                            />
                        </NavLink>
                        <Collapse in={state[prop.state]} unmountOnExit>
                            <List className={`${classes.list} ${classes.collapseList}`}>
                                {createLinks(prop.views)}
                            </List>
                        </Collapse>
                    </ListItem>
                );
            }
            const innerNavLinkClasses = `${classes.collapseItemLink} ${cx({
                [` ${classes[color]}`]: activeRoute(prop.layout + prop.path),
            })}`;
            const { collapseItemMini, itemIcon } = classes;
            const navLinkClasses = `${classes.itemLink} ${cx({
                [` ${classes[color]}`]: activeRoute(prop.layout + prop.path),
            })}`;
            const itemText = `${classes.itemText} ${cx({
                [classes.itemTextMini]: props.miniActive && miniActive,
            })}`;
            const collapseItemText = `${classes.collapseItemText} ${cx({
                [classes.collapseItemTextMini]: props.miniActive && miniActive,
            })}`;

            return (
                <ListItem
                    key={prop.path}
                    className={cx(
                        { [classes.item]: prop.icon !== undefined },
                        { [classes.collapseItem]: prop.icon === undefined }
                    )}
                >
                    <NavLink
                        to={prop.layout + prop.path}
                        className={cx(
                            { [navLinkClasses]: prop.icon !== undefined },
                            { [innerNavLinkClasses]: prop.icon === undefined }
                        )}
                    >
                        {prop.icon !== undefined ? (
                            typeof prop.icon === 'string' ? (
                                <Icon className={itemIcon}>{prop.icon}</Icon>
                            ) : (
                                <prop.icon className={itemIcon} />
                            )
                        ) : (
                            <span className={collapseItemMini}>{prop.mini}</span>
                        )}
                        <ListItemText
                            primary={prop.name}
                            disableTypography
                            className={cx(
                                { [itemText]: prop.icon !== undefined },
                                { [collapseItemText]: prop.icon === undefined }
                            )}
                        />
                    </NavLink>
                </ListItem>
            );
        });
    };
    const { logo, image, logoText, routes, bgColor } = props;
    const itemText = `${classes.itemText} ${cx({
        [classes.itemTextMini]: props.miniActive && miniActive,
    })}`;
    const collapseItemText = `${classes.collapseItemText} ${cx({
        [classes.collapseItemTextMini]: props.miniActive && miniActive,
    })}`;
    const userWrapperClass = `${classes.user} ${cx({
        [classes.whiteAfter]: bgColor === 'white',
    })}`;
    const { caret, collapseItemMini, photo } = classes;
    const user = (
        <div className={userWrapperClass}>
            <div className={photo}>
                <img src={avatar} className={classes.avatarImg} alt="..." />
            </div>
            <List className={classes.list}>
                <ListItem className={`${classes.item} ${classes.userItem}`}>
                    <NavLink
                        to="#"
                        className={`${classes.itemLink} ${classes.userCollapseButton}`}
                        onClick={() => setOpenAvatar(!openAvatar)}
                    >
                        <ListItemText
                            primary="Tania Andrew"
                            secondary={
                                <b
                                    className={`${caret} ${classes.userCaret} ${
                                        openAvatar ? classes.caretActive : ''
                                    }`}
                                />
                            }
                            disableTypography
                            className={`${itemText} ${classes.userItemText}`}
                        />
                    </NavLink>
                    <Collapse in={openAvatar} unmountOnExit>
                        <List className={`${classes.list} ${classes.collapseList}`}>
                            <ListItem className={classes.collapseItem}>
                                <NavLink
                                    to="#"
                                    className={`${classes.itemLink} ${classes.userCollapseLinks}`}
                                >
                                    <span className={collapseItemMini}>MP</span>
                                    <ListItemText
                                        primary="My Profile"
                                        disableTypography
                                        className={collapseItemText}
                                    />
                                </NavLink>
                            </ListItem>
                            <ListItem className={classes.collapseItem}>
                                <NavLink
                                    to="#"
                                    className={`${classes.itemLink} ${classes.userCollapseLinks}`}
                                >
                                    <span className={collapseItemMini}>EP</span>
                                    <ListItemText
                                        primary="Edit Profile"
                                        disableTypography
                                        className={collapseItemText}
                                    />
                                </NavLink>
                            </ListItem>
                            <ListItem className={classes.collapseItem}>
                                <NavLink
                                    to="#"
                                    className={`${classes.itemLink} ${classes.userCollapseLinks}`}
                                >
                                    <span className={collapseItemMini}>S</span>
                                    <ListItemText
                                        primary="Settings"
                                        disableTypography
                                        className={collapseItemText}
                                    />
                                </NavLink>
                            </ListItem>
                        </List>
                    </Collapse>
                </ListItem>
            </List>
        </div>
    );
    const links = <List className={classes.list}>{createLinks(routes)}</List>;

    const logoNormal = `${classes.logoNormal} ${cx({
        [classes.logoNormalSidebarMini]: props.miniActive && miniActive,
    })}`;
    const { logoMini } = classes;
    const logoClasses = `${classes.logo} ${cx({
        [classes.whiteAfter]: bgColor === 'white',
    })}`;
    const brand = (
        <div className={logoClasses}>
            <a
                href="https://www.creative-tim.com?ref=mdpr-sidebar"
                target="_blank"
                className={logoMini}
                rel="noreferrer"
            >
                <img src={logo} alt="logo" className={classes.img} />
            </a>
            <a
                href="https://www.creative-tim.com?ref=mdpr-sidebar"
                target="_blank"
                className={logoNormal}
                rel="noreferrer"
            >
                {logoText}
            </a>
        </div>
    );
    const drawerPaper = `${classes.drawerPaper} ${cx({
        [classes.drawerPaperMini]: props.miniActive && miniActive,
    })}`;
    const sidebarWrapper = `${classes.sidebarWrapper} ${cx({
        [classes.drawerPaperMini]: props.miniActive && miniActive,
        [classes.sidebarWrapperWithPerfectScrollbar]: navigator.platform.indexOf('Win') > -1,
    })}`;
    return (
        <div ref={mainPanel}>
            <Hidden mdUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor="right"
                    open={props.open}
                    classes={{
                        paper: `${drawerPaper} ${classes[`${bgColor}Background`]}`,
                    }}
                    onClose={props.handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {brand}
                    <SidebarWrapper
                        className={sidebarWrapper}
                        user={user}
                        headerLinks={<AdminNavbarLinks />}
                        links={links}
                    />
                    {image !== undefined ? (
                        <div
                            className={classes.background}
                            style={{ backgroundImage: `url(${image})` }}
                        />
                    ) : null}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    onMouseOver={() => setMiniActive(false)}
                    onMouseOut={() => setMiniActive(true)}
                    anchor="left"
                    variant="permanent"
                    open
                    classes={{
                        paper: `${drawerPaper} ${classes[`${bgColor}Background`]}`,
                    }}
                >
                    {brand}
                    <SidebarWrapper className={sidebarWrapper} user={user} links={links} />
                    {image !== undefined ? (
                        <div
                            className={classes.background}
                            style={{ backgroundImage: `url(${image})` }}
                        />
                    ) : null}
                </Drawer>
            </Hidden>
        </div>
    );
};

Sidebar.defaultProps = {
    bgColor: 'black',
    color: 'white',
    logo: '',
    logoText: 'Logo',
    image: '',
};

Sidebar.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    logo: PropTypes.string,
    logoText: PropTypes.string,
    image: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
    miniActive: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    handleDrawerToggle: PropTypes.func.isRequired,
};

SidebarWrapper.propTypes = {
    className: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    user: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    headerLinks: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    links: PropTypes.object.isRequired,
};

export default Sidebar;
