import styles from './App.module.css';
import useWeather from './hooks/useWeather';
import Form from './components/Form/Form';
import Loader from './components/Loader/Loader';
import WeatherDetails from './components/Weather/WeatherDetails';
import NotFound from './components/NotFound/NotFound';

function App() {
	const { isLoading, weather, fetchWeather, notFound } = useWeather();

	return (
		<main className={styles.container}>
			<h1 className={styles.title}>Buscador de Clima</h1>
			<div className={styles.group}>
				<Form fetchWeather={fetchWeather} />
				{isLoading ? <Loader /> : weather ? <WeatherDetails weather={weather} /> : notFound ? <NotFound /> : <></>}
			</div>
		</main>
	);
}

export default App;
