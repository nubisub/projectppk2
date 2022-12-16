import React, {useCallback, useEffect, useState} from "react";
import * as Keychain from 'react-native-keychain';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Image,
} from "react-native";
import { Button } from "@rneui/themed";
import logo from "../../logo.png";
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import httpClient from "../../httpClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
function Login({ navigation }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isDisabled, setIsDisabled] = useState(true);
	const getUser = async () => {
		const value = await AsyncStorage.getItem('@storage_Key');
		if (value != null) {
			navigation.navigate("Home");
		}
	};

	useFocusEffect(
		useCallback(() => {
			getUser();

		}, [])
	)

	useEffect(() => {
		if (username.length > 0 && password.length > 0) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [username, password]);

	const onChangeUsername = (text) => {
		setUsername(text);
	};
	const onChangePassword = (text) => {
		setPassword(text);
	};

	const loginAuth = () => {
		const data = {
			username: username,
			password: password,
		};
		httpClient.logIn(data).then((res) => {
			if (res.token) {
				navigation.navigate("Home", {screen: "Feed"});
			} else {
				alert("Login Failed, Check your username and password");
			}
		});
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.inside1}></View>
			<View style={styles.inside2}>
				<Image style={styles.tinyLogo} source={logo} />
				<TextInput
					selectionColor={"#118bd2"}
				style={styles.input}
					onChangeText={onChangeUsername}
					value={username}
					placeholder="Username"
				/>
				<TextInput
					selectionColor={"#118bd2"}
                    secureTextEntry={true}
					style={styles.input}
					onChangeText={onChangePassword}
					value={password}
					placeholder="Password"
				/>
				<Button
					onPress={loginAuth}
					disabled={isDisabled}
					radius="md"
					size="lg"
					disabledStyle={{
						backgroundColor: "#118bd2",
						opacity: 0.5,
					}}
					style={styles.button}>

					Log in
				</Button>
			</View>
			<View style={styles.inside3}>
				<Button
					onPress={() => navigation.push("Signup")}
					color="white"
					type="clear"
					radius="none"
					size="lg"
					style={styles.buttonSign}
					containerViewStyle={{ width: "100%" }}
				>
					<Text style={{ color: "black" }}>Don't have an account?
						<Text style={{ color: "#118bd2" }}> Sign up here</Text>
					</Text>
				</Button>
			</View>
		</SafeAreaView>
	);
}


const styles = StyleSheet.create({
	label: {
		marginBottom: 5,
		color: "#4d4d4d",
	},
	container: {
		flex: 1,
		justifyContent: "center",
	},
	input: {
		height: 45,
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
		marginLeft: 20,
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

function Authenticate() {
	return (
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					animation: "none",
					contentStyle: { backgroundColor: 'white' },
				}}>
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Signup" component={Signup} />
			</Stack.Navigator>
	);
}

export default Login;
