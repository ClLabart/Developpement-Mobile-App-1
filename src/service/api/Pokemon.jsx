export async function PokemonFetch(offset, limit) {
    try {
        url =
            "https://pokeapi.co/api/v2/pokemon/?limit=" +
            limit +
            "&offset=" +
            offset;
        const response = await fetch(url);
        const json = await response.json();
        return json.results;
    } catch (error) {
        console.error(error);
    }
}

export async function PokemonFetchByIdOrName(id) {
    try {
        url = "https://pokeapi.co/api/v2/pokemon/" + id;
        console.log(url);
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}
