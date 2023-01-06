import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CharactersList } from "../screens/Characters/CharactersList";
import { Details } from "../screens/Characters/Details";

const Tab = createNativeStackNavigator();

export function CardListScreen() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Pokedex" component={CharactersList} />
            <Tab.Screen name="Détails" component={Details} options={{
                headerTransparent: true
            }} />
        </Tab.Navigator>
    );
}
