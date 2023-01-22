import { useEffect, useState } from "react";
import { addToFavorites, delFromFavorites, isLikedAPI } from "../service/storage/likes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

export function IsLiked(props) {
    const [isLiked, setIsLiked] = useState(false);

    const getIsLiked = async () => {
        try {
            await isLikedAPI(props.id).then((data) => {setIsLiked(data)}).catch((e) => console.error(e));
        } catch (e) {
            console.error(e);
        }
    }

    const ToggleFromFavorites = async () => {
        if (isLiked) { //true => est dans les j'aimes
            try {
                await delFromFavorites(props.id).catch((e) => console.error(e));
            } catch (e) {
                console.error(e);
            }
        } else { // false => pas dans les j'aimes
            try {
                await addToFavorites(props.id).catch((e) => console.error(e));
            } catch (e) {
                console.error(e);
            }
        }
        getIsLiked();
    }

    useEffect(() => {
        getIsLiked();
    }, [props])

    return (
        <TouchableOpacity onPress={() => {ToggleFromFavorites()}}>
            <Ionicons
                name={isLiked?"heart":"heart-outline"}
                size={props.size?props.size:60}
                color={props.color?props.color:"black"}
            />
        </TouchableOpacity>
    )
}