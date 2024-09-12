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

export type ForecastResponse = {
	latitude: number;
	longitude: number;
	timezone: string;
	elevation: number;
	daily_units: {
		time: string;
		weather_code: string;
		temperature_2m_max: string;
		temperature_2m_min: string;
	};
	daily: {
		time: string[];
		weather_code: number[];
		temperature_2m_max: number[];
		temperature_2m_min: number[];
	};
};
