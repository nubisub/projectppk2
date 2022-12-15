import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DetailsScreen from "./Home/Content";
import * as React from "react";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {View} from "react-native";
import Card from "./Home/Card";
import ProfileTab from "./Profile";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
    return (
        <View>
            <Card />
        </View>
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
                animationTypeForReplace: "pop",
                animationDuration: 2,
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    );
}
function StackProfile({navigation}) {
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
            <Stack.Screen name="Profile" component={ProfileTab} />
        </Stack.Navigator>
    );
}
function MyTabs({ navigation }) {
    return (
        <Tab.Navigator
            screenOptions={{ tabBarShowLabel: false }}
            initialRouteName="Feed"
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
                name="Profiles"
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
export default MyTabs;