import { useEffect, useState } from "react";
import { View, Image, ActivityIndicator, Text, StyleSheet } from "react-native";

export function Card({ pokemon }) {
    const [isLoading, setLoading] = useState(false);
    const [image, setImage] = useState("");

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

    useEffect(() => {
        fetchDetails();
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
