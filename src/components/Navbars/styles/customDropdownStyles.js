// Custom dropdown

import { blackColor, defaultFont, grayColor, hexToRgb, whiteColor } from '../../../assets/jss/core';

const customDropdownStyle = (theme) => ({
    popperClose: {
        pointerEvents: 'none',
        display: 'none !important',
    },
    popperNav: {
        [theme.breakpoints.down('sm')]: {
            position: 'static !important',
            left: 'unset !important',
            top: 'unset !important',
            transform: 'none !important',
            willChange: 'unset !important',
            '& > div': {
                boxShadow: 'none !important',
                marginLeft: '0rem',
                marginRight: '0rem',
                transition: 'none !important',
                marginTop: '0px !important',
                marginBottom: '0px !important',
                padding: '0px !important',
                backgroundColor: 'transparent !important',
                '& ul li': {
                    color: `${whiteColor} !important`,
                    margin: '10px 15px 0!important',
                    padding: '10px 15px !important',
                    '&:hover': {
                        backgroundColor: 'hsla(0,0%,78%,.2)',
                        boxShadow: 'none',
                    },
                },
            },
        },
    },
    manager: {
        '& > div > button:first-child > span:first-child, & > div > a:first-child > span:first-child':
            {
                width: '100%',
            },
    },
    innerManager: {
        '& > div > button,& > div > a': {
            margin: '0px !important',
            color: 'inherit !important',
            padding: '10px 20px !important',
            '& > span:first-child': {
                width: '100%',
                justifyContent: 'flex-start',
            },
        },
    },
    target: {
        '& > button:first-child > span:first-child, & > a:first-child > span:first-child': {
            display: 'inline-block',
        },
        '& $caret': {
            marginLeft: '0px',
        },
    },
    dropdown: {
        borderRadius: '3px',
        border: '0',
        boxShadow: `0 2px 5px 0 rgba(${hexToRgb(blackColor)}, 0.26)`,
        top: '100%',
        zIndex: '1000',
        minWidth: '160px',
        padding: '5px 0',
        margin: '2px 0 0',
        fontSize: '14px',
        textAlign: 'left',
        listStyle: 'none',
        backgroundColor: whiteColor,
        backgroundClip: 'padding-box',
    },
    menuList: {
        padding: '0',
    },
    popperResponsive: {
        zIndex: '1200',
        [theme.breakpoints.down('sm')]: {
            zIndex: '1640',
            position: 'static',
            float: 'none',
            width: 'auto',
            marginTop: '0',
            backgroundColor: 'transparent',
            border: '0',
            boxShadow: 'none',
            color: 'black',
        },
    },
    dropdownItem: {
        ...defaultFont,
        fontSize: '13px',
        padding: '10px 20px',
        margin: '0 5px',
        borderRadius: '2px',
        position: 'relative',
        transition: 'all 150ms linear',
        display: 'block',
        clear: 'both',
        fontWeight: '400',
        height: '100%',
        color: grayColor[7],
        whiteSpace: 'nowrap',
        minHeight: 'unset',
    },
    darkHover: {
        // '&:hover': {
        //     boxShadow: `0 4px 20px 0px rgba(${hexToRgb(
        //         blackColor
        //     )}, 0.14), 0 7px 10px -5px rgba(${hexToRgb(grayColor[16])}, 0.4)`,
        //     backgroundColor: grayColor[16],
        //     color: whiteColor,
        // },
    },
    dropdownItemRTL: {
        textAlign: 'right',
    },
    dropdownDividerItem: {
        margin: '5px 0',
        backgroundColor: `rgba(${hexToRgb(blackColor)}, 0.12)`,
        height: '1px',
        overflow: 'hidden',
    },
    buttonIcon: {
        width: '20px',
        height: '20px',
    },
    caret: {
        transition: 'all 150ms ease-in',
        display: 'inline-block',
        width: '0',
        height: '0',
        marginLeft: '4px',
        verticalAlign: 'middle',
        borderTop: '4px solid',
        borderRight: '4px solid transparent',
        borderLeft: '4px solid transparent',
    },
    caretActive: {
        transform: 'rotate(180deg)',
    },
    caretDropup: {
        transform: 'rotate(180deg)',
    },
    dropdownHeader: {
        display: 'block',
        padding: '0.1875rem 1.25rem',
        fontSize: '0.75rem',
        lineHeight: '1.428571',
        color: grayColor,
        whiteSpace: 'nowrap',
        fontWeight: 'inherit',
        marginTop: '10px',
        minHeight: 'unset',
        '&:hover,&:focus': {
            backgroundColor: 'transparent',
            cursor: 'auto',
        },
    },
    noLiPadding: {
        padding: '0',
    },
});

export default customDropdownStyle;
