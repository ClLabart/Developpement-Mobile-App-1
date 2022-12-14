import { useEffect, useState } from "react";
import {
    View,
    Image,
    ActivityIndicator,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export const Card_Height = 250;
const { height: wheight } = Dimensions.get("window");
export const height = wheight - 100;

export function Card({ pokemon, y, index }) {
    const navigation = useNavigation();
    const [isLoading, setLoading] = useState(false);
    const [image, setImage] = useState("");
    const [pokemonId, setPokemonId] = useState("");

    const fetchDetails = async () => {
        try {
            const response = await fetch(pokemon.url);
            const json = await response.json();
            setImage(json.sprites.other["official-artwork"].front_default);
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

    const position = Animated.subtract(index * Card_Height, y);
    const isDisappearing = -Card_Height;
    const isTop = 0;
    const isBottom = height - Card_Height;
    const isAppearing = height;

    const translateY = Animated.add(
        Animated.add(
            y,
            y.interpolate({
                inputRange: [0, 0.00001 + index * Card_Height],
                outputRange: [0, -index * Card_Height],
                extrapolateRight: "clamp",
            })
        ),
        position.interpolate({
            inputRange: [isBottom, isAppearing],
            outputRange: [0, -Card_Height / 4],
            extrapolate: "clamp",
        })
    );
    const scale = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
        extrapolateRight: "clamp",
    });
    const opacity = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
    });

    return (
        <Animated.View>
            <TouchableOpacity
                style={[
                    styles.container,
                    { opacity, transform: [{ translateY }, { scale }] },
                ]}
                onPress={() =>
                    navigation.navigate("Details", {
                        pokemonId: pokemonId,
                    })
                }
            >
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
                        {/* <Ionicons
                            onPress={addToFavorites}
                            name="star-outline"
                            size={32}
                            color="black"
                        /> */}
                    </>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "center",
        borderRadius: 20,
        margin: 20,
        height: 210,
        borderBottomColor: "black",
        borderBottomWidth: 15,
        // backgroundColor: "#F2F2F2",
        // backgroundColor: "white",
    },
    image: {
        width: 200,
        height: 199,
    },
    text: {
        color: "black",
        marginLeft: "auto",
        marginRight: "auto",
    },
});
