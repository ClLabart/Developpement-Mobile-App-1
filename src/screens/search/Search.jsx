import { useState } from "react";
import { TextInput } from "react-native";
import { PokemonFetchByIdOrName } from "../../service/api/Pokemon";

export function Search() {
    const [value, onChangeText] = useState("");

    const Searching = async (text) => {
        onChangeText(text);
        try {
            const response = await PokemonFetchByIdOrName(text.toLowerCase());
            console.log(response);
        } catch (e) {
            console.error(e);
        } finally {

        }
    };

    return (
        <>
            <TextInput
                style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                    width: "80%",
                    margin: "auto",
                }}
                onChangeText={(text) => Searching(text)}
                value={value}
            />
        </>
    );
}
