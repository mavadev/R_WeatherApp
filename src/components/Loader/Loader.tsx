import styles from './Loader.module.css';

const Loader = () => {
	return (
		<div className={styles.loader}>
			<div className={styles.spinner}>
				<div className={styles.double_bounce1}></div>
				<div className={styles.double_bounce2}></div>
			</div>
		</div>
	);
};

export default Loader;
