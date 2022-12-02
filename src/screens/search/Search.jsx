import { useState } from "react";
import { ActivityIndicator, FlatList, TextInput, View } from "react-native";
import { Liked } from "../../components/Liked";
import { PokemonFetchByIdOrName } from "../../service/api/Pokemon";

export function Search() {
    const [value, onChangeText] = useState("bulbasaur");

    return (
        <View>
            <TextInput
                style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                    width: "80%",
                    margin: "auto",
                }}
                onChangeText={(text) => onChangeText(text)}
                value={value}
            />
        </View>
    );
}
