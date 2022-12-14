import {
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Text,
    SafeAreaView,
    Animated,
} from "react-native";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { PokemonFetch } from "../../service/api/Pokemon";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export function CharactersList() {
    const [isLoading, setLoading] = useState(true);
    const [dataset, setDataset] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);

    const y = new Animated.Value(0);
    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y } } }],
        { useNativeDriver: true }
    );

    const getDataFromApi = async () => {
        try {
            await PokemonFetch(offset, limit).then((data) => {
                setDataset(dataset.concat(data));
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setOffset(offset + limit);
        }
    };

    useEffect(() => {
        getDataFromApi();
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
                <AnimatedFlatList
                    data={dataset}
                    initialNumToRender={limit}
                    onEndReachedThreshold={0.3}
                    onMomentumScrollBegin={() => {
                        this.onEndReachedCalledDuringMomentum = false; // Charger les donneés seulement quand l'utilisateur scroll
                    }}
                    onEndReached={() => {
                        if (!this.onEndReachedCalledDuringMomentum) {
                            // Si on ne prends pas le scroll les appels se font en boucle puis ça crash 😤
                            getDataFromApi(); // Charger plus de données
                            this.onEndReachedCalledDuringMomentum = true;
                        }
                    }}
                    style={{ width: "100%" }}
                    keyExtractor={(item, index) => "key" + index}
                    renderItem={(obj) => <Card pokemon={obj.item} y={y} index={obj.index}/>}
                    scrollEventThrottle={16}
                    {...{onScroll}}
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
