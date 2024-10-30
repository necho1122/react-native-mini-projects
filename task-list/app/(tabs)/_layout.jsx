import { Tabs } from 'expo-router';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const TabsLayout = () => {
	return (
		<Tabs>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Home',
					headerTitle: 'Home',

					tabBarIcon: ({ color }) => (
						<Fontisto
							name='home'
							size={24}
							color={color}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name='task-list/[id]'
				options={{
					title: 'Task List',
					headerTitle: 'Task List',
					tabBarIcon: ({ color }) => (
						<FontAwesome5
							name='tasks'
							size={24}
							color={color}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name='add-task/[addTask]'
				options={{
					title: 'Add Task',
					headerTitle: 'Add Task',

					tabBarIcon: ({ color }) => (
						<Fontisto
							name='plus-a'
							size={24}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
