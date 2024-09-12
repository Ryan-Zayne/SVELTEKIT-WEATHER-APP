export type Result = {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
	elevation: number;
	feature_code: string;
	country_code: string;
	admin1_id: number;
	admin2_id: number;
	timezone: string;
	population: number;
	country_id: number;
	country: string;
	admin1: string;
	admin2: string;
};

export type ApiResponse = {
	results: Result[];
	generationtime_ms: number;
};
