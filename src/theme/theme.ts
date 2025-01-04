import { createTheme, ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent !important',
                    borderRadius: '8px !important',
                    padding: '8px !important',
                    '& .MuiInputBase-input': {
                        color: 'black !important',
                    },
                    '& .MuiInputLabel-root': {
                        color: 'black !important',
                        marginLeft: '8px !important',
                    },
                    '& .MuiInput-underline:before': {
                        borderColor: '#000 !important',
                    },
                    '& .MuiInput-underline:hover:before': {
                        borderColor: '#000 !important',
                    },
                    '& .MuiInput-underline:after': {
                        borderColor: '#000 !important',
                    },
                },
            },
        },
    },
}

// Criando o tema
const theme = createTheme(themeOptions);

export default theme;