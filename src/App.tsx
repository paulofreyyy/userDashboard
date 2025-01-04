import { Grid } from "@mui/material";
import { HiChatBubbleBottomCenterText, HiMiniBookOpen, HiMiniUsers } from "react-icons/hi2";
import { useStats } from "./hooks/useStats";
import { StatsCard } from "./components/statsCards";

export function App() {
    const { stats, loading, error } = useStats();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Grid container spacing={15} py={4} px={8}>
            <Grid item md={4}>
                <StatsCard
                    title="Total de usuários"
                    value={stats?.totalUsers}
                    icon={<HiMiniUsers />}
                />
            </Grid>

            <Grid item md={4}>
                <StatsCard
                    title="Total de postagens"
                    value={stats?.totalPosts}
                    icon={<HiMiniBookOpen />}
                />
            </Grid>

            <Grid item md={4}>
                <StatsCard
                    title="Total de comentários"
                    value={stats?.totalComments}
                    icon={<HiChatBubbleBottomCenterText />}
                />
            </Grid>
        </Grid >
    )
}