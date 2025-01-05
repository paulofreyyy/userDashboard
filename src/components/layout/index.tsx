import React from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery,
    ListItemIcon,
} from '@mui/material';
import { HiBookmark, HiChartBar, HiMiniUsers } from 'react-icons/hi2';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo.png'; // Importando a imagem da logo

interface Props {
    children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();

    const menuItems = [
        { text: 'Dashboard', icon: <HiChartBar size="1.5rem" />, path: '/' },
        { text: 'Usuários', icon: <HiMiniUsers size="1.5rem" />, path: '/usuarios' },
        { text: 'Postagens', icon: <HiBookmark size="1.5rem" />, path: '/postagens' },
    ];

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
                    {menuItems.map((item) => (
                        <ListItem
                            component={Link}
                            to={item.path}
                            key={item.text}
                            sx={{
                                px: 4,
                                color: location.pathname === item.path ? '#6E00FF' : '#8e8e8e',
                                borderRight: location.pathname === item.path ? '4px solid #6E00FF' : 'none',
                                overflow: 'hidden',
                                '&:hover': {
                                    color: '#fff',
                                    '& .MuiListItemIcon-root': {
                                        color: '#FFF'
                                    }
                                },
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: '100%',
                                    backgroundColor: '#6E00FF',
                                    transition: 'left 0.4s ease',
                                    zIndex: 0,
                                },
                                '&:hover::before': {
                                    left: 0,
                                },
                                '& > *': {
                                    position: 'relative',
                                    zIndex: 1,
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: location.pathname === item.path ? '#6E00FF' : '#7e7e7f',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Área principal */}
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
            >
                {/* Conteúdo */}
                <Box>{children}</Box>
            </Box>
        </Box>
    );
};
