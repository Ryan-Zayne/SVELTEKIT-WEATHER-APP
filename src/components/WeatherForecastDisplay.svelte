<script lang="ts">
	import type { ForecastResponse } from "@/lib";

	const { weatherForecast }: { weatherForecast: ForecastResponse } = $props();

	// Function to get weather icon SVG based on weather code
	const getWeatherIcon = (code: number): string => {
		if (code === 0 || code === 1) return sunSvg;
		if (code >= 2 && code <= 3) return cloudSvg;
		if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return cloudRainSvg;
		if (code >= 71 && code <= 77) return cloudSnowSvg;
		if (code >= 95 && code <= 99) return cloudLightningSvg;
		return windSvg;
	};

	// Format date to display day of the week
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", { weekday: "short" });
	};

	// SVG strings
	const sunSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
	const cloudSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`;
	const cloudRainSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16" y1="13" x2="16" y2="21"/><line x1="8" y1="13" x2="8" y2="21"/><line x1="12" y1="15" x2="12" y2="23"/><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/></svg>`;
	const cloudSnowSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="12" y1="22" x2="12.01" y2="22"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/></svg>`;
	const cloudLightningSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/></svg>`;
	const windSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>`;
</script>

<div
	class="mt-8 w-full max-w-md rounded-lg bg-white bg-opacity-20 p-6 text-white shadow-lg backdrop-blur-lg"
>
	<h2 class="mb-4 text-2xl font-bold text-yellow-300">7-Day Forecast</h2>
	<div class="space-y-4">
		{#each weatherForecast.daily.time as day, index}
			<div class="flex items-center justify-between rounded-lg bg-blue-600 bg-opacity-30 p-3">
				<div class="flex items-center space-x-3">
					<span class="text-lg font-semibold">{formatDate(day)}</span>
					{@html getWeatherIcon(weatherForecast.daily.weather_code[index] as number) as string}
				</div>
				<div class="flex items-center space-x-2">
					<span class="text-sm"
						>{Math.round(weatherForecast.daily.temperature_2m_min[index] as number)}°</span
					>
					<span class="text-lg font-bold"
						>{Math.round(weatherForecast.daily.temperature_2m_max[index] as number)}°</span
					>
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-4 text-sm">
		<p>Coordinates: {weatherForecast.latitude.toFixed(2)}, {weatherForecast.longitude.toFixed(2)}</p>
	</div>
</div>
