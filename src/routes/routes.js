// @material-ui/icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import Image from '@material-ui/icons/Image';
import Another from '../components/Another/Another';
import DashboardHome from '../components/DashboardHome/DashboardHome';

const dashRoutes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        icon: DashboardIcon,
        component: DashboardHome,
        layout: '/admin',
    },
    {
        collapse: true,
        name: 'Pages',
        icon: Image,
        state: 'pageCollapse',
        views: [
            {
                path: '/another',
                name: 'Dashbaord Another',
                mini: 'PP',
                component: Another,
                layout: '/admin',
            },
            {
                path: '/another-auth',
                name: 'Another page',
                mini: 'PP',
                component: Another,
                layout: '/auth',
            },
        ],
    },
];
export default dashRoutes;
