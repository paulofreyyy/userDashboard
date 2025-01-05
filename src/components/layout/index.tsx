import React from 'react';
import { Box, Drawer, AppBar, Toolbar, List, ListItem, ListItemText, CssBaseline, useTheme, useMediaQuery } from '@mui/material';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Menu Lateral */}
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? false : true}
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <List>
                    <ListItem>
                        <ListItemText primary="Menu Item 1" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Menu Item 2" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Menu Item 3" />
                    </ListItem>
                </List>
            </Drawer>

            {/* Área principal */}
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
            >
                {/* Barra de Ferramentas */}
                <AppBar position="sticky" sx={{ bgcolor: '#FFF' }} elevation={0}>
                    <Toolbar>
                        <h6>Toolbar</h6>
                    </Toolbar>
                </AppBar>

                {/* Conteúdo */}
                <Box sx={{ mt: 2 }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
