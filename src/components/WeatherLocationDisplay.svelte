<script lang="ts">
	import type { Result } from "@/lib";

	type Props = {
		locationState: Result;
	};

	const { name, country, admin1, admin2, latitude, longitude, elevation, population, timezone }: Result =
		$props();
</script>

<div
	class="mt-8 w-full max-w-md rounded-lg bg-white bg-opacity-20 p-6 text-white shadow-lg backdrop-blur-lg"
>
	<h2 class="mb-4 text-3xl font-bold">{name}, {country}</h2>
	<div class="space-y-3">
		<p class="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="mr-2 h-5 w-5 text-yellow-300"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
				<circle cx="12" cy="10" r="3"></circle>
			</svg>
			{admin1}, {admin2}
		</p>
		<p class="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="mr-2 h-5 w-5 text-yellow-300"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="12" cy="12" r="10"></circle>
				<path d="M2 12h20"></path>
				<path
					d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
				></path>
			</svg>
			Lat: {latitude.toFixed(4)}, Lon: {longitude.toFixed(4)}
		</p>
		<p class="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="mr-2 h-5 w-5 text-yellow-300"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M8 3L4 7l4 4"></path>
				<path d="M4 7h16"></path>
				<path d="M16 21l4-4-4-4"></path>
				<path d="M20 17H4"></path>
			</svg>
			Elevation: {elevation} m
		</p>
		<p class="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="mr-2 h-5 w-5 text-yellow-300"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
				<circle cx="9" cy="7" r="4"></circle>
				<path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
				<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
			</svg>
			Population: {population.toLocaleString()}
		</p>
		<p class="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="mr-2 h-5 w-5 text-yellow-300"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="12" cy="12" r="10"></circle>
				<polyline points="12 6 12 12 16 14"></polyline>
			</svg>
			Timezone: {timezone}
		</p>
	</div>
</div>
