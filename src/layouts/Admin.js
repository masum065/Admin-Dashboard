/* eslint-disable no-shadow */
// @material-ui/core components
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import cx from 'classnames';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import logo from '../assets/images/logo-white.svg';
import styles from '../assets/jss/adminStyle';
import AdminNavbar from '../components/Navbars/AdminNavbar';
import Sidebar from '../components/Sidebar/Sidebar';
import routes from '../routes/routes';
import theme from '../theme/theme';

let ps;

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
    const { ...rest } = props;
    // states and functions
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [miniActive, setMiniActive] = React.useState(false);
    // styles
    const classes = useStyles();
    const mainPanelClasses = `${classes.mainPanel} ${cx({
        [classes.mainPanelSidebarMini]: miniActive,
        [classes.mainPanelWithPerfectScrollbar]: navigator.platform.indexOf('Win') > -1,
    })}`;
    // ref for main panel div
    const mainPanel = React.createRef();
    // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
    React.useEffect(() => {
        if (navigator.platform.indexOf('Win') > -1) {
            ps = new PerfectScrollbar(mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false,
            });
            document.body.style.overflow = 'hidden';
        }
        // eslint-disable-next-line no-use-before-define
        window.addEventListener('resize', resizeFunction);

        // Specify how to clean up after this effect:
        return function cleanup() {
            if (navigator.platform.indexOf('Win') > -1) {
                ps.destroy();
            }
            // eslint-disable-next-line no-use-before-define
            window.removeEventListener('resize', resizeFunction);
        };
    });

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const getRoute = () => window.location.pathname !== '/admin/full-screen-maps';
    const getActiveRoute = (routes) => {
        const activeRoute = 'Default Brand Text';
        for (let i = 0; i < routes.length; i += 1) {
            if (routes[i].collapse) {
                const collapseActiveRoute = getActiveRoute(routes[i].views);
                if (collapseActiveRoute !== activeRoute) {
                    return collapseActiveRoute;
                }
            } else if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
        return activeRoute;
    };
    const getRoutes = (routes) =>
        routes.map((prop) => {
            if (prop.collapse) {
                return getRoutes(prop.views);
            }
            if (prop.layout === '/admin') {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={prop.path}
                    />
                );
            }
            return null;
        });
    const sidebarMinimize = () => {
        setMiniActive(!miniActive);
    };
    const resizeFunction = () => {
        if (window.innerWidth >= 960) {
            setMobileOpen(false);
        }
    };

    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.wrapper}>
                <Sidebar
                    routes={routes}
                    logoText="Dashboard"
                    logo={logo}
                    handleDrawerToggle={handleDrawerToggle}
                    open={mobileOpen}
                    color="white"
                    bgColor="black"
                    miniActive={miniActive}
                    {...rest}
                />
                <div className={mainPanelClasses} ref={mainPanel}>
                    <AdminNavbar
                        // eslint-disable-next-line react/jsx-no-bind
                        sidebarMinimize={sidebarMinimize.bind(this)}
                        miniActive={miniActive}
                        brandText={getActiveRoute(routes)}
                        handleDrawerToggle={handleDrawerToggle}
                        {...rest}
                    />
                    {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
                    {getRoute() ? (
                        <div className={classes.content}>
                            <div className={classes.container}>
                                <Switch>
                                    {getRoutes(routes)}
                                    <Redirect from="/admin" to="/admin/dashboard" />
                                </Switch>
                            </div>
                        </div>
                    ) : (
                        <div className={classes.map}>
                            <Switch>
                                {getRoutes(routes)}
                                <Redirect from="/admin" to="/admin/dashboard" />
                            </Switch>
                        </div>
                    )}
                </div>
            </div>
        </MuiThemeProvider>
    );
}
