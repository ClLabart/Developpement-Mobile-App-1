import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, Pressable, Image } from "react-native";
import { getNumberFavorites } from "../../service/storage/likes";

export function Profile() {
    const [favoritesNumber, setFavoritesNumber] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [image, setImage] = useState();

    const navigation = useNavigation();

    const getProfile = async () => {
        try {
            await getNumberFavorites()
                .then((data) => {
                    setFavoritesNumber(data);
                })
                .catch((e) => console.error(e));
            await AsyncStorage.getItem("profilePic")
                .then((data) => {
                    if (data !== "" && data !== undefined && data !== null) {
                        setImage(JSON.parse(data).uri);
                    }
                })
                .catch((e) => console.error(e));
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getProfile();
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <Image
                    style={styles.image}
                    source={{ uri: image ? image : null }}
                />
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate("PorfilePicture")}
                >
                    <Text style={[styles.buttonText, styles.bold]}>
                        Change picture
                    </Text>
                </Pressable>
            </View>
            <Text style={styles.description}>
                Pokemons liked :{" "}
                <Text style={styles.bold}>{favoritesNumber}</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    image: {
        width: 150,
        height: 150,
        borderRadius: 150,
        borderWidth: 2,
        borderColor: "lightcoral",
    },
    button: {
        marginTop: 20,
        backgroundColor: "lightcoral",
        paddingVertical: 20,
        width: "50%",
        borderRadius: 50,
    },
    buttonText: {
        textAlign: "center",
    },
    center: {
        alignItems: "center",
        marginTop: 20,
    },
    bold: {
        fontWeight: "bold",
    },
    description: {
        marginTop: 30,
        textAlign: "center",
        fontSize: 16,
    },
});
