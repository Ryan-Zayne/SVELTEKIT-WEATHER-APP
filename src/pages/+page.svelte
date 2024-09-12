<script lang="ts">
	import { WeatherDisplay, WeatherForecast } from "@/components";
	import type { ApiResponse, ForecastResponse, Result } from "@/lib";
	import { callApi } from "@zayne-labs/callapi";
	import type { FormEventHandler } from "svelte/elements";

	let weatherLocationState = $state<Result | null>(null);
	let weatherForecastState = $state<ForecastResponse | null>(null);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const formData = Object.fromEntries(new FormData(event.currentTarget));

		if (formData.city === "") return;

		const { data, error } = await callApi<ApiResponse>(
			"https://geocoding-api.open-meteo.com/v1/search",
			{
				query: {
					name: formData.city as string,
					count: 1,
					language: "en",
					format: "json",
				},
			}
		);

		if (error) {
			alert(error.message);
			console.error(error.errorData);
			return;
		}

		if (!data.results || data.results.length === 0) {
			alert("City not found");
			return;
		}

		weatherLocationState = data.results[0] as Result;

		const weatherForecastResult = await callApi<ForecastResponse>(
			"https://api.open-meteo.com/v1/forecast",
			{
				query: {
					latitude: weatherLocationState.latitude,
					longitude: weatherLocationState.longitude,
					daily: "weather_code,temperature_2m_max,temperature_2m_min",
					timezone: "auto",
				},
			}
		);

		if (weatherForecastResult.error) {
			alert(weatherForecastResult.error.message);
			console.error(weatherForecastResult.error.errorData);
			return;
		}

		weatherForecastState = weatherForecastResult.data;
	};
</script>

<main
	class="flex min-h-full flex-col items-center bg-gradient-to-b from-blue-400 to-blue-600 p-4 pt-[50px]
		text-white"
>
	<h1 class="mb-8 text-center text-4xl font-bold">Weather App</h1>

	<form class="w-full max-w-md" onsubmit={handleSubmit}>
		<div class="flex flex-col gap-4 sm:flex-row">
			<input
				type="text"
				name="city"
				placeholder="Enter city name"
				class="flex-grow rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2
					focus:ring-blue-300"
			/>
			<button
				type="submit"
				class="rounded-lg bg-yellow-400 px-4 py-2 font-bold text-blue-800 transition duration-300
					ease-in-out hover:bg-yellow-300"
			>
				Search
			</button>
		</div>
	</form>

	{#if weatherLocationState}
		<WeatherDisplay weatherLocation={weatherLocationState} />
	{/if}

	{#if weatherForecastState}
		<WeatherForecast weatherForecast={weatherForecastState} />
	{/if}
</main>
