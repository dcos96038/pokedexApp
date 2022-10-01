import {useEffect, useRef, useState} from "react";

import {pokemonApi} from "../api/pokemonApi";
import {PokemonPaginationResponse, Result, SimplePokemon} from "../interfaces/pokemonInterface";

export const usePokemonSearch = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);

  const nextPageUrl = useRef("https://pokeapi.co/api/v2/pokemon?limit=1200");

  const loadPokemons = async () => {
    try {
      const resp = await pokemonApi.get<PokemonPaginationResponse>(
        "https://pokeapi.co/api/v2/pokemon?limit=200",
      );

      nextPageUrl.current = resp.data.next;

      mapPokemonList(resp.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokeList: SimplePokemon[] = pokemonList.map(({name, url}) => {
      const urlParts = url.split("/");
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {id, picture, name, url};
    });

    setSimplePokemonList(newPokeList);
    setIsFetching(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    simplePokemonList,
    isFetching,
  };
};
