export async function delFromFavorites(pokemon) {
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
        console.log(e);
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
        console.log(e);
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
        console.log(e);
    }
}

export async function isLiked(id) {
    try{
        let response = await AsyncStorage.getItem("favoritesPokmons");
        console.log("fire")
        console.log("response")
        console.log(response)
        if (response !== null) {
            response = response.split(",");
            console.log(response)
            console.log(response.includes(id/*.toString()*/))
            return response.includes(id/*.toString()*/)
        } else {
            return false;
        }
    } catch (e) {

    }
}