import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#3a4b92',
        },
        secondary: {
          main: '#b0276c',
        },
        info: {
          main: '#0284d1',
        },
        background: {
          default: '#eeeeee',
        },
      },
  });

export default theme;