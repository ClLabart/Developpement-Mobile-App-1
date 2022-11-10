import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Counter } from "../components/Counter";
import { Test } from "../components/Test";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

export function Router() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            // tabBarOptions={{
            //     activeTintColor: "#e91e63",
            // }}
        >
            <Tab.Screen
                name="Home"
                component={Counter}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="home"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Test"
                component={Test}
                options={{
                    tabBarLabel: "Updates",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="bell"
                            color={color}
                            size={size}
                        />
                    ),
                    tabBarBadge: 3,
                }}
            />
        </Tab.Navigator>
    );
}
