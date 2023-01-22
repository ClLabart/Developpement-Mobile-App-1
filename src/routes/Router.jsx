import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CharactersList } from "../screens/Characters/CharactersList";
import { CharactersLikes } from "../screens/likes/CharactersLikes";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Search } from "../screens/search/Search";
import { Profile } from "../screens/Profile/Profile";
import { Details } from "../screens/Pokemon/Details";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfilePicture } from "../screens/Profile/ProfilePicture";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function Router() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="home" component={BottomDrawer}  options={{
                    headerTransparent: true,
                    headerTitle: ''
                }} />
            <Stack.Group  screenOptions={{presentation: 'modal'}} >
                <Stack.Screen name="Détails"  component={Details} options={{
                    headerTransparent: true,
                }} />
            </Stack.Group>
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
                    tabBarLabel: "Pokemons",
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
                        tabBarLabel: "Liked",
                        headerTitle: "💗 Pokemons liked",
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
                        tabBarLabel: "Search",
                        headerTitle: "🔎 Search",
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
                    component={ProfileStack}
                    options={{
                        headerShown: false,
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

function ProfileStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="ProfileHome" component={Profile} options={{
                headerTitle:"🛹 Profile"
            }}/>
            <Stack.Screen name="PorfilePicture" component={ProfilePicture}  options={{
                headerTitle:"📸 Profile picture"
            }}/>
        </Stack.Navigator>
    );
}