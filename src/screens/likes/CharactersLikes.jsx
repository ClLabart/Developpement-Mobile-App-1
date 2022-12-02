import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Liked } from "../../components/Liked";

export function CharactersLikes() {
    const [dataset, setDataset] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const getFavorites = async () => {
        try {
            const value = await AsyncStorage.getItem("favoritesPokmons");
            console.log(value);
            if (value !== null) {
                setDataset(value.split(','));
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
                    />
                </>
            )}
        </View>
    );
}
