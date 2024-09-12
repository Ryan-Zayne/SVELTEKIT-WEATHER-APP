<script lang="ts">
	import { WeatherDisplay } from "@/components";
	import type { ApiResponse, Result } from "@/lib";
	import { callApi } from "@zayne-labs/callapi";
	import type { FormEventHandler } from "svelte/elements";

	let weatherState = $state<Result | null>(null);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		const formData = Object.fromEntries(new FormData(event.currentTarget));

		const apiUrl = `https://geocoding-api.open-meteo.com/v1/search`;

		const { data, error } = await callApi<ApiResponse>(apiUrl, {
			query: {
				name: formData.city as string,
				count: 1,
				language: "en",
				format: "json",
			},
		});

		if (error) {
			alert(error.message);
			console.error(error.errorData);
			return;
		}

		weatherState = data.results[0] as Result;
	};
</script>

<main
	class="flex h-full flex-col items-center bg-gradient-to-b from-blue-400 to-blue-600 p-4 pt-[50px]
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

	{#if weatherState}
		<WeatherDisplay {weatherState} />
	{/if}
</main>
