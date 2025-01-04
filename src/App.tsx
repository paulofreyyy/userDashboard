import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { HiMiniUsers } from "react-icons/hi2";
import { useStats } from "./hooks/useStats";

export function App() {
    const { stats, loading, error } = useStats();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Grid container spacing={4} py={4} px={8}>
            <Grid item md={4}>
                <Card
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        padding: 2,
                    }}
                >
                    <CardContent>
                        <Typography>Total de usuários</Typography>
                        <Typography fontWeight='bold' fontSize='1.5rem'>{stats?.totalUsers}</Typography>
                    </CardContent>

                    <Box sx={{ fontSize: 40 }}>
                        <HiMiniUsers />
                    </Box>
                </Card>
            </Grid>

            <Grid item md={4}>
                <Card
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        padding: 2,
                    }}
                >
                    <CardContent>
                        <Typography>Total de postagens</Typography>
                        <Typography fontWeight='bold' fontSize='1.5rem'>{stats?.totalPosts}</Typography>
                    </CardContent>

                    <Box sx={{ fontSize: 40 }}>
                        <HiMiniUsers />
                    </Box>
                </Card>
            </Grid>

            <Grid item md={4}>
                <Card
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        padding: 2,
                    }}
                >
                    <CardContent>
                        <Typography>Total de comentários</Typography>
                        <Typography fontWeight='bold' fontSize='1.5rem'>{stats?.totalComments}</Typography>
                    </CardContent>

                    <Box sx={{ fontSize: 40 }}>
                        <HiMiniUsers />
                    </Box>
                </Card>
            </Grid>
        </Grid >
    )
}