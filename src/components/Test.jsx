import {
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Text,
    SafeAreaView,
    Image,
} from "react-native";
import { useEffect, useState } from "react";

export function Test() {
    const [isLoading, setLoading] = useState(true);
    const [dataset, setDataset] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(
                "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0"
            );
            const json = await response.json();
            setDataset(json.results);
        } catch (error) {
            console.error(error);
        } finally {
            fetchDetails();
        }
    };

    // const fetchDetails = async () => {
    //     dataset.map(async (pokemon, i) => {
    //         try {
    //             const response = await fetch(pokemon.url);
    //             const json = await response.json();
    //             // setDataset(...dataset[index].image = json.sprites.front_default);
    //             // pokemon[image].push(json.sprites.front_default);
    //             console.log(dataset[i]);
    //             setDataset(dataset[i].push({image: json.sprites.front_default}));
    //         } catch (error) {
    //             console.error(error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     });
    // };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <SafeAreaView
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text>Pokémons :</Text>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                // Faire un component passer :item puis fetch les détails dans avoir la photo dans le nouvel élément
                <FlatList
                    data={dataset}
                    // keyExtractor={({ name }, url) => id}
                    renderItem={({ pokemon }) => (
                        <>
                            <Text>
                                {pokemon.name}, {pokemon.url} :{" "}
                            </Text>
                            <Image style={styles.tinyLogo} source={{uri: pokemon.image}}/>
                        </>
                    )}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 50,
        height: 50,
    },
});
