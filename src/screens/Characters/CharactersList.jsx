import {
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Text,
    SafeAreaView,
    Image,
} from "react-native";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";

export function CharactersList() {
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
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        //rajouter une navigation par stack pour accéder aux détails du pok'mon
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
                    // keyExtractor={({dataset.name}, url) => id}
                    renderItem={( obj ) => (
                        // console.log(obj)
                        <Card pokemon={obj.item} />
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
