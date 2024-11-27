import axios from 'axios';
import { z } from 'zod';
// import { object, string, number, parse } from 'valibot';
import { SearchType } from '../types';
import { useState } from 'react';

// TYPE GUARD O ASSETION
// function isWeatherResponse(weather:unknown):weather is Weather {
// 	return (
// 		Boolean(weather) &&
// 		typeof weather == 'object' &&
// 		typeof (weather as Weather).name == 'string' &&
// 		typeof (weather as Weather).main.temp == 'number' &&
// 		typeof (weather as Weather).main.temp_min == 'number' &&
// 		typeof (weather as Weather).main.temp_max == 'number' &&
// 		typeof (weather as Weather).main.humidity == 'number' &&
// 		typeof (weather as Weather).main.pressure == 'number' &&
// 		typeof (weather as Weather).main.sea_level == 'number'
// 	)
// }

// ZOD
// Schema
const Weather = z.object({
	name: z.string(),
	main: z.object({
		humidity: z.number(),
		pressure: z.number(),
		sea_level: z.number(),
		temp: z.number(),
		temp_max: z.number(),
		temp_min: z.number(),
	}),
	visibility: z.number(),
	wind: z.object({
		speed: z.number(),
	}),
	weather: z.array(
		z.object({
			main: z.string(),
			description: z.string(),
		})
	),
	coord: z.object({
		lon: z.number(),
		lat: z.number(),
	}),
});
// Type
export type Weather = z.infer<typeof Weather>;

// Valibot
// const WeatherSchema = object({
// 	name: string(),
// 	main: object({
// 		humidity: number(),
// 		pressure: number(),
// 		sea_level: number(),
// 		temp: number(),
// 		temp_max: number(),
// 		temp_min: number(),
// 	}),
// });
// type Weather = InferInput<typeof WeatherSchema>;

export default function useWeather() {
	const [isLoading, setIsLoading] = useState(false);
	const [weather, setWeather] = useState<Weather>();
	const [notFound, setNotFound] = useState(false);

	const fetchWeather = async (search: SearchType) => {
		setIsLoading(true);
		setWeather(undefined);

		const { city, country } = search;
		const appID = import.meta.env.VITE_API_KEY;

		try {
			// Obtener latitud y longitud (Geocoding API)
			const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${appID}`;

			const { data: geoResult } = await axios.get(geoURL);

			// Caso no exista ciudad en país
			if (!geoResult[0]) {
				setNotFound(true);
				return;
			}

			const lat = geoResult[0].lat;
			const lon = geoResult[0].lon;

			// Obtener el clima
			const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=sp&appid=${appID}`;

			// Castear el type
			// const { data: weatherResult } = await axios.get<Weather>(weatherURL);

			// Type Guard
			// const { data: weatherResult} = await axios.get(weatherURL);
			// const result = isWeatherResponse(weatherResult);
			// if(result){
			// 	console.log('Cumple con la respuesta requerida')
			// } else {
			// 	console.log('Respuesta mal formada')
			// }

			// ZOD
			const { data: weatherResult } = await axios.get(weatherURL);
			const result = Weather.safeParse(weatherResult);
			if (result.success) {
				setNotFound(false);
				setWeather(result.data);
			}

			// Valibot
			// const { data: weatherResult } = await axios.get(weatherURL);
			// const result = parse(WeatherSchema, weatherResult);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		weather,
		notFound,
		isLoading,
		fetchWeather,
	};
}
