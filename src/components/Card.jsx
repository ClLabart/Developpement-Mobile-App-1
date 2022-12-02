import { useEffect, useState } from "react";
import { View, Image, ActivityIndicator, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Card({ pokemon }) {
    const [isLoading, setLoading] = useState(false);
    const [image, setImage] = useState("");
    const [pokemonId, setPokemonId] = useState("");

    const fetchDetails = async () => {
        try {
            const response = await fetch(pokemon.url);
            const json = await response.json();
            setImage(json.sprites.front_default);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getPokemonId = () => {
        setPokemonId(pokemon.url.split("/")[6]);
    };

    const addToFavorites = async () => {
        try {
            let response = await AsyncStorage.getItem("favoritesPokmons");
            if (response !== null) {
                response = response.split(",");
            } else {
                response = [];
            }
            response.push(pokemonId);
            console.log(response);
            let unique = [...new Set(response)];
            console.log(unique);
            await AsyncStorage.setItem("favoritesPokmons", unique.toString());
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchDetails();
        getPokemonId();
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <Image
                        style={styles.image}
                        source={{ uri: image ? image : null }}
                    />
                    <Text style={styles.text}>
                        {pokemon.name.charAt(0).toUpperCase() +
                            pokemon.name.slice(1)}
                    </Text>
                    <Ionicons
                        onPress={addToFavorites}
                        name="star-outline"
                        size={32}
                        color="yellow"
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: 20,
        margin: 20,
    },
    image: {
        width: 200,
        height: 200,
    },
    text: {
        color: "white",
    },
});
