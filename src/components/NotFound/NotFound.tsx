import styles from './NotFound.module.css';

const NotFound = () => {
	return (
		<div className={styles.error}>
			<p className={styles.title}>Ciudad no encontrada</p>
			<p className={styles.text}>Verifique que la ciudad pertenezca al país</p>
		</div>
	);
};

export default NotFound;
