// In App.js in a new project

import * as React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Card from "./Card";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			activeColor="#e91e63"
			barStyle={{ backgroundColor: "tomato" }}

		>
			<Tab.Screen
				name="Feed"
				component={StackNavigator}
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="home" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Notifications"
				component={DetailsScreen}
				options={{
					tabBarLabel: "Updates",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="bell" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={DetailsScreen}
				options={{
					tabBarLabel: "Profile",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="account" color={color} size={26} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}


function HomeScreen({ navigation }) {
	return (
		<View>
			<Card />
		</View>
	);
}
function DetailsScreen({route, navigation}) {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Details Screen</Text>
		</View>
	);
}

const Stack = createNativeStackNavigator();

function StackNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTitleStyle: {
					fontWeight: "bold",
				},
				gestureDirection: "horizontal",
				gestureEnabled: true,
				headerShown: true,
				animation: "slide_from_right",
				// time speed of animation
				animationTypeForReplace: "pop",
				animationDuration: 10,

			}}
		>
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="Details" component={DetailsScreen} />
		</Stack.Navigator>
	);
}

function App() {
	return (
		<NavigationContainer>
			<MyTabs/>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({

});

export default App;
