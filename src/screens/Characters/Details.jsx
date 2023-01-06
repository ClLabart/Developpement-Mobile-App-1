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
import { Gyroscope } from "expo-sensors";
import { useEffect, useState } from "react";
import { pokemonFetchWithInfos } from "../../service/api/Pokemon";
import { isLiked } from "../../service/storage/likes";

export function Details({ route, navigation }) {
    const { pokemonId } = route.params;
    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [subscription, setSubscription] = useState(null);
    const [pokemon, setPokemon] = useState({});
    const [isLoading, setLoading] = useState(true);

    const _slow = () => Gyroscope.setUpdateInterval(1000);
    const _fast = () => Gyroscope.setUpdateInterval(16);

    const _subscribe = () => {
        setSubscription(
            Gyroscope.addListener((gyroscopeData) => {
                setData(gyroscopeData);
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    const fetchDetails = async () => {
        try {
            await pokemonFetchWithInfos(pokemonId).then((data) => {
                setPokemon(data);
            });
            await isLiked(pokemonId).then((data) => {
                console.log("data");
                console.log(data);
            });
        } catch (e) {
            console.error(e);
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
                        #{pokemonId.padStart("4", "0")}
                    </Text>

                    <View
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1,
                        }}
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

                    <View style={styles.description}>
                        <Text>Gyroscope:</Text>
                        <Text>x: {x}</Text>
                        <Text>y: {y}</Text>
                        <Text>z: {z}</Text>
                        <TouchableOpacity
                            onPress={subscription ? _unsubscribe : _subscribe}
                        >
                            <Text>{subscription ? "On" : "Off"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={_slow}>
                            <Text>Slow</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={_fast}>
                            <Text>Fast</Text>
                        </TouchableOpacity>
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
        marginTop: 280,
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
        left: 50,
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
    },
    pokemonId: {
        fontSize: 15,
        position: "absolute",
        right: 30,
        top: 117,
    },
});
