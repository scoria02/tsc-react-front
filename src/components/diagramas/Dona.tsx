import Chart from 'chart.js/auto';
import { FC, useEffect, useRef } from 'react';

interface Props {
	chartData: number[];
	colsData: string[];
}

const Dona: FC<Props> = ({ chartData, colsData }) => {
	const chartRef = useRef<Chart | null>(null);

	// helper function to format chart data since you do this twice
	const formatData = (data: number[], cols: string[]) => ({
		labels: cols,
		datasets: [
			{
				label: 'Cantidad',
				data: data,
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
			},
		],
	});

	// callback creates the chart on the canvas element
	const canvasCallback = (canvas: HTMLCanvasElement | null) => {
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (ctx) {
			chartRef.current?.destroy();
			chartRef.current = new Chart(ctx, {
				type: 'doughnut',
				data: formatData(chartData, colsData),
				options: {
					animation: false,
					responsive: true,
				},
			});
		}
	};

	// effect to update the chart when props are updated
	useEffect(() => {
		// must verify that the chart exists
		if (chartRef.current) {
			chartRef.current.data = formatData(chartData, colsData);
			chartRef.current.update();
		}

		// cleanup function - I had to remove this as it was causing errors
		/*return () => {
		  chartRef.current?.destroy();
		};*/
	}, [chartData, colsData]);

	return <canvas ref={canvasCallback}></canvas>;
};

export default Dona;
