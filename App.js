import React from "react";
import { StatusBar } from "expo-status-bar";
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
import logo from "./logo.png";

export default function App() {
	const [text, onChangeText] = React.useState("");

	const onChangeTextHandler = (text) => {
		onChangeText(text);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.inside1}></View>
			<View style={styles.inside2}>
				<Image style={styles.tinyLogo} source={logo} />
				<TextInput
					style={styles.input}
					onChangeText={onChangeText}
					value={text}
					placeholder="Username"
				/>
				<TextInput
					style={styles.input}
					onChangeText={onChangeText}
					value={text}
					placeholder="Password"
				/>
				<Button radius="md" size="lg" style={styles.button}>
					Log in
				</Button>
			</View>
			<View style={styles.inside3}>
				<Button
          color="white"
          type="outline"
          radius="none"
          size="lg"
          style={styles.buttonSign}
					containerViewStyle={{ width: "100%"}}
				>
          <Text style={{ color: "black" }}>Don't have an account? Sign up</Text>
                    </Button>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
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
