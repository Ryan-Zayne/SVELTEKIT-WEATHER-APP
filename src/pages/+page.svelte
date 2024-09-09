<main
	class="flex flex-col pt-[50px] items-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 text-white p-4"
>
	<h1 class="text-4xl font-bold mb-8 text-center">Weather App</h1>

	<form class="w-full max-w-md">
		<div class="flex flex-col sm:flex-row gap-4">
			<input
				type="text"
				name="city"
				placeholder="Enter city name"
				class="flex-grow px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
			/>
			<button
				type="submit"
				class="bg-yellow-400 hover:bg-yellow-300 text-blue-800 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
			>
				Search
			</button>
		</div>
	</form>
</main>
