/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Doughnut } from 'react-chartjs-2';
import './diagramas.scss';

const state = {
	labels: ['Espera', 'Proceso', 'Terminadas'],
	datasets: [
		{
			label: 'Barra',
			axis: 'x',

			backgroundColor: [
				'rgba(20, 17, 152, 0.4)',
				'rgba(238, 99, 82, 0.4)',
				'rgba(63, 167, 214, 0.4)',
				'rgba(248, 249, 72, 0.4)',
				'rgba(95, 72, 66, 0.4)',
				'rgba(240, 162, 2, 0.4)',
				'rgba(247, 157, 132, 0.4)',
			],
			borderColor: [
				'rgb(20, 17, 152)',
				'rgb(238, 99, 82)',
				'rgb(63, 167, 214)',
				'rgb(248, 249, 72)',
				'rgb(95, 72, 66)',
				'rgb(153, 102, 255)',
				'rgb(247, 157, 132)',
			],
			borderWidth: 1,
			data: [10, 3, 32],
		},
	],
};

export const ChartTorta = (col?: any, data?: any) => {
	// let val = UpdateChartData(col, data);
	return (
		<Doughnut
			data={state}
			className='canvas_prueba'
			options={{
				title: {
					display: true,
					text: '',
					fontSize: 2,
				},
				responsive: true,
			}}
		/>
	);
};
