import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tasksData } from '../../TasksData';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const TASKS_KEY = '@tasks_key';

const TaskList = () => {
	const [allTasks, setAllTasks] = useState([]);

	useEffect(() => {
		loadTasks();
	}, []);

	const loadTasks = async () => {
		try {
			const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
			const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];

			const combinedTasks = [...tasksData, ...parsedTasks];
			setAllTasks(combinedTasks);
		} catch (error) {
			console.error('Failed to load tasks', error);
		}
	};

	return (
		<ScrollView>
			<View style={{ padding: 20 }}>
				{allTasks.map((task) => (
					<View
						key={task.id}
						style={{
							padding: 10,
							borderRadius: 10,
							backgroundColor: '#fff',
							marginBottom: 10,
							flexDirection: 'row',
						}}
					>
						<View style={{ marginRight: 10, flex: 1 }}>
							<Text>{task.title}</Text>
							<Text style={{ marginTop: 5, fontWeight: 'bold' }}>
								{task.description}
							</Text>
							<View
								style={{
									marginTop: 5,
									flexDirection: 'row',
									justifyContent: 'flex-start',
									alignItems: 'center',
								}}
							>
								<MaterialIcons
									name='watch-later'
									size={24}
									color='#007AFF'
								/>
								<Text style={{ marginLeft: 5, color: '#007AFF' }}>
									{' '}
									{task.dueDate}
								</Text>
							</View>
						</View>
						<View
							style={{
								flex: 1,
								alignItems: 'flex-end',
								justifyContent: 'space-between',
							}}
						>
							<Text
								style={
									task.status === 'Pending'
										? style.taskStatusPending
										: style.taskStatusCompleted
								}
							>
								{task.status}
							</Text>
							<Text style={{ fontWeight: 'bold' }}>{task.category}</Text>
						</View>
					</View>
				))}
			</View>
		</ScrollView>
	);
};

export default TaskList;

const style = StyleSheet.create({
	taskStatusPending: {
		color: 'red',
		backgroundColor: 'pink',
		borderRadius: 50,
		paddingRight: 10,
		paddingLeft: 10,
	},
	taskStatusCompleted: {
		color: 'green',
		backgroundColor: 'lightgreen',
		borderRadius: 50,
		paddingRight: 10,
		paddingLeft: 10,
	},
});
