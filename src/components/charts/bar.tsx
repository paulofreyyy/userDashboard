import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { usePost } from "../../hooks/usePosts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart = () => {
    const { postCounts } = usePost();

    // Recuperar e mapear os usuários do Localstorage
    const users: { id: number, name: string }[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userMap = new Map(users.map(user => [user.id, user.name]));

    // Definir os dados do gráfico
    const labels = postCounts.map(item => userMap.get(item.userId) || `User ${item.userId}`);
    const data = postCounts.map(item => item.postCount);

    const options = {
        indexAxis: 'x' as const,
        plugins: {
            title: {
                display: true,
                text: 'Postagens por usuários',
                font: { size: 16 }
            }
        },
        animation: {
            onComplete: () => { },
            delay: (context: any) => context.type === 'data' && context.mode === 'default'
                ? context.dataIndex * 300 + context.datasetIndex * 100
                : 0
        }
    };

    return (
        <Bar
            data={{
                labels,
                datasets: [{
                    label: 'Postagens por Usuário', 
                    data,
                    backgroundColor: '#6E00FF',
                    borderColor: 'transparent', 
                    borderWidth: 1
                }]
            }}
            options={options}
        />
    )
}