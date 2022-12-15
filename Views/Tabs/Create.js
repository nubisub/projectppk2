import {SafeAreaView, Text, View} from "react-native";
import ProfileTab from "./Profile";
import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

function Create({navigation}) {
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
            <Stack.Screen name="Create Content" component={CreateDetails} />
        </Stack.Navigator>
    );
}

function CreateDetails (){
    return(
        <SafeAreaView >
            <View>
                <Text >Create</Text>
            </View>
            <View >
                <Text >Create</Text>
            </View>
        </SafeAreaView>
    )

}
export default Create;