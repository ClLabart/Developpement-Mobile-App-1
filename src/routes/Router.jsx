import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CharactersList } from "../screens/Characters/CharactersList";
import { CharactersLikes } from "../screens/likes/CharactersLikes";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Search } from "../screens/search/Search";
import { Profile } from "../screens/Profile/Profile";
import { Details } from "../screens/Pokemon/Details";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function Router() {
    return (
        <Stack.Navigator>
            <Tab.Screen name="home" component={BottomDrawer}  options={{
                    headerTransparent: true,
                    headerTitle: ''
                }} />
            <Tab.Group  screenOptions={{presentation: 'modal'}} >
                <Tab.Screen screenOptions={{presentation: 'modal'}} name="Détails"  component={Details} options={{
                    headerTransparent: true,
                    // headerRight
                }} />
            </Tab.Group>
        </Stack.Navigator>
    );
}


function BottomDrawer() {
    return (
        <Tab.Navigator
            initialRouteName="Pokedex"
            tabBarOptions={{
                activeTintColor: "black",
            }}
        >
            <Tab.Group>
                <Tab.Screen name="Pokedex" component={CharactersList} options={{
                    // headerShown: false,
                    tabBarLabel: "Pokémons",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="pokeball"
                            color={color}
                            size={size}
                        />
                    ),
                }} />
                <Tab.Screen
                    name="CharactersLikes"
                    component={CharactersLikes}
                    options={{
                        tabBarLabel: "Pokémons",
                        headerTitle: 'Pokemons liked',
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
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarLabel: "Profile",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="card-account-details"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
            </Tab.Group>
        </Tab.Navigator>
    );
}