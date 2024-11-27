import styles from './Form.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { countries } from '../../data/countries';
import { SearchType } from '../../types';

interface FormProps {
	fetchWeather: (search: SearchType) => Promise<void>;
}

const Form = ({ fetchWeather }: FormProps) => {
	const [error, setError] = useState('');
	const [search, setSearch] = useState<SearchType>({
		city: '',
		country: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setSearch({
			...search,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Validar
		if (Object.values(search).includes('')) {
			setError('Todos los campos son obligatorios');
			return;
		}

		// Obtener clima
		fetchWeather(search);

		// Reiniciar valores
		setError('');
		setSearch({
			city: '',
			country: '',
		});
	};

	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit}>
			{error && <p className={styles.error}>{error}</p>}
			<div className={styles.field}>
				<label
					className={styles.label}
					htmlFor='city'>
					Ingrese la Ciudad:
				</label>
				<input
					id='city'
					name='city'
					type='text'
					value={search.city}
					className={styles.input}
					onChange={handleChange}
					placeholder='Lima, Trujillo, Arequipa'
				/>
			</div>
			<div className={styles.field}>
				<label
					className={styles.label}
					htmlFor='country'>
					País:
				</label>
				<select
					id='country'
					name='country'
					value={search.country}
					onChange={handleChange}
					className={styles.input}>
					<option
						value=''
						disabled>
						-- Selecciona un país --
					</option>
					{countries.map(country => (
						<option
							key={country.code}
							value={country.code}>
							{country.name}
						</option>
					))}
				</select>
			</div>
			<input
				type='submit'
				value='Consultar Clima'
				className={styles.submit}
			/>
		</form>
	);
};

export default Form;
