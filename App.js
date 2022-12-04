// In App.js in a new project

import * as React from "react";
import {View, StyleSheet, SafeAreaView, Image, TextInput} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Card from "./Card";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createDrawerNavigator } from '@react-navigation/drawer';
import httpClient from "./httpClient";
import {useEffect, useState} from "react";
import {Icon, Text, TextRNE} from '@rneui/themed';
import WebView from "react-native-webview";
import { Button } from "@rneui/themed";
import {Overlay} from "@rneui/themed";

const Tab = createMaterialBottomTabNavigator();


function MyTabs() {
	return (
		<Tab.Navigator
			screenOptions={{ tabBarShowLabel: false }}
			initialRouteName="Home"
			activeColor="#B92B27"
			barStyle={{ backgroundColor: "#f8f9fa", borderStyle: "solid", borderTopWidth: 1, borderTopColor: "#e9ecef" }}

		>
			<Tab.Screen
				name="Feed"

				component={StackNavigator}
				options={{
					tabBarLabel: "Home",
					showLabel: false,
					labeled: false,
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
					showLabel: false,
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="bell" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={StackProfile}
				tabBarOptions={{
					showLabel: false,

				}
				}
				options={{
					tabBarOptions: {
						showLabel: false,
					},
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
	const { itemId } = route.params;
	const [data, setData] = useState({});
	const customHTML = `
      <body style="display:flex; flex-direction: column;justify-content: center; 
        align-items:center; background-color: black; color:white; height: 100%;">
          <h1 style="font-size:100px; padding: 50px; text-align: center;" 
          id="h1_element">
            This is simple html
          </h1>
          <h2 style="display: block; font-size:80px; padding: 50px; 
          text-align: center;" id="h2_element">
            This text will be changed later!
          </h2>
       </body>`;
	useEffect(() => {
		httpClient.getKontenById((itemId)).then((response) => {
			response.content = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style> img { display: block; max-width: 100%; height: auto; } *{overflow: scroll; word-wrap: break-word;} </style></head><body><h1>'+ response.title +'</h1>' + response.content + '</body></html>';
			setData(response);
		});
	});
	return (
		<>
			<WebView originWhitelist={['*']} source={{ html : data.content }}
			/>
		</>
	);
}



const Stack = createNativeStackNavigator();

type OverlayComponentProps = {};

	function Profile(){
	const [text, onChangeText] = useState("");
	const [visible, setVisible] = useState(false);

	const toggleOverlay = () => {
		setVisible(!visible);
	};
	const onChangeTextHandler = (text) => {
		onChangeText(text);
	};
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.inside2}>
				{/*label*/}
				<Text style={styles.label}>Username</Text>
				<TextInput
					style={styles.input}
					onChangeText={onChangeText}
					value={text}
					placeholder="Username"
					editable={false}
				/>
				<Text style={styles.label}>Nama</Text>
				<TextInput
					style={styles.input}
					onChangeText={onChangeText}
					value={text}
					placeholder="Nama Lengkap"
				/>
				<Text style={styles.label}>Email</Text>

				<TextInput
					style={styles.input}
					onChangeText={onChangeText}
					value={text}
					placeholder="Email"
				/>
				<Button radius="md" size="lg" style={styles.button} onPress={toggleOverlay}>
					Save
				</Button>
				<Overlay isVisible={visible} style={styles.overlay} onBackdropPress={toggleOverlay}>
					<SafeAreaView style={styles.overlay}>
						<Text style={styles.titleoverlay} >
							Apakah anda yakin ingin menyimpan data ini?
						</Text>
						<Button style={styles.button} radius="md" size="lg" onPress={toggleOverlay}
								title="Update Profile"
						/>
					</SafeAreaView>

				</Overlay>
			</View>
		</SafeAreaView>
	);
}

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
function StackProfile() {
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
			<Stack.Screen name="Profile" component={Profile} />
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
	titleoverlay: {
		fontSize: 20,
		marginBottom: 20,
	},
	overlay: {
		width: 300,
		padding: 20,
	},
	container: {
		flex: 1,
		justifyContent: "center",
	},
	input: {
		height: 50,
		borderWidth: 1,
		padding: 10,
		paddingHorizontal: 15,
		borderRadius: 5,
		marginBottom: 15,
		backgroundColor: "#f8f8f8",
		borderColor: "#d3d3d3",
		width: "100%",
	},
	button: {
		width: "100%",
	},
	tinyLogo: {
		aspectRatio: 3,
		resizeMode: "contain",
		marginBottom: 5,
		marginLeft: 15,
	},
	inside3: {
		flex: 1,
		justifyContent: "flex-end",
	},
	inside2: {
		padding: 25,
	},
	inside1: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "flex-end",
	},
});

export default App;
