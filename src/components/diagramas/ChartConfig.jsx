import { Bar, Doughnut } from 'react-chartjs-2';
import './diagramas.scss';

const state = {
	labels: ['Espera', 'Proceso', 'Aprobadas'],
	datasets: [
		{
			label: 'Barra',
			axis: 'x',

			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(255, 159, 64, 0.2)',
				'rgba(255, 205, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(201, 203, 207, 0.2)',
			],
			borderColor: [
				'rgb(255, 99, 132)',
				'rgb(255, 159, 64)',
				'rgb(255, 205, 86)',
				'rgb(75, 192, 192)',
				'rgb(54, 162, 235)',
				'rgb(153, 102, 255)',
				'rgb(201, 203, 207)',
			],
			borderWidth: 1,
			data: [10, 5, 289],
		},
	],
};

export const ChartBarra = () => {
	return (
		<Bar
			data={state}
			className='canvas_prueba'
			options={{
				indexAxis: 'y',
				title: {
					display: true,
					text: 'Average Solic',
					fontSize: 2,
				},
				legend: {
					display: true,
					position: 'right',
				},
			}}
			width={'100%'}
			height={'35vh'}
		/>
	);
};

export const ChartTorta = () => {
	return (
		<Doughnut
			data={state}
			className='canvas_prueba'
			options={{
				title: {
					display: true,
					text: 'Average Rainfall per month',
					fontSize: 2,
				},
			}}
			height={230}
			width={230}
		/>
	);
};
