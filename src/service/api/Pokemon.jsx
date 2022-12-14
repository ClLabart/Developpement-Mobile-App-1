export async function PokemonFetch(offset, limit) {
    try {
        url =
            "https://pokeapi.co/api/v2/pokemon/?limit=" +
            limit +
            "&offset=" +
            offset;
        const response = await fetch(url);
        const json = await response.json();
        // retourner une pagination
        // allPages = count / limit
        // page = offset / limit
        // next = pagination + limit
        // prev = pagination - limit
        // voir pour réinitialiser la liste déroulante
        return json.results;
    } catch (error) {
        console.error(error);
    }
}

export async function PokemonFetchByIdOrName(id) {
    try {
        url = "https://pokeapi.co/api/v2/pokemon/" + id;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}
