import React, { useState, useEffect, useRef } from 'react';
import {
	TextInput,
	Button,
	Alert,
	ScrollView,
	View,
	StyleSheet,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

const TASKS_KEY = '@tasks_key';

const AddTask = () => {
	const [tasks, setTasks] = useState([]);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [priority, setPriority] = useState('');
	const [status, setStatus] = useState('Pending');
	const [category, setCategory] = useState('');
	const [date, setDate] = useState(dayjs().toDate());
	const [showDatePicker, setShowDatePicker] = useState(false);

	useEffect(() => {
		loadTasks();
	}, []);

	const loadTasks = async () => {
		try {
			const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
			if (storedTasks) {
				setTasks(JSON.parse(storedTasks));
			}
		} catch (error) {
			console.error('Failed to load tasks', error);
		}
	};

	const saveTasks = async (tasksToSave) => {
		try {
			await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasksToSave));
		} catch (error) {
			console.error('Failed to save tasks', error);
		}
	};

	const handleAddTask = () => {
		if (!title || !description) {
			Alert.alert('Error', 'Please provide both title and description.');
			return;
		}

		const newTask = {
			id: uuid.v4(),
			title,
			description,
			dueDate: date, // Cambiado de dueDate a date
			priority,
			status: status,
			category,
		};

		const updatedTasks = [...tasks, newTask];
		setTasks(updatedTasks);
		saveTasks(updatedTasks); // Guardar las tareas actualizadas en AsyncStorage

		setTitle('');
		setDescription('');
		setPriority('');
		setStatus('');
		setCategory('');

		Alert.alert('Success', 'Task added successfully!');
	};

	const handleDatePickerShow = () => {
		setShowDatePicker(true);
	};

	const handleDateChange = (params) => {
		setDate(params.date);
		setShowDatePicker(false); // Cerrar el picker después de seleccionar la fecha
	};

	const pickerRef = useRef();

	function open() {
		pickerRef.current.focus();
	}

	function close() {
		pickerRef.current.blur();
	}

	return (
		<ScrollView style={{ padding: 20 }}>
			<View style={{}}>
				<TextInput
					placeholder='Task name'
					style={{
						padding: 10,
						marginVertical: 5,
						fontSize: 20,
					}}
					value={title}
					onChangeText={(text) => setTitle(text)}
				/>
				<TextInput
					placeholder='Description'
					style={{
						padding: 10,
						marginVertical: 5,
					}}
					value={description}
					onChangeText={(text) => setDescription(text)}
				/>
			</View>

			<View style={showDatePicker ? styles.containerPressed : styles.container}>
				<TextInput
					value={dayjs(date).format('YYYY-MM-DD')}
					onFocus={handleDatePickerShow}
					editable={false}
				/>
				{showDatePicker && (
					<DateTimePicker
						mode='single'
						date={date}
						onChange={handleDateChange}
					/>
				)}
				{!showDatePicker && (
					<Button
						title='Set Due Date'
						onPress={handleDatePickerShow}
					/>
				)}
			</View>
			<View style={styles.container}>
				<ModalSelector
					data={[
						{ key: 1, label: 'Work' },
						{ key: 2, label: 'Shopping' },
						{ key: 3, label: 'Health' },
						{ key: 4, label: 'Personal' },
						{ key: 5, label: 'Other' },
					]}
					initValue='Select Category'
					onChange={(option) => setCategory(option.label)}
				>
					<TextInput
						placeholder='Category'
						value={category}
						editable={false}
						style={{ padding: 10, marginVertical: 5 }}
					/>
				</ModalSelector>
				<ModalSelector
					data={[
						{ key: 1, label: 'Low' },
						{ key: 2, label: 'Medium' },
						{ key: 3, label: 'High' },
						{ key: 4, label: 'Critical' },
						{ key: 5, label: 'Other' },
					]}
					initValue='Select Category'
					onChange={(option) => setPriority(option.label)}
				>
					<TextInput
						placeholder='Priority'
						value={priority}
						editable={false}
						style={{ padding: 10, marginVertical: 5 }}
					/>
				</ModalSelector>
			</View>
			<Button
				title='Add Task'
				onPress={handleAddTask}
			/>
		</ScrollView>
	);
};

export default AddTask;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	containerPressed: {
		flexDirection: 'column',
	},
});
