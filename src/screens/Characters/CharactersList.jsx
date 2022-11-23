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
import { PokemonFetch } from "../../service/api/Pokemon";

export function CharactersList() {
    const [isLoading, setLoading] = useState(true);
    const [dataset, setDataset] = useState([]);
    const [offset, setOffset] = useState(0);

    const fetchData = async () => {
        try {
            const response = await fetch(
                "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=" + offset
            );
            const json = await response.json();
            //setDataset(json.results);
            setDataset(dataset.concat(json.results));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setOffset(offset + 20);
        }
    };

    useEffect(() => {
        fetchData();
        //console.log(PokemonFetch(0, 20));
        //setDataset(PokemonFetch().then(() => {setLoading(false); console.log(isLoading); console.log(dataset)}));
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
                    initialNumToRender = {20}
                    onEndReachedThreshold = {0.3}
                    onMomentumScrollBegin = {() => {this.onEndReachedCalledDuringMomentum = false;}}
                    onEndReached = {() => {
                        if (!this.onEndReachedCalledDuringMomentum) {
                          fetchData();    // LOAD MORE DATA
                          this.onEndReachedCalledDuringMomentum = true;
                        }
                      }
                    }                 
                    style={{ width: "100%" }}
                    keyExtractor={(item, index) => 'key'+index}
                    renderItem={(obj) => <Card pokemon={obj.item} />}
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
