import { useEffect, useState } from "react";
import { View, Image, ActivityIndicator, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PokemonFetchById } from "../service/api/Pokemon";

export function Liked({ pokemon }) {
    const [isLoading, setLoading] = useState(false);
    const [image, setImage] = useState("");
    const [name, setName] = useState("");

    const fetchDetails = async () => {
        try {
            const response = await PokemonFetchById(pokemon);
            setImage(response.sprites.front_default);
            setName(response.species.name);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const delFromFavorites = async () => {
        try {
            // let response = await AsyncStorage.getItem('favoritesPokmons');
            // response = response.split(',');
            // console.log(response);
            // let index = response.indexOf(pokemon);
            // response.splice(index, 1);
            // console.log(response);
            // let unique = [...new Set(response)];
            // console.log(unique);
            // await AsyncStorage.setItem('favoritesPokmons', unique.toString());
        } catch (e) {
            console.log(e);
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
                        {name.charAt(0).toUpperCase() +
                            name.slice(1)}
                    </Text>
                    <Ionicons
                        onPress={delFromFavorites}
                        name="star"
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
