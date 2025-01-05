import { Alert, Container, Skeleton, Box, Typography } from "@mui/material";
import { HiChatBubbleBottomCenterText, HiMiniBookOpen, HiMiniUsers } from "react-icons/hi2";
import { useStats } from "../hooks/useStats";
import { StatsCard } from "../components/cards/statsCards";
import { BarChart } from "../components/charts/bar";
import { PieChart } from "../components/charts/pie";
import UsersTable from "../components/tables/table";

export const Home = () => {
    const { stats, loading, error } = useStats();

    if (loading) {
        return (
            <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={3} py={4} px={2}>
                {[...Array(3)].map((_, index) => (
                    <Skeleton key={index} variant="rectangular" width="100%" height={150} />
                ))}
            </Box>
        );
    }

    if (error) {
        return (
            <Box py={4} px={2}>
                <Alert severity="error">Erro: {error}</Alert>
            </Box>
        );
    }

    return (
        <Container>
            <Typography variant="h5" fontWeight={600} px={2}>Dashboard</Typography>
            <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={5} py={4} px={2}>
                <StatsCard
                    title="Total de usuários"
                    value={stats?.totalUsers}
                    icon={<HiMiniUsers />}
                    iconColor="#6E00FF"
                />
                <StatsCard
                    title="Total de postagens"
                    value={stats?.totalPosts}
                    icon={<HiMiniBookOpen />}
                    iconColor="#FFBC00"
                />
                <StatsCard
                    title="Total de comentários"
                    value={stats?.totalComments}
                    icon={<HiChatBubbleBottomCenterText />}
                    iconColor="#FF7A49"
                />
            </Box>

            <Box
                display="grid"
                gridTemplateColumns={{ xs: "1fr", md: "2fr 1fr" }}
                gap={2}
                px={2}
            >
                <Box sx={{ bgcolor: "#FFF", borderRadius: 4, p: 3 }}>
                    <BarChart />
                </Box>
                <Box sx={{ bgcolor: "#FFF", borderRadius: 4, p: 3 }}>
                    <PieChart />
                </Box>
            </Box>

            <Box
                display='grid'
                gap={2}
                py={4}
                px={2}
            >
                <UsersTable />
            </Box>
        </Container>
    );
};
