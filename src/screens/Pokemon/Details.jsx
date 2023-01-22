import {
    Text,
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import Pokeball from "../../../assets/pokeball.png";
import Points from "../../../assets/points.png";
import { useEffect, useState } from "react";
import { pokemonFetchWithInfos } from "../../service/api/Pokemon";
import { IsLiked } from "../../components/IsLiked";

export function Details({ route, navigation }) {
    const { pokemonId } = route.params;
    const [pokemon, setPokemon] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [isPokmonLiked, setIsPokmonLiked] = useState(false);

    const fetchDetails = async () => {
        try {
            await pokemonFetchWithInfos(pokemonId).then((data) => {
                setPokemon(data);
                setLoading(false);
            }).catch((e)=>{
                console.error(e);
            });
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [navigation, pokemonId]);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <View
                        style={[
                            styles.backgroundColor,
                            { backgroundColor: pokemon.color.name },
                        ]}
                    ></View>
                    <Image style={styles.pokeball} source={Pokeball} />
                    <Image style={styles.points} source={Points} />
                    <Text style={styles.pokemonName}>{pokemon.name}</Text>
                    <Text style={styles.pokemonId}>
                        #{pokemonId.toString().padStart(3, "0")}
                    </Text>

                    <View style={styles.description}>
                        <Text style={styles.descriptionText}>Weight : <Text style={[styles.bold]}>{pokemon.weight.toString().slice(0, (pokemon.weight.toString().length - 1))},{pokemon.weight.toString().slice(pokemon.weight.toString().length - 1)} kg</Text></Text>
                        <Text style={styles.descriptionText}>Habitat : <Text style={[styles.bold]}>{pokemon.habitat.name}</Text></Text>
                        <View style={styles.centered}>
                            <IsLiked id={pokemonId} />
                        </View>
                    </View>

                    <View
                        style={styles.centered}
                    >
                        <Image
                            style={styles.pokemonImage}
                            source={{
                                uri: pokemon.sprites.other["official-artwork"]
                                    .front_default
                                    ? pokemon.sprites.other["official-artwork"]
                                          .front_default
                                    : null,
                            }}
                        />
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 90,
    },
    backgroundColor: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        opacity: 0.25,
    },
    description: {
        backgroundColor: "white",
        flex: 1,
        paddingTop: 60,
        marginTop: 320,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    pokeball: {
        width: 250,
        height: 250,
        position: "absolute",
        top: 230,
        right: -60,
    },
    points: {
        height: 50,
        width: 100,
        position: "absolute",
        top: 260,
        left: 40,
    },
    centered: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        // zIndex: 1,
    },
    pokemonImage: {
        height: 300,
        width: 300,
        position: "absolute",
        top: 180,
    },
    pokemonName: {
        fontSize: 30,
        position: "absolute",
        left: 30,
        top: 100,
        fontWeight: "bold"
    },
    pokemonId: {
        fontSize: 15,
        position: "absolute",
        right: 30,
        top: 117,
        fontWeight: "bold"
    },
    descriptionText: {
        textAlign: "center",
        marginVertical: 10,
        fontSize: 18
    },
    bold: {
        fontWeight: "bold"
    }
});
