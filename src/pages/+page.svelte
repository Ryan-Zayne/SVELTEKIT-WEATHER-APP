<script lang="ts">
	import { WeatherDisplay, WeatherForecast } from "@/components";
	import type { ApiResponse, ForecastResponse, Result } from "@/lib";
	import { callApi } from "@zayne-labs/callapi";
	import type { FormEventHandler } from "svelte/elements";

	let locationState = $state<Result | null>(null);
	let weatherForecastState = $state<ForecastResponse | null>(null);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const formData = Object.fromEntries(new FormData(event.currentTarget));

		if (formData.city === "") return;

		const { data: locationData, error: locationError } = await callApi<ApiResponse>(
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

		if (locationError) {
			alert(locationError.message);
			console.error(locationError.errorData);
			return;
		}

		if (!locationData.results || locationData.results.length === 0) {
			alert("City not found");
			return;
		}

		locationState = locationData.results[0] as Result;

		const { data: weatherData, error: weatherError } = await callApi<ForecastResponse>(
			"https://api.open-meteo.com/v1/forecast",
			{
				query: {
					latitude: locationState.latitude,
					longitude: locationState.longitude,
					daily: "weather_code,temperature_2m_max,temperature_2m_min",
					timezone: "auto",
				},
			}
		);

		if (weatherError) {
			alert(weatherError.message);
			console.error(weatherError.errorData);
			return;
		}

		weatherForecastState = weatherData;
	};
</script>

<main
	class="flex min-h-svh flex-col items-center bg-gradient-to-b from-blue-400 to-blue-600 p-4 pt-[50px]
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

	{#if locationState}
		<WeatherDisplay {locationState} />
	{/if}

	{#if weatherForecastState}
		<WeatherForecast {weatherForecastState} />
	{/if}
</main>
