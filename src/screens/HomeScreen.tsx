import React from "react";
import {Image, Text, View, FlatList, ActivityIndicator} from "react-native";

import PokeCard from "../components/PokeCard";
import {usePokemonPaginated} from "../hooks/usePokemonPaginated";
import {styles} from "../theme/appTheme";

const HomeScreen = () => {
  const {simplePokemonList, loadPokemons} = usePokemonPaginated();

  return (
    <>
      <Image source={require("../assets/pokebola.png")} style={styles.pokebolaBG} />

      <View style={{alignItems: "center"}}>
        <FlatList
          ListFooterComponent={<ActivityIndicator color="grey" size={20} style={{height: 100}} />}
          ListHeaderComponent={() => (
            <Text style={{...styles.globalMargin, ...styles.title}}>Pokedex</Text>
          )}
          data={simplePokemonList}
          keyExtractor={(pokemon) => pokemon.id}
          numColumns={2}
          renderItem={({item}) => <PokeCard pokemon={item} />}
          showsVerticalScrollIndicator={false}
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
        />
      </View>
    </>
  );
};

export default HomeScreen;
