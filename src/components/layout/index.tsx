import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery, ListItemIcon } from '@mui/material';
import { HiBookmark, HiChartBar, HiMiniUsers } from 'react-icons/hi2';
import Logo from '../../assets/logo.png'; // Importando a imagem da logo

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ display: 'flex' }}>
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
                {/* Logo no topo do Drawer */}
                <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
                    <img src={Logo} alt="Logo" style={{ width: '100%', maxWidth: '150px' }} />
                </Box>

                <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ListItem sx={{ px: 4, py: 1.5 }}>
                        <ListItemIcon>
                            <HiChartBar size='1.5rem' />
                        </ListItemIcon>

                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem sx={{ px: 4, py: 1.5 }}>
                        <ListItemIcon>
                            <HiMiniUsers size='1.5rem' />
                        </ListItemIcon>

                        <ListItemText primary="Usuários" />
                    </ListItem>
                    <ListItem sx={{ px: 4, py: 1.5 }}>
                        <ListItemIcon>
                            <HiBookmark size='1.5rem' />
                        </ListItemIcon>

                        <ListItemText primary="Postagens" />
                    </ListItem>
                </List>
            </Drawer>

            {/* Área principal */}
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
            >
                {/* Conteúdo */}
                <Box>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
