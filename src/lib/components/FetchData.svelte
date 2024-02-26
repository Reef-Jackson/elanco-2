<script>
	import { fetchApplications, fetchApplicationData } from '$lib/actions';
	import Chart from 'chart.js/auto';

	let applications = [];
	let applicationsData = [];

	async function getApplications() {
		applications = await fetchApplications();
	}

	async function getApplicationInfo(applicationName) {
		applicationsData = await fetchApplicationData(applicationName);
		console.log(applicationsData);
		return applicationsData;
	}

	async function GenerateOrUpdateChart(canvasElement, data) {
		const existingChart = Chart.getChart(canvasElement);
		const applicationsData = await getApplicationInfo(data);
		const ctx = document.getElementById('myChart').getContext('2d');
		const labels = applicationsData.map(item => item.Date);
		const dataPoints = applicationsData.map(item => item.Cost);
		const operatingPoints = applicationsData.map(item => item.ConsumedQuantity);

		const chartData = {
			labels: labels,
			datasets: [{
				label: 'Cost over time',
				data: dataPoints,
			},
			{
				label: 'Operating hours per day',
				data: operatingPoints,
			}]
		};

		if (existingChart) {
			existingChart.data = chartData;
			existingChart.update();
		} else {
			const myChart = new Chart(ctx, {
				type: 'line',
				data: chartData,
			});
			myChart.update();
		}
	}


	getApplications();
</script>

<div class="w-full h-[100vh] flex items-center bg-slate-800">
	<div class="w-1/6 h-full flex flex-col">
		<button class="btn">Highest Cost Tooling</button>
		<div class="w-full h-[95%] bg-black flex flex-col overflow-y-auto">
			{#each applications as name}
				<button class="btn btn-primary m-2" on:click={GenerateOrUpdateChart('myChart', name)}>{name}</button>
			{/each} 
		</div>
	</div>
	<div class="w-5/6 h-full bg-slate-200 flex items-center justify-center">
		<canvas id="myChart" class="w-[80%] mx-10 h-full rounded-xl"></canvas>
	</div>
</div>


