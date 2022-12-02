import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { CharactersList } from "../screens/Characters/CharactersList";
import { CharactersLikes } from "../screens/likes/CharactersLikes";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Search } from "../screens/search/Search";

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
                            name="pokeball"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="CharactersLikes"
                component={CharactersLikes}
                options={{
                    tabBarLabel: "Pokémons",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="heart-multiple"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarLabel: "Recherche",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="pokemon-go"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
