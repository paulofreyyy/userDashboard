import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export const PieChart = () => {
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) return null;

    const users = JSON.parse(storedUsers);

    // Agrupando os usuários por empresa
    const companyCount = users.reduce((acc: any, user: any) => {
        const companyName = user.company.name;
        acc[companyName] = (acc[companyName] || 0) + 1;
        return acc;
    }, {});

    // Calculando a porcentagem
    const totalUsers = users.length;
    const companyLabels = Object.keys(companyCount);
    const companyValues = companyLabels.map((company) => (companyCount[company] / totalUsers) * 100);

    // Definindo os dados para o gráfico
    const data = {
        labels: companyLabels,
        datasets: [{
            label: 'Porcentagem de Usuários por Empresa',
            data: companyValues,
            backgroundColor: ['#6E00FF', '#FFBC00', '#FF7A49', '#3357FF'],
            borderColor: 'transparent',
            borderWidth: 1,
            fill: false,
            hoverOffset: 10,
        }],
    };

    // Configurações do gráfico
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Porcentagem de Usuários por Empresa',
                font: { size: 14 },
            },
        },
        animation: {
            onComplete: () => { },
            delay: (context: any) =>
                context.type === 'data' && context.mode === 'default'
                    ? context.dataIndex * 300 + context.datasetIndex * 100
                    : 0,
        },
    };

    return <Pie data={data} options={options} />;
};