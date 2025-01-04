import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { usePost } from "../../hooks/usePost";

// Registrar os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart = () => {
    const { postCounts } = usePost();

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
    return (
        <Bar data={data} />
    )
}