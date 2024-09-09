import type { Config } from "tailwindcss";

const config = {
	content: ["./src/**/*.{html,svelte,ts}"],
	theme: {
		extend: {},
	},
	plugins: [],
} satisfies Config;

export default config;
