import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { usePost } from "../../hooks/usePost";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart = () => {
    const { postCounts } = usePost();

    let delayed: boolean;
    const options = {
        indexAxis: 'x' as const,
        plugins: {
            title: {
                display: true,
                text: 'Postagens por usuários',
            }
        },
        animation: {
            onComplete: () => {
                delayed = true;
            },
            delay: (context: any) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                    delay = context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
            }
        }
    };

    // Recuperar os dados de usuários do localStorage
    const users: { id: number, name: string }[] = JSON.parse(localStorage.getItem('users') || '[]');

    // Criar um mapa de userId para nome
    const userMap = new Map(users.map(user => [user.id, user.name]));

    const data = {
        labels: postCounts.map(item => userMap.get(item.userId) || `User ${item.userId}`),
        datasets: [
            {
                label: 'Postagens por Usuário',
                data: postCounts.map(item => item.postCount),
                backgroundColor: '#6E00FF',
                borderColor: 'transparent',
                borderWidth: 1,
            },
        ],
    };
    return (
        <Bar data={data} options={options} />
    )
}