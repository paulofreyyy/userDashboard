import React, { useState } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery,
    ListItemIcon,
    IconButton,
} from '@mui/material';
import { HiBookmark, HiChartBar, HiMiniUsers } from 'react-icons/hi2';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { HiMenuAlt2 } from 'react-icons/hi';

interface Props {
    children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();

    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

    const toggleMenu = () => {
        setIsMenuCollapsed((prev) => !prev);
    };

    const menuItems = [
        { text: 'Dashboard', icon: <HiChartBar size="1.5rem" />, path: '/' },
        { text: 'Usuários', icon: <HiMiniUsers size="1.5rem" />, path: '/usuarios' },
        { text: 'Postagens', icon: <HiBookmark size="1.5rem" />, path: '/postagens' },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Botão para expandir/recolher o menu (aparece apenas em telas não móveis) */}
            {!isMobile && (
                <IconButton
                    onClick={toggleMenu}
                    sx={{
                        position: 'fixed',
                        top: 20,
                        left: isMenuCollapsed ? 80 : 250,
                        zIndex: theme.zIndex.drawer + 1,
                        transition: 'left 0.3s',
                    }}
                >
                    <HiMenuAlt2 />
                </IconButton>
            )}

            {/* Menu Lateral */}
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? false : true}
                sx={{
                    width: isMenuCollapsed ? 72 : 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: isMenuCollapsed ? 72 : 240,
                        boxSizing: 'border-box',
                        overflowX: 'hidden',
                        transition: 'width 0.3s',
                    },
                }}
            >
                {/* Logo no topo do Drawer */}
                <Box
                    sx={{
                        p: 4,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: isMenuCollapsed ? 'column' : 'row',
                    }}
                >
                    {!isMenuCollapsed && (
                        <img
                            src={Logo}
                            alt="Logo"
                            style={{ width: '100%', maxWidth: '150px' }}
                        />
                    )}
                </Box>

                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            component={Link}
                            to={item.path}
                            key={item.text}
                            sx={{
                                px: isMenuCollapsed ? 3 : 4,
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
                                    minWidth: isMenuCollapsed ? 48 : 56,
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            {!isMenuCollapsed && <ListItemText primary={item.text} />}
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Área principal */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    transition: 'margin-left 0.3s',
                }}
            >
                <Box>{children}</Box>
            </Box>
        </Box>
    );
};
