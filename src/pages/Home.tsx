import { Alert, Box, Container, Grid, Skeleton } from "@mui/material";
import { HiChatBubbleBottomCenterText, HiMiniBookOpen, HiMiniUsers } from "react-icons/hi2";
import { useStats } from "../hooks/useStats";
import { StatsCard } from "../components/statsCards";
import { BarChart } from "../components/charts/bar";

export const Home = () => {
    const { stats, loading, error } = useStats();

    if (loading) {
        return (
            <Grid container spacing={15} py={4} px={8}>
                <Grid item md={4}>
                    <Skeleton variant="rectangular" width="100%" height={150} />
                </Grid>
                <Grid item md={4}>
                    <Skeleton variant="rectangular" width="100%" height={150} />
                </Grid>
                <Grid item md={4}>
                    <Skeleton variant="rectangular" width="100%" height={150} />
                </Grid>
            </Grid>
        );
    }

    if (error) {
        return (
            <Grid container spacing={15} py={4} px={8}>
                <Grid item md={12}>
                    <Alert severity="error">Erro: {error}</Alert>
                </Grid>
            </Grid>
        );
    }

    return (
        <Container>
            <Grid container spacing={5} py={4} px={8}>
                <Grid item md={4}>
                    <StatsCard
                        title="Total de usuários"
                        value={stats?.totalUsers}
                        icon={<HiMiniUsers />}
                        iconColor="#6E00FF"
                    />
                </Grid>

                <Grid item md={4}>
                    <StatsCard
                        title="Total de postagens"
                        value={stats?.totalPosts}
                        icon={<HiMiniBookOpen />}
                        iconColor="#FFBC00"
                    />
                </Grid>

                <Grid item md={4}>
                    <StatsCard
                        title="Total de comentários"
                        value={stats?.totalComments}
                        icon={<HiChatBubbleBottomCenterText />}
                        iconColor="#FF7A49"
                    />
                </Grid>
            </Grid >

            <Box>
                <BarChart />
            </Box>
        </Container>
    )
}