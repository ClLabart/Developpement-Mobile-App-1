import { useEffect, useState } from "react";
import {
    View,
    Image,
    ActivityIndicator,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { PokemonFetchByIdOrName } from "../service/api/Pokemon";
import { useNavigation } from "@react-navigation/native";
import { IsLiked } from "./IsLiked";

export function Liked({ pokemon }) {
    const navigation = useNavigation();
    const [isLoading, setLoading] = useState(false);
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [pokemonId, setPokemonId] = useState();

    const fetchDetails = async () => {
        if (pokemon !== "") {
            try {
                await PokemonFetchByIdOrName(pokemon).then((data) => {
                    setImage("");
                    setName("Pas de pokemon");
                    if (data !== 'no') {
                        setImage(data.sprites.front_default);
                        setName(data.species.name);
                        setPokemonId(data.id);
                    }
                    setLoading(false);
                }).catch((e) => console.error(e));
            } catch (error) {
                console.error(error);
            }
        } else {
            setImage("");
            setName("Pas de pokemon");
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [pokemon]);

    return (
        <View>
            <TouchableOpacity
                style={styles.container}
                onPress={() => navigation.navigate("Détails", {
                    pokemonId: pokemonId
                })}
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
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                        </Text>
                        {name !== "Pas de pokemon"? (
                            <View style={styles.like}>
                                <IsLiked
                                    id={pokemonId}
                                    size={32}
                                />
                            </View>
                        ):(
                            <></>
                        )}
                    </>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
    },
    text: {
        marginLeft: 20
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 1
    },
    like: {
        marginLeft: 10
    }
});
