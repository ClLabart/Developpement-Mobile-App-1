import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Keyboard, StyleSheet, TextInput, View } from "react-native";
import { Liked } from "../../components/Liked";
import { PokemonFetchByIdOrName } from "../../service/api/Pokemon";

export function Search() {
    const [value, onChangeText] = useState("Bulbasaur");

    return (
        <View>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => onChangeText(text)}
                    value={value}
                />
            </View>
            <Liked pokemon={value} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    input : {
        height: 40,
        borderColor: "gray",
        borderWidth: 2,
        width: "70%",
        marginTop: 10,
        textAlign: "center"
    }
})