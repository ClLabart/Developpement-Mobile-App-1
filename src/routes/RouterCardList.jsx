import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CharactersList } from "../screens/Characters/CharactersList";
import { Details } from "../screens/Characters/Details";

const Tab = createNativeStackNavigator();

export function CardListScreen() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Pokemon list" component={CharactersList} />
            <Tab.Screen name="Details" component={Details} />
        </Tab.Navigator>
    );
}
