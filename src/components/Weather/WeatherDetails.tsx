import styles from './WeatherDetails.module.css';
import { Weather } from '../../hooks/useWeather';

interface WeatherProps {
	weather: Weather;
}

const WeatherDetails = ({ weather }: WeatherProps) => {
	return (
		<section className={styles.weather}>
			<header className={styles.header}>
				<p className={styles.temp}>{weather.main.temp}&deg;C</p>
				<h2 className={styles.name}>{weather.name}</h2>
			</header>
			<div className={styles.container}>
				<div className={styles.group}>
					<p className={styles.title}>Temperatura Mínima: </p>
					<p className={styles.value}>{weather.main.temp_min}&deg;C</p>
				</div>
				<div className={styles.group}>
					<p className={styles.title}>Temperatura Máxima: </p>
					<p className={styles.value}>{weather.main.temp_max}&deg;C</p>
				</div>
				<div className={styles.group}>
					<p className={styles.title}>Latitud: </p>
					<p className={styles.value}>{weather.coord.lat}</p>
				</div>
				<div className={styles.group}>
					<p className={styles.title}>Longitud: </p>
					<p className={styles.value}>{weather.coord.lon}</p>
				</div>
				<div className={styles.group}>
					<p className={styles.title}>Humedad: </p>
					<p className={styles.value}>{weather.main.humidity}%</p>
				</div>
				<div className={styles.group}>
					<p className={styles.title}>Visibilidad: </p>
					<p className={styles.value}>{weather.visibility} km</p>
				</div>
				<div className={styles.group}>
					<p className={styles.title}>Viento: </p>
					<p className={styles.value}>{weather.wind.speed} km/h</p>
				</div>
				<div className={styles.group}>
					<p className={styles.title}>Presión: </p>
					<p className={styles.value}>{weather.main.pressure} mb</p>
				</div>
			</div>
		</section>
	);
};

export default WeatherDetails;
