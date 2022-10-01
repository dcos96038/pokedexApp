import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, Text, View} from "react-native";

import PokeCard from "../components/PokeCard";
import SearchInput from "../components/SearchInput";
import {usePokemonSearch} from "../hooks/usePokemonSearch";
import {SimplePokemon} from "../interfaces/pokemonInterface";
import {styles} from "../theme/appTheme";

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState<SimplePokemon[]>([]);
  const {isFetching, simplePokemonList} = usePokemonSearch();

  useEffect(() => {
    if (searchTerm.length === 0) {
      return setFilteredPokemons([]);
    }

    if (isNaN(Number(searchTerm))) {
      return setFilteredPokemons(
        simplePokemonList.filter((pokemon) => pokemon.name.includes(searchTerm.toLowerCase())),
      );
    } else {
      const pokeById = simplePokemonList.find((pokemon) => pokemon.id === searchTerm);

      if (pokeById) {
        setFilteredPokemons([pokeById]);
      }
    }
  }, [simplePokemonList, searchTerm]);

  if (isFetching) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator color="grey" size={50} />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, marginHorizontal: 20}}>
      <View
        style={{
          backgroundColor: "transparent",
          position: "relative",
          flex: 1,
          zIndex: 999,
          top: 20,
        }}
      >
        <SearchInput onDebounce={(value) => setSearchTerm(value)} />
      </View>
      <FlatList
        ListHeaderComponent={() =>
          searchTerm ? (
            <Text style={{...styles.globalMargin, ...styles.title, marginBottom: 15}}>
              {searchTerm.toUpperCase()}
            </Text>
          ) : null
        }
        ListHeaderComponentStyle={{marginTop: 80}}
        contentContainerStyle={{
          height: "100%",
        }}
        data={filteredPokemons}
        keyExtractor={(pokemon) => pokemon.id}
        numColumns={2}
        renderItem={({item}) => <PokeCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SearchScreen;
