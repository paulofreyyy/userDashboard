import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './global.css';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme.ts'; // Importando o tema criado


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </StrictMode>,
)
