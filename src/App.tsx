import { Alert, Box, Container, Grid, Skeleton } from "@mui/material";
import { HiChatBubbleBottomCenterText, HiMiniBookOpen, HiMiniUsers } from "react-icons/hi2";
import { useStats } from "./hooks/useStats";
import { StatsCard } from "./components/statsCards";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchPostsByUser } from "./services/postService";

// Registrar os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface UserPostCount {
    userId: number;
    postCount: number;
}

export function App() {
    const { stats, loading, error } = useStats();
    const [postCounts, setPostCounts] = useState<UserPostCount[]>([]);


    // Buscar os dados das postagens
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts: Post[] = await fetchPostsByUser();

                // Contabilizar o número de postagens por usuário
                const counts = posts.reduce((acc: Record<number, number>, post: Post) => {
                    acc[post.userId] = (acc[post.userId] || 0) + 1;
                    return acc;
                }, {});

                // Transformar o objeto em um array de UserPostCount
                const postCountArray = Object.entries(counts).map(([userId, postCount]) => ({
                    userId: parseInt(userId),
                    postCount,
                }));

                setPostCounts(postCountArray);
            } catch (error) {
                console.error('Error fetching posts for chart:', error);
            }
        };

        fetchPosts();
    }, []);


    // Preparar os dados para o gráfico
    const data = {
        labels: postCounts.map(item => `User ${item.userId}`),  // Rótulos com base no userId
        datasets: [
            {
                label: 'Postagens por Usuário',
                data: postCounts.map(item => item.postCount),
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor das barras
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };


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

            <Grid container spacing={20} py={4} px={8}>
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
                <Bar data={data} />
            </Box>
        </Container>
    )
}