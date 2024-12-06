import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Slider from '@react-native-community/slider'; // Actualización
import { Audio } from 'expo-av';

export default function App() {
	const [sound, setSound] = useState(null);
	const [volume, setVolume] = useState(0.5); // Nivel inicial de volumen

	const playSound = async () => {
		const { sound } = await Audio.Sound.createAsync(
			require('./assets/audio.mp3')
		);
		setSound(sound);
		await sound.setVolumeAsync(volume); // Configura el volumen inicial
		await sound.playAsync();
	};

	const stopSound = async () => {
		if (sound) {
			await sound.stopAsync();
			await sound.unloadAsync();
			setSound(null);
		}
	};

	const handleVolumeChange = async (value) => {
		setVolume(value);
		if (sound) {
			await sound.setVolumeAsync(value); // Cambia el volumen mientras se reproduce
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Reproductor de Audio</Text>
			<Button
				title='Reproducir'
				onPress={playSound}
			/>
			<Button
				title='Detener'
				onPress={stopSound}
			/>
			<Text>Volumen: {Math.round(volume * 100)}%</Text>
			<Slider
				style={{ width: 200, height: 40 }}
				minimumValue={0}
				maximumValue={1}
				value={volume}
				onValueChange={handleVolumeChange}
				minimumTrackTintColor='#1EB1FC'
				maximumTrackTintColor='#d3d3d3'
				thumbTintColor='#1EB1FC'
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f8f8f8',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 20,
	},
});
