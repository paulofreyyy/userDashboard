import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { usePost } from "../../hooks/usePost";

// Registrar os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart = () => {
    const { postCounts } = usePost();

    // Cores alternativas para as barras

    // Preparar os dados para o gráfico
    const data = {
        labels: postCounts.map(item => `User ${item.userId}`),  // Rótulos com base no userId
        datasets: [
            {
                label: 'Postagens por Usuário',
                data: postCounts.map(item => item.postCount),
                backgroundColor: '#6E00FF', // Cor das barras
                borderColor: '#6E00FF',
                borderWidth: 1,
            },
        ],
    };
    return (
        <Bar data={data} />
    )
}