// ##############################
// // // Function that converts from hex color to rgb color
// // // Example: input = #9c27b0 => output = 156, 39, 176
// // // Example: input = 9c27b0 => output = 156, 39, 176
// // // Example: input = #999 => output = 153, 153, 153
// // // Example: input = 999 => output = 153, 153, 153
// #############################
export const hexToRgb = (inputCode) => {
    let input = inputCode;
    input += '';
    input = input.replace('#', '');
    const hexRegex = /[0-9A-Fa-f]/g;
    if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
        throw new Error('input is not a valid hex color.');
    }
    if (input.length === 3) {
        const first = input[0];
        const second = input[1];
        const last = input[2];
        input = first + first + second + second + last + last;
    }
    input = input.toUpperCase(input);
    const first = input[0] + input[1];
    const second = input[2] + input[3];
    const last = input[4] + input[5];
    return `${parseInt(first, 16)}, ${parseInt(second, 16)}, ${parseInt(last, 16)}`;
};

export const drawerWidth = 260;

export const drawerMiniWidth = 80;

export const transition = {
    transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
};

export const containerFluid = {
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto',
    '&:before,&:after': {
        display: 'table',
        content: '" "',
    },
    '&:after': {
        clear: 'both',
    },
};

export const container = {
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto',
    '@media (min-width: 768px)': {
        width: '750px',
    },
    '@media (min-width: 992px)': {
        width: '970px',
    },
    '@media (min-width: 1200px)': {
        width: '1170px',
    },
    '&:before,&:after': {
        display: 'table',
        content: '" "',
    },
    '&:after': {
        clear: 'both',
    },
};

export const defaultFont = {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '300',
    lineHeight: '1.5em',
};
export const defaultBoxShadow = {
    border: '0',
    borderRadius: '3px',
    boxShadow: `0 10px 20px -12px rgba(${hexToRgb('#000')}, 0.42), 0 3px 20px 0px rgba(${hexToRgb(
        '#000'
    )}, 0.12), 0 8px 10px -5px rgba(${hexToRgb('#000')}, 0.2)`,
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
};

export const primaryColor = ['#005971'];
export const whiteColor = '#fff';
export const blackColor = '#000';
export const grayColor = '#ddd';
