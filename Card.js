import React from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

type CardsComponentsProps = {};


const Cards: React.FunctionComponent<CardsComponentsProps> = () => {
	const navigation = useNavigation();
    const [data,setData] = useState([]);
    useEffect(() => {

fetch("https://dummyjson.com/products/")
	.then((res) => res.json())
	.then((json) => setData(json.products));
    }, [])
    


    return (
			<>
				<ScrollView>
					<View>
						{data.map((item, index) => (
							<Card
                            key={index+1}
								containerStyle={{ margin: 0, marginTop: 2, padding: 10 }}
								// change screen on press
							>
								<Text
									onPress={() =>
										navigation.navigate("Details", {
											itemId: 86,
                                            otherParam: "anything you want here",
                                    
										})
									}
									style={styles.header}
								>
									{item.title}
								</Text>
								<Text
									onPress={() => navigation.navigate("Details")}
									style={styles.description}
								>
									{item.description}
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
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	description: {
		fontSize: 16,
		color: "#666",
	}
});

export default Cards;
