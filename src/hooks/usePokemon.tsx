import {useEffect, useState} from "react";

import {pokemonApi} from "../api/pokemonApi";
import {FullPokemonResponse} from "../interfaces/pokemonInterface";

const usePokemon = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<FullPokemonResponse>({} as FullPokemonResponse);

  const loadPokemon = async () => {
    const resp = await pokemonApi.get<FullPokemonResponse>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );

    setPokemon(resp.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  return {
    isLoading,
    pokemon,
  };
};

export default usePokemon;
