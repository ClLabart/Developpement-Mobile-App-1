import { Text } from "react-native";

export function Test() {

    fetch("https://pokeapi.co/api/v2/ability/?limit=2&offset=0")
        .then((response) => {
            data = response.json()
            truc = data._z
            console.log(data)
            console.log(truc)
        });

    return(
        <>
            <Text>
truc
            </Text>
        </>
    )
}