import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { CharactersList } from "../screens/Characters/CharactersList";
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
                name="CharactersList"
                component={CharactersList}
                options={{
                    tabBarLabel: "Pokémons",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="google-downasaur"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
