import AsyncStorage from "@react-native-async-storage/async-storage";

export async function delFromFavorites(pokemon) {
    console.log(pokemon)
    // TODO à regarder
    try {
        let response = await AsyncStorage.getItem("favoritesPokmons");
        if (response !== null) {
            response = response.split(",");
        } else {
            response = [];
        }
        let index = response.indexOf(pokemon);
        response.splice(index, 1);
        let unique = [...new Set(response)];
        await AsyncStorage.setItem("favoritesPokmons", unique.toString());
    } catch (e) {
        console.error(e);
    }
};

export async function addToFavorites(pokemonId) {
    try {
        let response = await AsyncStorage.getItem("favoritesPokmons");
        if (response !== null) {
            response = response.split(",");
        } else {
            response = [];
        }
        response.push(pokemonId);
        let unique = [...new Set(response)];
        await AsyncStorage.setItem("favoritesPokmons", unique.toString());
    } catch (e) {
        console.error(e);
    }
};

export async function getNumberFavorites() {
    try {
        let response = await AsyncStorage.getItem("favoritesPokmons");
        if (response !== null) {
            response = response.split(",");
        } else {
            return 0;
        }
        return response.length;
    } catch (e) {
        console.error(e);
    }
}

export async function isLikedAPI(id) {
    try{
        let response = await AsyncStorage.getItem("favoritesPokmons");
        if (response !== null) {
            response = response.split(",");
            return response.includes(id.toString())
        } else {
            return false;
        }
    } catch (e) {
        console.error(e);
    }
}