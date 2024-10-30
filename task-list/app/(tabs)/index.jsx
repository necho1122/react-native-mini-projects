import { Link } from 'expo-router';
import { View, Text, StyleSheet, Image } from 'react-native';

const HomePage = () => {
	return (
		<View style={styles.container}>
			<Image
				source={require('../../assets/task_distribution_2.png')}
				style={styles.image}
			/>
			<Text style={styles.titleContainer}>Task Management</Text>
			<Text style={styles.textContainer}>
				lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
			</Text>
			<Link
				href='/add-task/[addTask]'
				style={styles.button}
			>
				<Text style={styles.buttonText}>Add Task</Text>
			</Link>
		</View>
	);
};

export default HomePage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textContainer: {
		padding: 20,
		fontSize: 20,
		textAlign: 'center',
	},
	lists: {
		padding: 20,
	},
	image: {
		width: '100%',
		height: 200,
	},
	button: {
		backgroundColor: '#007AFF',
		padding: 10,
		borderRadius: 5,
		marginTop: 20,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	titleContainer: {
		padding: 20,
		marginTop: 40,
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
