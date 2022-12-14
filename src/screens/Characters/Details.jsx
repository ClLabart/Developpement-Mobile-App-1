import { Text, Image, View, StyleSheet } from "react-native";
import Pokeball from "../../../assets/pokeball.png";
import Points from "../../../assets/points.png";

export function Details({ route, navigation }) {
    const { pokemonId } = route.params;

    return (
        <View style={styles.container}>
            <Text>pokmon {pokemonId}</Text>
            <Image style={styles.pokeball} source={Pokeball} />
            <Image style={styles.points} source={Points} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "lightgreen",
    },
    pokeball: { width: 100, height: 100, position: "absolute" },
    points: { height: 50, width: 100 },
});
