import { createMuiTheme } from '@material-ui/core/styles';
import { primaryColor } from '../assets/jss/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: primaryColor[0],
        },
    },
});

export default theme;
