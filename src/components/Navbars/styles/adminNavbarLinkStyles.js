import { defaultFont, whiteColor } from '../../../assets/jss/core';
import customDropdownStyle from './customDropdownStyles';

const adminNavbarLinksStyle = (theme) => ({
    ...customDropdownStyle(theme),
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    search: {
        margin: '0',
        paddingTop: '7px',
        paddingBottom: '7px',
        [theme.breakpoints.down('sm')]: {
            margin: '10px 15px',
            float: 'none !important',
            paddingTop: '1px',
            paddingBottom: '1px',
            padding: '10px 15px',
            width: 'auto',
        },
    },
    searchInput: {
        paddingTop: '2px',
    },

    linkText: {
        zIndex: '4',
        ...defaultFont,
        fontSize: '14px',
        margin: '0!important',
        textTransform: 'none',
    },
    buttonLink: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            margin: '5px 15px 0',
            width: 'auto',
            height: 'auto',
            '& svg': {
                width: '30px',
                height: '24px',
                marginRight: '19px',
                marginLeft: '3px',
            },
            '& .fab,& .fas,& .far,& .fal,& .material-icons': {
                width: '30px',
                fontSize: '24px',
                lineHeight: '30px',
                marginRight: '19px',
                marginLeft: '3px',
            },
        },
    },
    searchButton: {
        [theme.breakpoints.down('sm')]: {
            top: '-50px !important',
            marginRight: '38px',
            float: 'right',
        },
    },
    top: {
        zIndex: '4',
    },
    searchIcon: {
        width: '17px',
        zIndex: '4',
    },
    links: {
        width: '20px',
        height: '20px',
        zIndex: '4',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            width: '30px',
            height: '30px',
            color: 'inherit',
            opacity: '0.8',
            marginRight: '16px',
            marginLeft: '-5px',
        },
    },
    notifications: {
        zIndex: '4',
        [theme.breakpoints.up('md')]: {
            position: 'absolute',
            top: '5px',
            border: `1px solid ${whiteColor}`,
            right: '5px',
            fontSize: '9px',
            background: 'red',
            color: whiteColor,
            minWidth: '16px',
            height: '16px',
            borderRadius: '10px',
            textAlign: 'center',
            lineHeight: '14px',
            verticalAlign: 'middle',
            display: 'block',
        },
        [theme.breakpoints.down('sm')]: {
            ...defaultFont,
            fontSize: '14px',
            marginRight: '8px',
        },
    },

    managerClasses: {
        [theme.breakpoints.up('md')]: {
            display: 'inline-block',
        },
    },
    headerLinksSvg: {
        width: '20px !important',
        height: '20px !important',
    },
    searchInputRoot: {
        background: '#f1f1f191',
        marginRight: 10,
    },
    srcInput: {
        paddingTop: 15,
    },
});

export default adminNavbarLinksStyle;
