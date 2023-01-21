import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Liked } from "../../components/Liked";

export function CharactersLikes(props) {
    const [dataset, setDataset] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const getFavorites = async () => {
        try {
            const value = await AsyncStorage.getItem("favoritesPokmons");
            console.log(value);
            if (value !== null) {
                setDataset(value.split(","));
            } else {
                setDataset([]);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        getFavorites().then(setRefreshing(false));
    };

    useEffect(() => {
        getFavorites();
        // essayer avec use focus effect => use callback
        // ! use callback met en mémoire la fonction à l'intérieur mettre partout
        const willFocusSubscription = props.navigation.addListener(
            "focus",
            () => {
                getFavorites();
            }
        );

        return willFocusSubscription;
    }, []);

    return (
        <View>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <FlatList
                        data={dataset}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        style={{ width: "100%" }}
                        extraData={dataset}
                        renderItem={(obj) => <Liked pokemon={obj.item} />}
                        numColumns={2}

                    />
                </>
            )}
        </View>
    );
}