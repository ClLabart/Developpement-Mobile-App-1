import { Text } from "react-native";

export function Details({ route, navigation }) {
    const { pokemonId } = route.params;

    return(
        <>
            <Text>pokmon {pokemonId}</Text>
        </>
    )
}