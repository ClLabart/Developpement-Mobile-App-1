import { useEffect, useState } from "react";
import { View, Image, ActivityIndicator, Text } from "react-native";

export function Card({ name, url }) {
    const [isLoading, setLoading] = useState(false);
    const [image, setImage] = useState("");

    // const fetchDetails = async () => {
    //     try {
    //         const response = await fetch(pokemon.url);
    //         const json = await response.json();
    //         setImage(json.sprites.front_default);
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchDetails();
    // }, []);

    return (
        <View>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <>
                    {/* <Image source={{ uri: { image } }} /> */}
                    <Text>{name} ; {url}</Text>
                </>
            )}
        </View>
    );
}
