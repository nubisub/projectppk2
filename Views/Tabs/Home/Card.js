import React, {useCallback} from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";
import {NavigationContainer, useFocusEffect} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import httpClient from "../../../httpClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

type CardsComponentsProps = {};

const Cards: React.FunctionComponent<CardsComponentsProps> = () => {

	const navigation = useNavigation();
    const [data,setData] = useState([]);
	const [username,setUsername] = useState("");



    useEffect( () => {
		// navigate effect

		httpClient.getAllKonten().then((konten) => {
			konten.forEach((konten) => {
				konten.content = konten.content.substring(0, 100);
			});
			setData(konten);
		}).catch((err) => {
			console.log(err);
		});
	}, []);

    return (
			<>
				<ScrollView>
					<View>
						{data.map((item, index) => (
							<Card
                            key={index+1}
								containerStyle={{ margin: 0, marginTop: 3, padding: 10 }}
							>
								<Text
									onPress={() =>
										navigation.navigate("Details", {
											itemId: item._id,
										})
									}
									style={styles.header}
								>
									{item.title}
								</Text>
								<Text
									onPress={() => navigation.navigate("Details",{
										itemId: item._id,
									})}
									style={styles.description}
								>
									{item.content}
								</Text>
							</Card>
						))}
					</View>
				</ScrollView>
			</>
		);
};

const styles = StyleSheet.create({
	header: {
		fontSize: 17,
		fontWeight: "bold",
		marginBottom: 8,
	},
	description: {
		fontSize: 16,
		color: "#666",
	}
});

export default Cards;
